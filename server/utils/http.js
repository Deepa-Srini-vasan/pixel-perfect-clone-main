import { config } from '../config/config.js';
import { getCorsOrigin } from './helpers.js';

export function sendJson(res, status, body) {
  const origin = getCorsOrigin({ headers: res.req?.headers || {} });
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin':      origin,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers':     'Content-Type, Authorization',
    'Access-Control-Allow-Methods':     'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'X-Content-Type-Options':           'nosniff',
    'X-Frame-Options':                  'DENY',
    'Referrer-Policy':                  'strict-origin-when-cross-origin',
  });
  res.end(JSON.stringify(body));
}

export async function readBody(req) {
  const chunks = [];
  let total = 0;
  for await (const chunk of req) {
    total += chunk.length;
    if (total > config.MAX_BODY_BYTES) {
      const err = new Error('Request too large');
      err.status = 413;
      throw err;
    }
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw.trim()) return {};
  try {
    return JSON.parse(raw);
  } catch {
    const err = new Error('Invalid JSON body');
    err.status = 400;
    throw err;
  }
}

export function setCookie(res, name, value, opts = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`, 'Path=/', `Max-Age=${opts.maxAge ?? 604800}`, 'HttpOnly'];
  if (config.IS_PROD) {
    parts.push('Secure', 'SameSite=None');
  } else {
    parts.push('SameSite=Lax');
  }
  res.setHeader('Set-Cookie', parts.join('; '));
}

export function clearCookie(res, name) {
  const parts = [
    `${name}=`,
    'Path=/',
    'Expires=Thu, 01 Jan 1970 00:00:00 UTC',
    'HttpOnly',
    config.IS_PROD ? 'Secure; SameSite=None' : 'SameSite=Lax'
  ];
  res.setHeader('Set-Cookie', parts.join('; '));
}
