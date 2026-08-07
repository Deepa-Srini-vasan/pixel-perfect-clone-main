import { config } from '../config/config.js';

export function nowStr() {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

export function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function safeInt(v, fallback = 0, min = 0, max = Infinity) {
  const n = Number.parseInt(String(v ?? ''), 10);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
}

export function getCorsOrigin(req) {
  const origin = req.headers.origin || '';
  return config.CORS_ORIGINS.includes(origin) ? origin : config.CORS_ORIGINS[0];
}

export function getIp(req) {
  const xff = req.headers['x-forwarded-for'];
  return (typeof xff === 'string' ? xff.split(',')[0] : null) || req.socket?.remoteAddress || 'unknown';
}
