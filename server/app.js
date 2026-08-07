import { createServer } from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { routes } from './routes/v1/index.js';
import { globalLimiter } from './middleware/rateLimiter.js';
import { requirePermission, optionalAuth } from './middleware/auth.js';
import { getCorsOrigin, getIp } from './utils/helpers.js';
import { sendJson } from './utils/http.js';
import { config } from './config/config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(__dirname, 'uploads');

const MIME_TYPES = {
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png':  'image/png',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.webp': 'image/webp',
  '.pdf':  'application/pdf',
};

async function serveStaticFile(req, res, pathname) {
  const fileBasename = pathname.replace(/^\/uploads\//, '');
  const filePath = path.join(UPLOADS_DIR, fileBasename);

  try {
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) throw new Error();

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const origin = getCorsOrigin(req);

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stat.size,
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': 'true',
      'Cache-Control': 'public, max-age=31536000',
    });

    const fileContent = await fs.readFile(filePath);
    res.end(fileContent);
  } catch {
    sendJson(res, 404, { error: 'File not found' });
  }
}

export async function handleRequest(req, res) {
  res.req = req;
  const ip = getIp(req);
  const method = req.method.toUpperCase();
  const [rawPath, query] = (req.url || '/').split('?');
  const pathname = rawPath.replace(/\/+$/, '') || '/';

  req.ip = ip;
  req.query = query;

  // CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin':      getCorsOrigin(req),
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers':     'Content-Type, Authorization',
      'Access-Control-Allow-Methods':     'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    });
    return res.end();
  }

  // Serve health check
  if (pathname === '/api/health' && method === 'GET') {
    sendJson(res, 200, { ok: true, version: '3.0.0' });
    return;
  }

  // Serve static uploads
  if (pathname.startsWith('/uploads/') && method === 'GET') {
    return serveStaticFile(req, res, pathname);
  }

  try {
    // Find matching route by method and regex path
    const route = routes.find(r => r.method === method && r.path.test(pathname));
    if (!route) {
      sendJson(res, 404, { error: 'Not found' });
      return;
    }

    // Apply global rate limiting
    globalLimiter(req);

    // Apply route-specific rate limiting
    if (route.limiter) {
      route.limiter(req);
    }

    // Populate optional auth info
    optionalAuth(req);

    // Apply RBAC permissions checks
    if (route.permission) {
      await requirePermission(route.permission)(req);
    }

    // Parse path parameters using regex groups
    const matches = pathname.match(route.path);

    // Execute route controller
    await route.handler(req, res, matches);

  } catch (err) {
    const status = err.status || 500;
    if (status >= 500) {
      console.error(`[app error] Unhandled: ${err.message}`, err.stack);
    } else {
      console.warn(`[app warn] ${status}: ${err.message}`);
    }
    sendJson(res, status, { error: err.message });
  }
}
export const server = createServer(handleRequest);
export default server;
