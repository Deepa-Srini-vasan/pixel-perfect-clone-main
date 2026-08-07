import { getIp } from '../utils/helpers.js';

export function makeRateLimiter(windowMs, max) {
  const store = new Map();

  // Bounded memory cleaner
  setInterval(() => {
    const now = Date.now();
    for (const [k, v] of store) {
      if (now > v.reset) store.delete(k);
    }
  }, windowMs).unref();

  return (req) => {
    const ip = getIp(req);
    const now = Date.now();
    const rec = store.get(ip) || { count: 0, reset: now + windowMs };

    if (now > rec.reset) {
      rec.count = 0;
      rec.reset = now + windowMs;
    }

    rec.count++;
    store.set(ip, rec);

    if (rec.count > max) {
      const err = new Error('Too many requests');
      err.status = 429;
      throw err;
    }
  };
}

export const globalLimiter  = makeRateLimiter(15 * 60 * 1000, 300);
export const enquiryLimiter = makeRateLimiter(10 * 60 * 1000, 5);
export const applyLimiter   = makeRateLimiter(60 * 60 * 1000, 3);
export const loginLimiter   = makeRateLimiter(15 * 60 * 1000, 10);
