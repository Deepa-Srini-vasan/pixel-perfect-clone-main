import { verifyToken } from '../utils/crypto.js';
import { executeQuery } from '../database/connection.js';

export function parseCookies(req) {
  return (req.headers.cookie || '').split(';').reduce((acc, cur) => {
    const idx = cur.indexOf('=');
    if (idx > 0) acc[cur.slice(0, idx).trim()] = decodeURIComponent(cur.slice(idx + 1).trim());
    return acc;
  }, {});
}

export function extractAuthUser(req) {
  const cookies = parseCookies(req);
  const token = cookies.plumtek_session;
  if (!token) return null;
  return verifyToken(token);
}

// Higher-order function to verify granular permission
export function requirePermission(permissionName) {
  return async (req) => {
    const tokenData = extractAuthUser(req);
    if (!tokenData) {
      const err = new Error('Unauthorized');
      err.status = 401;
      throw err;
    }

    req.user = tokenData; // Attach user payload to request context

    // super_admin bypasses all checks
    if (tokenData.role === 'super_admin') {
      return true;
    }

    // Query DB for permission validation
    const [row] = await executeQuery(
      'SELECT 1 FROM role_permissions WHERE role = ? AND permission = ? LIMIT 1',
      [tokenData.role, permissionName]
    );

    if (!row) {
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    }

    return true;
  };
}

export function optionalAuth(req) {
  req.user = extractAuthUser(req);
}
