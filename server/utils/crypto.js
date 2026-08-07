import { createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } from 'node:crypto';
import { config } from '../config/config.js';

export function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  const hash = pbkdf2Sync(password, salt, 120000, 64, 'sha512').toString('hex');
  return `pbkdf2$120000$${salt}$${hash}`;
}

export function verifyPassword(password, stored) {
  const parts = String(stored).split('$');
  if (parts.length !== 4) return false;
  const [scheme, iters, salt, expected] = parts;
  if (scheme !== 'pbkdf2') return false;
  const computed = pbkdf2Sync(password, salt, Number(iters), 64, 'sha512').toString('hex');
  try {
    return timingSafeEqual(Buffer.from(computed, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
}

function b64url(v) {
  return Buffer.from(typeof v === 'string' ? v : JSON.stringify(v)).toString('base64url');
}

function decodeB64url(v) {
  return Buffer.from(v, 'base64url').toString('utf8');
}

export function signToken(payload) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const body = {
    ...payload,
    iss: 'plumtek-v3',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor((Date.now() + config.JWT_EXPIRY) / 1000)
  };
  const unsigned = `${b64url(header)}.${b64url(body)}`;
  const sig = createHmac('sha256', config.JWT_SECRET).update(unsigned).digest('base64url');
  return `${unsigned}.${sig}`;
}

export function verifyToken(token) {
  const parts = String(token).split('.');
  if (parts.length !== 3) return null;
  const [h, p, sig] = parts;
  const expected = createHmac('sha256', config.JWT_SECRET).update(`${h}.${p}`).digest('base64url');
  try {
    if (Buffer.from(expected).length !== Buffer.from(sig).length) return null;
    if (!timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) return null;
    const payload = JSON.parse(decodeB64url(p));
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}
