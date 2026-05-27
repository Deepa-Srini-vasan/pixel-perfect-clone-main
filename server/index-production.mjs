/**
 * Plumtek Admin API - Production Server
 * MySQL-backed REST API with JWT authentication
 * Includes security hardening, rate limiting, caching, and proper error handling
 */

import { createServer } from 'node:http';
import { createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import dotenv from 'dotenv';
import * as db from './db-mysql.mjs';
import { defaultAdmin, seedProducts } from './catalog.mjs';

// Load environment variables.
// Always load .env first so local DB settings exist, then allow .env.production to override in production.
dotenv.config({ path: '.env' });
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production', override: true });
}

const config = {
  PORT: Number(process.env.PORT ?? 8787),
  HOST: process.env.HOST ?? 'localhost',
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  DB_HOST: process.env.DB_HOST ?? 'localhost',
  DB_PORT: Number(process.env.DB_PORT ?? 3306),
  DB_USER: process.env.DB_USER ?? 'root',
  DB_PASSWORD: process.env.DB_PASSWORD ?? '',
  DB_NAME: process.env.DB_NAME ?? 'plumtek_catalog',
  DB_SSL: process.env.DB_SSL === 'true',
  JWT_SECRET: process.env.ADMIN_JWT_SECRET ?? 'change-this-in-production',
  JWT_EXPIRY: Number(process.env.ADMIN_JWT_EXPIRY ?? 604800000),
  CORS_ORIGIN: (process.env.CORS_ORIGIN ?? 'http://localhost:5173').split(','),
  RATE_LIMIT_WINDOW: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 900000),
  RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? 100),
  API_KEY_ENABLED: process.env.API_KEY_ENABLED === 'true',
  API_KEY: process.env.API_KEY,
  LOG_LEVEL: process.env.LOG_LEVEL ?? 'info',
  SEED_DATABASE: process.env.SEED_DATABASE === 'true',
  MAX_REQUEST_SIZE_BYTES: Number(process.env.MAX_REQUEST_SIZE_BYTES ?? 1048576),
};

const IS_PRODUCTION = config.NODE_ENV === 'production';
const MIN_JWT_SECRET_LENGTH = 32;

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map();

// Logging utility
function log(level, message, data = {}) {
  const levels = { error: 0, warn: 1, info: 2, debug: 3 };
  const cleanLogLevel = String(config.LOG_LEVEL).toLowerCase();
  const logLevelNum = Object.prototype.hasOwnProperty.call(levels, cleanLogLevel) ? levels[cleanLogLevel] : 2;
  const cleanLevel = String(level).toLowerCase();
  const currentLevelNum = Object.prototype.hasOwnProperty.call(levels, cleanLevel) ? levels[cleanLevel] : 2;
  if (currentLevelNum <= logLevelNum) {
    const timestamp = mysqlTimestamp();
    console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`, data);
  }
}

function mysqlTimestamp() {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

// ============================================================================
// RATE LIMITING (IP-based for enquiries)
// ============================================================================

const enquiryRateLimiter = (() => {
  const store = new Map(); // IP -> { count, resetTime }
  const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
  const MAX_PER_WINDOW = 5;

  return (ip) => {
    const now = Date.now();
    const record = store.get(ip);

    // Clean up expired entries
    if (record && record.resetTime < now) {
      store.delete(ip);
      return true;
    }

    if (!record) {
      store.set(ip, { count: 1, resetTime: now + WINDOW_MS });
      return true;
    }

    if (record.count < MAX_PER_WINDOW) {
      record.count++;
      return true;
    }

    return false; // Rate limit exceeded
  };
})();

// ============================================================================
// INPUT VALIDATION
// ============================================================================

function validateEnquiryPayload(payload) {
  const name = String(payload.name ?? '').trim();
  const email = String(payload.email ?? '').trim();
  const phone = String(payload.phone ?? '').trim();
  const subject = String(payload.subject ?? '').trim();
  const message = String(payload.message ?? '').trim();

  const errors = [];
  if (!name || name.length > 100) errors.push('name must be 1-100 characters');
  if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) errors.push('email must be valid');
  if (phone && phone.length > 20) errors.push('phone must be max 20 characters');
  if (subject && subject.length > 200) errors.push('subject must be max 200 characters');
  if (!message || message.length > 2000) errors.push('message must be 1-2000 characters');

  if (errors.length > 0) {
    return { error: errors.join('; '), value: null };
  }

  return { value: { name, email, phone, subject, message }, error: null };
}

// ============================================================================
// AUTHENTICATION FUNCTIONS
// ============================================================================

function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  const iterations = 120000;
  const hash = pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex');
  return `pbkdf2$${iterations}$${salt}$${hash}`;
}

function verifyPassword(password, stored) {
  const [scheme, iterationsText, salt, expectedHash] = String(stored).split('$');
  if (scheme !== 'pbkdf2' || !iterationsText || !salt || !expectedHash) return false;
  const computed = pbkdf2Sync(password, salt, Number(iterationsText), 64, 'sha512').toString('hex');
  try {
    return timingSafeEqual(Buffer.from(computed, 'hex'), Buffer.from(expectedHash, 'hex'));
  } catch {
    return false;
  }
}

function base64UrlEncode(value) {
  return Buffer.from(typeof value === 'string' ? value : JSON.stringify(value)).toString('base64url');
}

function base64UrlDecode(value) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function signToken(payload) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const body = {
    ...payload,
    iss: 'plumtek-admin',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor((Date.now() + config.JWT_EXPIRY) / 1000),
  };
  const unsigned = `${base64UrlEncode(header)}.${base64UrlEncode(body)}`;
  const signature = createHmac('sha256', config.JWT_SECRET).update(unsigned).digest('base64url');
  return `${unsigned}.${signature}`;
}

function verifyToken(token) {
  const [headerPart, payloadPart, signaturePart] = String(token).split('.');
  if (!headerPart || !payloadPart || !signaturePart) return null;
  const unsigned = `${headerPart}.${payloadPart}`;
  const expectedSignature = createHmac('sha256', config.JWT_SECRET).update(unsigned).digest('base64url');
  try {
    const expectedBuffer = Buffer.from(expectedSignature);
    const providedBuffer = Buffer.from(signaturePart);
    if (expectedBuffer.length !== providedBuffer.length) return null;
    if (!timingSafeEqual(expectedBuffer, providedBuffer)) return null;
  } catch {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(payloadPart));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

// ============================================================================
// MIDDLEWARE FUNCTIONS
// ============================================================================

function getCorsHeader(req) {
  const origin = req.headers.origin || '';
  return config.CORS_ORIGIN.includes(origin) ? origin : config.CORS_ORIGIN[0];
}

function checkRateLimit(ip) {
  const now = Date.now();
  const key = `rate-${ip || 'unknown'}`;
  const record = rateLimitStore.get(key) || { count: 0, resetTime: now + config.RATE_LIMIT_WINDOW };

  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + config.RATE_LIMIT_WINDOW;
  }

  record.count++;
  rateLimitStore.set(key, record);

  return record.count <= config.RATE_LIMIT_MAX;
}

// Keep in-memory limiter bounded when traffic is high.
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (!record || now > record.resetTime + config.RATE_LIMIT_WINDOW) {
      rateLimitStore.delete(key);
    }
  }
}, Math.max(30000, config.RATE_LIMIT_WINDOW)).unref();

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return forwardedFor.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

function sendJson(res, statusCode, body) {
  const origin = getCorsHeader({ headers: res.req?.headers || {} });
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-site',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  });
  res.end(JSON.stringify(body));
}

async function readJson(req) {
  const contentLength = Number(req.headers['content-length'] || 0);
  if (Number.isFinite(contentLength) && contentLength > config.MAX_REQUEST_SIZE_BYTES) {
    throw new HttpError(413, 'Request payload too large');
  }

  const chunks = [];
  let totalLength = 0;
  for await (const chunk of req) {
    totalLength += chunk.length;
    if (totalLength > config.MAX_REQUEST_SIZE_BYTES) {
      throw new HttpError(413, 'Request payload too large');
    }
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch (e) {
    log('warn', 'Invalid JSON received', { error: e.message });
    throw new HttpError(400, 'Invalid JSON body');
  }
}

// Parse cookies from request headers
function parseCookies(req) {
  const cookie = req.headers.cookie || '';
  return cookie.split(';').reduce((acc, cur) => {
    const [key, val] = cur.trim().split('=');
    if (key && val) acc[key] = decodeURIComponent(val);
    return acc;
  }, {});
}

// Set httpOnly cookie in response
function setCookie(res, name, value, options = {}) {
  const defaults = {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: IS_PRODUCTION ? 'None' : 'Lax', // Lax for dev (different ports), None for prod
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    ...options,
  };
  const parts = [`${name}=${encodeURIComponent(value)}`];
  if (defaults.maxAge) parts.push(`Max-Age=${defaults.maxAge}`);
  if (defaults.secure) parts.push('Secure');
  if (defaults.httpOnly) parts.push('HttpOnly');
  if (defaults.sameSite) parts.push(`SameSite=${defaults.sameSite}`);
  if (defaults.path) parts.push(`Path=${defaults.path}`);
  res.setHeader('Set-Cookie', parts.join('; '));
}

// Clear cookie
function clearCookie(res, name) {
  const sameSiteValue = IS_PRODUCTION ? 'None' : 'Lax';
  const parts = [`${name}=`, 'Path=/', 'Expires=Thu, 01 Jan 1970 00:00:00 UTC', 'HttpOnly', `SameSite=${sameSiteValue}`];
  if (IS_PRODUCTION) parts.push('Secure');
  res.setHeader('Set-Cookie', parts.join('; '));
}

// Extract token from httpOnly cookie
function requireAuth(req) {
  const cookies = parseCookies(req);
  const token = cookies.plumtek_session || null;
  if (!token) return null;
  return verifyToken(token);
}

function requireAdminRouteAuth(pathname, tokenData) {
  if (pathname.startsWith('/api/admin/') && !tokenData) {
    throw new HttpError(401, 'Unauthorized');
  }
}

function requireRole(tokenData, role) {
  if (!tokenData) {
    throw new HttpError(401, 'Unauthorized');
  }
  if (tokenData.role !== role) {
    throw new HttpError(403, 'Forbidden');
  }
}

function parsePositiveIntOrThrow(value, name) {
  const num = Number(value);
  if (!Number.isInteger(num) || num <= 0) {
    throw new HttpError(400, `Invalid ${name}`);
  }
  return num;
}

function parseNonNegativeInt(value, fallback = 0) {
  const num = Number.parseInt(String(value ?? ''), 10);
  return Number.isInteger(num) && num >= 0 ? num : fallback;
}

function parseBoundedInt(value, fallback, min, max) {
  const num = parseNonNegativeInt(value, fallback);
  return Math.min(Math.max(num, min), max);
}

function validateStartupConfig() {
  if (IS_PRODUCTION && config.JWT_SECRET.length < MIN_JWT_SECRET_LENGTH) {
    throw new Error(`ADMIN_JWT_SECRET must be at least ${MIN_JWT_SECRET_LENGTH} characters in production`);
  }
  if (config.JWT_EXPIRY <= 0) {
    throw new Error('ADMIN_JWT_EXPIRY must be a positive number of milliseconds');
  }
  if (config.MAX_REQUEST_SIZE_BYTES < 1024) {
    throw new Error('MAX_REQUEST_SIZE_BYTES is too low; set at least 1024 bytes');
  }
}

// ============================================================================
// DATABASE INITIALIZATION
// ============================================================================

async function initializeDatabase() {
  try {
    // Create all tables
    await db.executeQuery(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'staff',
        is_active TINYINT NOT NULL DEFAULT 1,
        last_login TIMESTAMP NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_role (role),
        INDEX idx_is_active (is_active)
      )
    `);

    await db.executeQuery(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        display_order INT DEFAULT 0,
        is_active TINYINT NOT NULL DEFAULT 1,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_slug (slug),
        INDEX idx_is_active (is_active)
      )
    `);

    await db.executeQuery(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        category_id INT,
        category VARCHAR(255),
        short_description VARCHAR(500) NOT NULL,
        description LONGTEXT NOT NULL,
        highlights_json LONGTEXT NOT NULL,
        specs_json LONGTEXT NOT NULL,
        image_key VARCHAR(500),
        image_data LONGTEXT,
        price DECIMAL(10, 2) DEFAULT 0,
        cost_price DECIMAL(10, 2) DEFAULT 0,
        sku VARCHAR(100),
        is_featured TINYINT NOT NULL DEFAULT 0,
        is_active TINYINT NOT NULL DEFAULT 1,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        created_by INT,
        updated_by INT,
        INDEX idx_slug (slug),
        INDEX idx_category_id (category_id),
        INDEX idx_products_category (category),
        INDEX idx_is_featured (is_featured),
        INDEX idx_is_active (is_active)
      )
    `);

    await db.executeQuery('ALTER TABLE products MODIFY image_key VARCHAR(500)');
    try {
      await db.executeQuery('ALTER TABLE products ADD COLUMN category VARCHAR(255) NULL AFTER category_id');
    } catch (error) {
      if (!/Duplicate column name/i.test(error.message)) {
        throw error;
      }
    }
    try {
      await db.executeQuery('ALTER TABLE products ADD INDEX idx_products_category (category)');
    } catch (error) {
      if (!/Duplicate key name/i.test(error.message)) {
        throw error;
      }
    }

    await db.executeQuery(`
      CREATE TABLE IF NOT EXISTS inventory (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL UNIQUE,
        quantity_in_stock INT NOT NULL DEFAULT 0,
        quantity_reserved INT NOT NULL DEFAULT 0,
        reorder_level INT DEFAULT 10,
        reorder_quantity INT DEFAULT 50,
        last_restock TIMESTAMP NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_quantity (quantity_in_stock),
        INDEX idx_product_id (product_id)
      )
    `);

    await db.executeQuery(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        subject VARCHAR(500),
        message LONGTEXT NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'new',
        ip_address VARCHAR(45),
        user_agent TEXT,
        is_read TINYINT NOT NULL DEFAULT 0,
        replied_at TIMESTAMP NULL,
        notes LONGTEXT,
        assigned_to INT,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_status (status),
        INDEX idx_is_read (is_read),
        INDEX idx_created_at (created_at)
      )
    `);

    await db.executeQuery(`
      CREATE TABLE IF NOT EXISTS activity_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        admin_user_id INT NOT NULL,
        action VARCHAR(100) NOT NULL,
        entity_type VARCHAR(100) NOT NULL,
        entity_id INT,
        old_values JSON,
        new_values JSON,
        ip_address VARCHAR(45),
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_admin_user_id (admin_user_id),
        INDEX idx_action (action),
        INDEX idx_created_at (created_at)
      )
    `);

    await db.executeQuery(`
      CREATE TABLE IF NOT EXISTS settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        key_name VARCHAR(255) NOT NULL UNIQUE,
        value LONGTEXT,
        data_type VARCHAR(50),
        description TEXT,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_key_name (key_name)
      )
    `);

    log('info', 'Database tables created/verified');

    // Check if admin exists
    const [admin] = await db.executeQuery('SELECT id FROM admin_users LIMIT 1');
    if (!admin && config.SEED_DATABASE) {
      const timestamp = mysqlTimestamp();
      await db.executeQuery(
        'INSERT INTO admin_users (email, password_hash, name, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
        [
          defaultAdmin.email,
          hashPassword(defaultAdmin.password),
          'System Administrator',
          'admin',
          timestamp,
          timestamp,
        ]
      );
      log('info', 'Seeded admin user', { email: defaultAdmin.email });

      // Seed categories
      const categories = [
        { name: 'Pipes', slug: 'pipes' },
        { name: 'Fittings', slug: 'fittings' },
        { name: 'Valves', slug: 'valves' },
        { name: 'Accessories', slug: 'accessories' },
      ];
      for (const cat of categories) {
        await db.executeQuery(
          'INSERT INTO categories (name, slug, is_active) VALUES (?, ?, 1)',
          [cat.name, cat.slug]
        );
      }
      log('info', 'Seeded categories');

      // Seed settings
      const settings = [
        ['site_name', 'Plumtek Solutions'],
        ['site_email', 'support@plumtek.com'],
        ['site_phone', '+91 98427 42936'],
        ['currency', 'INR'],
        ['vat_rate', '18'],
        ['items_per_page', '10'],
      ];
      for (const [key, value] of settings) {
        await db.executeQuery('INSERT INTO settings (key_name, value) VALUES (?, ?)', [key, value]);
      }
      log('info', 'Seeded settings');
    }

    // Check if products exist and get/create categories
    const [productsCount] = await db.executeQuery('SELECT COUNT(*) as count FROM products');
    if (productsCount.count === 0 && config.SEED_DATABASE) {
      const categories = await db.executeQuery('SELECT id FROM categories LIMIT 1');
      const categoryId = categories[0]?.id || 1;
      const timestamp = mysqlTimestamp();

      for (const item of seedProducts) {
        const result = await db.executeQuery(
          `INSERT INTO products
           (slug, name, category_id, category, short_description, description, highlights_json, specs_json, image_key, image_data, is_featured, is_active, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)`,
          [
            item.slug,
            item.name,
            categoryId,
            item.category || null,
            item.shortDescription,
            item.description,
            JSON.stringify(item.highlights),
            JSON.stringify(item.specs),
            item.imageKey,
            null,
            item.isFeatured,
            timestamp,
            timestamp,
          ]
        );

        // Create inventory entry
        await db.executeQuery(
          'INSERT INTO inventory (product_id, quantity_in_stock) VALUES (?, ?)',
          [result.insertId, 100]
        );
      }
      log('info', 'Seeded products with inventory', { count: seedProducts.length });
    }

    // Ensure categories table is seeded in MySQL if empty
    const [categoriesCount] = await db.executeQuery('SELECT COUNT(*) as count FROM categories');
    if (categoriesCount.count === 0 && config.SEED_DATABASE) {
      // Extract unique categories from products, or fallback
      const productCategories = await db.executeQuery('SELECT DISTINCT category FROM products');
      const catsToSeed = [];
      for (const row of productCategories) {
        if (row.category) {
          catsToSeed.push({ name: row.category, slug: row.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') });
        }
      }

      if (catsToSeed.length === 0) {
        catsToSeed.push(
          { name: 'Pipes', slug: 'pipes' },
          { name: 'Fittings', slug: 'fittings' },
          { name: 'Valves', slug: 'valves' },
          { name: 'Accessories', slug: 'accessories' }
        );
      }

      let order = 1;
      for (const cat of catsToSeed) {
        await db.executeQuery(
          'INSERT INTO categories (name, slug, display_order, is_active) VALUES (?, ?, ?, 1)',
          [cat.name, cat.slug, order++]
        );
      }
      log('info', 'Seeded categories in MySQL');
    }
  } catch (error) {
    log('error', 'Database initialization failed', { error: error.message });
    throw error;
  }
}

// ============================================================================
// API ENDPOINTS
// ============================================================================

async function handleRequest(req, res) {
  const ip = getClientIp(req);

  // Rate limiting
  if (!checkRateLimit(ip)) {
    return sendJson(res, 429, { error: 'Too many requests' });
  }

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': getCorsHeader(req),
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
    });
    res.end();
    return;
  }

  const [pathname, query] = (req.url || '/').split('?');

  try {
    // Health check
    if (pathname === '/api/health' && req.method === 'GET') {
      return sendJson(res, 200, { ok: true, env: config.NODE_ENV });
    }

    // Login — set httpOnly cookie, never expose token to JS
    if (pathname === '/api/auth/login' && req.method === 'POST') {
      const payload = await readJson(req);
      const [user] = await db.executeQuery('SELECT * FROM admin_users WHERE email = ? AND is_active = 1 LIMIT 1', [payload.email]);
      if (!user || !verifyPassword(payload.password, user.password_hash)) {
        log('warn', 'Failed login attempt', { email: payload.email, ip });
        return sendJson(res, 401, { error: 'Invalid credentials' });
      }
      const token = signToken({ userId: user.id, email: user.email, role: user.role });
      setCookie(res, 'plumtek_session', token);
      await db.executeQuery('UPDATE admin_users SET last_login = NOW() WHERE id = ?', [user.id]);
      log('info', 'User logged in', { email: user.email, ip });
      // Do NOT return token to client — it's in the httpOnly cookie
      return sendJson(res, 200, { user: { id: user.id, email: user.email, role: user.role, name: user.name } });
    }

    // Get current user
    if (pathname === '/api/auth/me' && req.method === 'GET') {
      const tokenData = requireAuth(req);
      if (!tokenData) return sendJson(res, 401, { error: 'Unauthorized' });
      const [user] = await db.executeQuery('SELECT id, email, role, name FROM admin_users WHERE id = ? LIMIT 1', [tokenData.userId]);
      if (!user) return sendJson(res, 401, { error: 'User not found' });
      return sendJson(res, 200, { user });
    }

    // Logout — clear httpOnly cookie
    if (pathname === '/api/auth/logout' && req.method === 'POST') {
      clearCookie(res, 'plumtek_session');
      log('info', 'User logged out', { ip });
      return sendJson(res, 200, { success: true });
    }

    // Get products by category (Supports pagination, sorting, search, and category strings/ids)
    if (pathname === '/api/products' && req.method === 'GET') {
      const params = new URLSearchParams(query);
      const search = params.get('search') || '';
      const categoryId = params.get('categoryId') || '';
      const category = params.get('category') || '';
      const featured = params.get('featured');
      const page = Math.max(1, Number.parseInt(params.get('page') || '1', 10));
      const limit = Math.min(Math.max(1, Number.parseInt(params.get('limit') || '24', 10)), 200);
      const sort = params.get('sort') || 'latest';

      let countSql = 'SELECT COUNT(DISTINCT p.id) as total FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.is_active = 1';
      let sql = 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.is_active = 1';
      const values = [];

      let filterSql = '';
      if (search) {
        filterSql += ' AND (p.name LIKE ? OR p.short_description LIKE ? OR p.description LIKE ?)';
        const searchVal = `%${search}%`;
        values.push(searchVal, searchVal, searchVal);
      }
      if (categoryId) {
        filterSql += ' AND p.category_id = ?';
        values.push(Number.parseInt(categoryId, 10) || 0);
      } else if (category) {
        filterSql += ' AND (p.category = ? OR c.name = ?)';
        values.push(category, category);
      }
      if (featured === 'true') {
        filterSql += ' AND p.is_featured = 1';
      }

      countSql += filterSql;
      sql += filterSql;

      // Count total matching items
      const countResult = await db.executeQuery(countSql, values);
      const total = countResult[0]?.total || 0;

      // Dynamic sorting
      let order = 'p.created_at DESC, p.id DESC';
      if (sort === 'name-asc') order = 'p.name ASC';
      if (sort === 'name-desc') order = 'p.name DESC';

      const offset = (page - 1) * limit;
      sql += ` ORDER BY ${order} LIMIT ${limit} OFFSET ${offset}`;

      const products = await db.executeQuery(sql, values);

      return sendJson(res, 200, {
        products: products.map(rowToProduct),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      });
    }

    // Get categories with dynamic product counts
    if (pathname === '/api/categories' && req.method === 'GET') {
      const categories = await db.executeQuery(`
        SELECT c.id, c.name, c.slug, c.is_active, COUNT(p.id) AS count
        FROM categories c
        LEFT JOIN products p ON (p.category_id = c.id OR p.category = c.name) AND p.is_active = 1
        WHERE c.is_active = 1
        GROUP BY c.id
        ORDER BY c.display_order, c.name
      `);
      return sendJson(res, 200, { categories });
    }

    // Get product by slug
    if (pathname.startsWith('/api/products/') && req.method === 'GET') {
      const slug = pathname.split('/')[3];
      const [product] = await db.executeQuery(
        'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.slug = ? AND p.is_active = 1 LIMIT 1',
        [slug]
      );
      if (!product) return sendJson(res, 404, { error: 'Product not found' });
      return sendJson(res, 200, { product: rowToProduct(product) });
    }

    // Admin endpoints require auth
    const tokenData = requireAuth(req);
    requireAdminRouteAuth(pathname, tokenData);

    // ============================================================================
    // DASHBOARD ENDPOINTS
    // ============================================================================

    if (pathname === '/api/admin/dashboard' && req.method === 'GET' && tokenData) {
      const stats = await db.executeQuery(`
        SELECT
          (SELECT COUNT(*) FROM products WHERE is_active = 1) as total_products,
          (SELECT COUNT(*) FROM categories WHERE is_active = 1) as total_categories,
          (SELECT COUNT(*) FROM enquiries) as total_enquiries,
          (SELECT COUNT(*) FROM enquiries WHERE is_read = 0) as unread_enquiries,
          (SELECT COUNT(*) FROM enquiries WHERE status = 'new') as new_enquiries,
          (SELECT COUNT(*) FROM inventory WHERE quantity_in_stock < reorder_level) as low_stock_items,
          (SELECT SUM(quantity_in_stock) FROM inventory) as total_inventory
      `);

      const activityLogs = await db.executeQuery(
        'SELECT al.*, u.name FROM activity_logs al LEFT JOIN admin_users u ON al.admin_user_id = u.id ORDER BY al.created_at DESC LIMIT 20'
      );

      return sendJson(res, 200, { stats: stats[0] || {}, recentActivity: activityLogs });
    }

    // ============================================================================
    // CATEGORIES ENDPOINTS
    // ============================================================================

    if (pathname === '/api/admin/categories' && req.method === 'GET' && tokenData) {
      const categories = await db.executeQuery(
        'SELECT * FROM categories ORDER BY display_order, name LIMIT 500'
      );
      return sendJson(res, 200, { categories });
    }

    if (pathname === '/api/admin/categories' && req.method === 'POST' && tokenData) {
      const payload = await readJson(req);
      const name = String(payload.name ?? '').trim();
      const description = String(payload.description ?? '').trim();
      if (!name) return sendJson(res, 400, { error: 'name is required' });

      const slug = (payload.slug || name).toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const order = payload.displayOrder || 0;

      try {
        await db.executeQuery(
          'INSERT INTO categories (name, slug, description, display_order, is_active) VALUES (?, ?, ?, ?, 1)',
          [name, slug, description, order]
        );
        logActivity(tokenData.userId, 'create', 'category', null, null, { name, slug });
        return sendJson(res, 201, { success: true });
      } catch (e) {
        return sendJson(res, 400, { error: 'Category already exists' });
      }
    }

    if (pathname.startsWith('/api/admin/categories/') && req.method === 'PUT' && tokenData) {
      const id = parsePositiveIntOrThrow(pathname.split('/')[4], 'category id');
      const payload = await readJson(req);
      const name = payload.name ? String(payload.name).trim() : undefined;
      const description = payload.description ? String(payload.description).trim() : undefined;
      const order = payload.displayOrder;
      const isActive = payload.isActive !== undefined ? (payload.isActive ? 1 : 0) : undefined;

      let sql = 'UPDATE categories SET ';
      const values = [];

      if (name) { sql += 'name = ?, '; values.push(name); }
      if (description !== undefined) { sql += 'description = ?, '; values.push(description); }
      if (order !== undefined) { sql += 'display_order = ?, '; values.push(order); }
      if (isActive !== undefined) { sql += 'is_active = ?, '; values.push(isActive); }

      sql = sql.slice(0, -2) + ' WHERE id = ?';
      values.push(id);

      await db.executeQuery(sql, values);
      logActivity(tokenData.userId, 'update', 'category', id, null, { name, description });
      return sendJson(res, 200, { success: true });
    }

    if (pathname.startsWith('/api/admin/categories/') && req.method === 'DELETE' && tokenData) {
      const id = parsePositiveIntOrThrow(pathname.split('/')[4], 'category id');
      const productCount = await db.executeQuery('SELECT COUNT(*) as count FROM products WHERE category_id = ?', [id]);
      if (productCount[0].count > 0) {
        return sendJson(res, 400, { error: 'Cannot delete category with products' });
      }
      await db.executeQuery('DELETE FROM categories WHERE id = ?', [id]);
      logActivity(tokenData.userId, 'delete', 'category', id);
      return sendJson(res, 200, { success: true });
    }

    // ============================================================================
    // INVENTORY ENDPOINTS
    // ============================================================================

    if (pathname === '/api/admin/inventory' && req.method === 'GET' && tokenData) {
      const params = new URLSearchParams(query);
      const lowStockOnly = params.get('lowStock') === 'true';

      let sql = `SELECT i.*, p.name, p.sku FROM inventory i 
                 JOIN products p ON i.product_id = p.id WHERE 1=1`;
      const values = [];

      if (lowStockOnly) {
        sql += ' AND i.quantity_in_stock < i.reorder_level';
      }

      sql += ' ORDER BY i.quantity_in_stock ASC LIMIT 500';
      const inventory = await db.executeQuery(sql, values);
      return sendJson(res, 200, { inventory });
    }

    if (pathname.startsWith('/api/admin/inventory/') && req.method === 'PUT' && tokenData) {
      const productId = parsePositiveIntOrThrow(pathname.split('/')[4], 'product id');
      const payload = await readJson(req);

      if (payload.quantityInStock !== undefined) {
        await db.executeQuery(
          'UPDATE inventory SET quantity_in_stock = ? WHERE product_id = ?',
          [payload.quantityInStock, productId]
        );
      }

      if (payload.reorderLevel !== undefined) {
        await db.executeQuery(
          'UPDATE inventory SET reorder_level = ? WHERE product_id = ?',
          [payload.reorderLevel, productId]
        );
      }

      logActivity(tokenData.userId, 'update', 'inventory', productId, null, payload);
      return sendJson(res, 200, { success: true });
    }

    // ============================================================================
    // SETTINGS ENDPOINTS
    // ============================================================================

    if (pathname === '/api/admin/settings' && req.method === 'GET' && tokenData) {
      const settings = await db.executeQuery('SELECT key_name, value, data_type FROM settings ORDER BY key_name');
      const result = {};
      settings.forEach(s => {
        if (s.key_name && s.key_name !== '__proto__' && s.key_name !== 'constructor') {
          Reflect.set(result, s.key_name, s.value);
        }
      });
      return sendJson(res, 200, { settings: result });
    }

    if (pathname === '/api/admin/settings' && req.method === 'PUT' && tokenData) {
      const payload = await readJson(req);

      for (const [key, value] of Object.entries(payload)) {
        await db.executeQuery(
          'INSERT INTO settings (key_name, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)',
          [key, String(value)]
        );
      }

      logActivity(tokenData.userId, 'update', 'settings', null, null, payload);
      return sendJson(res, 200, { success: true });
    }

    // ============================================================================
    // ACTIVITY LOGS ENDPOINTS
    // ============================================================================

    if (pathname === '/api/admin/activity-logs' && req.method === 'GET' && tokenData) {
      const params = new URLSearchParams(query);
      const limit = parseBoundedInt(params.get('limit'), 100, 1, 500);
      const offset = parseNonNegativeInt(params.get('offset'), 0);
      const entityType = params.get('entityType');

      let sql = 'SELECT al.*, u.name FROM activity_logs al LEFT JOIN admin_users u ON al.admin_user_id = u.id WHERE 1=1';
      const values = [];

      if (entityType) {
        sql += ' AND al.entity_type = ?';
        values.push(entityType);
      }

      sql += ` ORDER BY al.created_at DESC LIMIT ${limit} OFFSET ${offset}`;

      const logs = await db.executeQuery(sql, values);
      return sendJson(res, 200, { logs });
    }

    // ============================================================================
    // USER MANAGEMENT ENDPOINTS
    // ============================================================================

    if (pathname === '/api/admin/users' && req.method === 'GET' && tokenData) {
      requireRole(tokenData, 'admin');
      const users = await db.executeQuery(
        'SELECT id, email, name, role, is_active, last_login, created_at FROM admin_users ORDER BY created_at DESC LIMIT 500'
      );
      return sendJson(res, 200, { users });
    }

    if (pathname === '/api/admin/users' && req.method === 'POST' && tokenData) {
      requireRole(tokenData, 'admin');
      const payload = await readJson(req);
      const email = String(payload.email ?? '').trim().toLowerCase();
      const name = String(payload.name ?? '').trim();
      const password = String(payload.password ?? '').trim();
      const role = payload.role || 'staff';

      if (!email || !name || !password) {
        return sendJson(res, 400, { error: 'email, name, and password are required' });
      }

      try {
        await db.executeQuery(
          'INSERT INTO admin_users (email, password_hash, name, role, is_active) VALUES (?, ?, ?, ?, 1)',
          [email, hashPassword(password), name, role]
        );
        logActivity(tokenData.userId, 'create', 'user', null, null, { email, name, role });
        return sendJson(res, 201, { success: true });
      } catch (e) {
        return sendJson(res, 400, { error: 'User already exists' });
      }
    }

    if (pathname.startsWith('/api/admin/users/') && req.method === 'PUT' && tokenData) {
      requireRole(tokenData, 'admin');
      const userId = parsePositiveIntOrThrow(pathname.split('/')[4], 'user id');
      const payload = await readJson(req);

      const updates = [];
      const values = [];

      if (payload.name) {
        updates.push('name = ?');
        values.push(String(payload.name).trim());
      }
      if (payload.role) {
        updates.push('role = ?');
        values.push(payload.role);
      }
      if (payload.isActive !== undefined) {
        updates.push('is_active = ?');
        values.push(payload.isActive ? 1 : 0);
      }
      if (payload.password) {
        updates.push('password_hash = ?');
        values.push(hashPassword(String(payload.password)));
      }

      if (updates.length > 0) {
        values.push(userId);
        await db.executeQuery(`UPDATE admin_users SET ${updates.join(', ')} WHERE id = ?`, values);
      }

      logActivity(tokenData.userId, 'update', 'user', userId, null, payload);
      return sendJson(res, 200, { success: true });
    }

    // ============================================================================
    // PRODUCT ENDPOINTS
    // ============================================================================

    // Get admin products
    if (pathname === '/api/admin/products' && req.method === 'GET' && tokenData) {
      const params = new URLSearchParams(query);
      const search = params.get('search') || '';
      const categoryId = params.get('categoryId');
      const limit = parseBoundedInt(params.get('limit'), 50, 1, 500);
      const offset = parseNonNegativeInt(params.get('offset'), 0);

      let sql = 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE 1=1';
      const values = [];

      if (search) {
        sql += ' AND (p.name LIKE ? OR p.sku LIKE ?)';
        const searchVal = `%${search}%`;
        values.push(searchVal, searchVal);
      }
      if (categoryId) {
        sql += ' AND p.category_id = ?';
        values.push(categoryId);
      }

      sql += ` ORDER BY p.created_at DESC LIMIT ${limit} OFFSET ${offset}`;

      const products = await db.executeQuery(sql, values);
      return sendJson(res, 200, { products: products.map(rowToProduct) });
    }

    // Create product
    if (pathname === '/api/admin/products' && req.method === 'POST' && tokenData) {
      const payload = await readJson(req);
      const validated = validateProductPayload(payload);
      if (validated.error) return sendJson(res, 400, { error: validated.error });

      const result = await db.executeQuery(
        `INSERT INTO products
         (slug, name, category_id, category, short_description, description, highlights_json, specs_json, image_key, image_data, price, cost_price, sku, is_featured, is_active, created_by)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
        [
          validated.value.slug,
          validated.value.name,
          validated.value.categoryId || null,
          validated.value.category || null,
          validated.value.shortDescription,
          validated.value.description,
          JSON.stringify(validated.value.highlights),
          JSON.stringify(validated.value.specs),
          validated.value.imageKey,
          validated.value.imageData,
          validated.value.price || 0,
          validated.value.costPrice || 0,
          validated.value.sku || null,
          validated.value.isFeatured,
          tokenData.userId,
        ]
      );

      // Create inventory entry
      await db.executeQuery('INSERT INTO inventory (product_id, quantity_in_stock) VALUES (?, 0)', [result.insertId]);

      logActivity(tokenData.userId, 'create', 'product', result.insertId, null, validated.value);
      return sendJson(res, 201, { success: true, id: result.insertId });
    }

    // Update product
    if (pathname.startsWith('/api/admin/products/') && req.method === 'PUT' && tokenData) {
      const id = parsePositiveIntOrThrow(pathname.split('/')[4], 'product id');
      const payload = await readJson(req);
      const validated = validateProductPayload(payload);
      if (validated.error) return sendJson(res, 400, { error: validated.error });

      await db.executeQuery(
        `UPDATE products SET name = ?, category_id = ?, category = ?, short_description = ?, description = ?, highlights_json = ?, specs_json = ?, image_key = ?, image_data = ?, price = ?, cost_price = ?, sku = ?, is_featured = ?, updated_by = ? WHERE id = ?`,
        [
          validated.value.name,
          validated.value.categoryId || null,
          validated.value.category || null,
          validated.value.shortDescription,
          validated.value.description,
          JSON.stringify(validated.value.highlights),
          JSON.stringify(validated.value.specs),
          validated.value.imageKey,
          validated.value.imageData,
          validated.value.price || 0,
          validated.value.costPrice || 0,
          validated.value.sku || null,
          validated.value.isFeatured,
          tokenData.userId,
          id,
        ]
      );
      logActivity(tokenData.userId, 'update', 'product', id, null, validated.value);
      return sendJson(res, 200, { success: true });
    }

    // Delete product
    if (pathname.startsWith('/api/admin/products/') && req.method === 'DELETE' && tokenData) {
      const id = parsePositiveIntOrThrow(pathname.split('/')[4], 'product id');
      await db.executeQuery('DELETE FROM inventory WHERE product_id = ?', [id]);
      await db.executeQuery('DELETE FROM products WHERE id = ?', [id]);
      logActivity(tokenData.userId, 'delete', 'product', id);
      return sendJson(res, 200, { success: true });
    }

    // ========== ENQUIRY ENDPOINTS ==========

    // Submit new enquiry (public) — rate limited by IP
    if (pathname === '/api/enquiries' && req.method === 'POST') {
      if (!enquiryRateLimiter(ip)) {
        return sendJson(res, 429, { error: 'Too many enquiries. Please wait before submitting another.' });
      }

      const payload = await readJson(req);
      const validated = validateEnquiryPayload(payload);
      if (validated.error) return sendJson(res, 400, { error: validated.error });

      const userAgent = req.headers['user-agent'] || '';
      const timestamp = mysqlTimestamp();

      const result = await db.executeQuery(
        `INSERT INTO enquiries (name, email, phone, subject, message, status, ip_address, user_agent, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          validated.value.name,
          validated.value.email,
          validated.value.phone,
          validated.value.subject,
          validated.value.message,
          'new',
          ip,
          userAgent,
          timestamp,
          timestamp,
        ]
      );

      log('info', 'Enquiry submitted', { email: validated.value.email, ip });
      return sendJson(res, 201, { success: true, id: result.insertId });
    }

    // Get enquiry stats (admin)
    if (pathname === '/api/admin/enquiries/stats' && req.method === 'GET' && tokenData) {
      const stats = await db.executeQuery(`
        SELECT
          COUNT(*) as total,
          SUM(CASE WHEN is_read = 0 THEN 1 ELSE 0 END) as unread,
          SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new
        FROM enquiries
      `);

      const row = stats[0] || { total: 0, unread: 0, new: 0 };
      return sendJson(res, 200, {
        total: Number(row.total) || 0,
        unread: Number(row.unread) || 0,
        new: Number(row.new) || 0,
      });
    }

    // Get all enquiries (admin)
    if (pathname === '/api/admin/enquiries' && req.method === 'GET' && tokenData) {
      const params = new URLSearchParams(query);
      const status = params.get('status');
      const search = params.get('search') || '';
      const unreadOnly = params.get('unread') === 'true';
      const limit = parseBoundedInt(params.get('limit'), 50, 1, 500);
      const offset = parseNonNegativeInt(params.get('offset'), 0);

      let sql = 'SELECT * FROM enquiries WHERE 1=1';
      const values = [];

      if (status && ['new', 'in-progress', 'replied', 'closed'].includes(status)) {
        sql += ' AND status = ?';
        values.push(status);
      }
      if (unreadOnly) {
        sql += ' AND is_read = 0';
      }
      if (search) {
        sql += ' AND (name LIKE ? OR email LIKE ? OR subject LIKE ? OR message LIKE ?)';
        const searchVal = `%${search}%`;
        values.push(searchVal, searchVal, searchVal, searchVal);
      }

      sql += ` ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;

      const enquiries = await db.executeQuery(sql, values);
      return sendJson(res, 200, { enquiries: enquiries.map(rowToEnquiry) });
    }

    // Get single enquiry (admin)
    if (pathname.startsWith('/api/admin/enquiries/') && req.method === 'GET' && tokenData) {
      const id = parsePositiveIntOrThrow(pathname.split('/')[4], 'enquiry id');
      const [enquiry] = await db.executeQuery('SELECT * FROM enquiries WHERE id = ? LIMIT 1', [id]);

      if (!enquiry) return sendJson(res, 404, { error: 'Enquiry not found' });

      // Mark as read
      if (!enquiry.is_read) {
        await db.executeQuery('UPDATE enquiries SET is_read = 1, updated_at = NOW() WHERE id = ?', [id]);
      }

      return sendJson(res, 200, rowToEnquiry(enquiry));
    }

    // Update enquiry status/notes (admin)
    if (pathname.startsWith('/api/admin/enquiries/') && req.method === 'PUT' && tokenData) {
      const id = parsePositiveIntOrThrow(pathname.split('/')[4], 'enquiry id');
      const payload = await readJson(req);

      const status = payload.status
        ? String(payload.status).trim().toLowerCase()
        : undefined;
      const notes = payload.notes ? String(payload.notes).trim() : undefined;
      const markReplied = payload.markReplied === true;

      if (status && !['new', 'in-progress', 'replied', 'closed'].includes(status)) {
        return sendJson(res, 400, { error: 'Invalid status' });
      }

      let sql = 'UPDATE enquiries SET updated_at = NOW()';
      const values = [];

      if (status) {
        sql += ', status = ?';
        values.push(status);
      }
      if (notes !== undefined) {
        sql += ', notes = ?';
        values.push(notes);
      }
      if (markReplied) {
        sql += ', replied_at = NOW(), status = ?';
        if (!status) values.push('replied');
      }

      sql += ' WHERE id = ?';
      values.push(id);

      await db.executeQuery(sql, values);
      log('info', 'Enquiry updated', { id, user: tokenData.email, status, markReplied });
      return sendJson(res, 200, { success: true });
    }

    // Delete enquiry (admin)
    if (pathname.startsWith('/api/admin/enquiries/') && req.method === 'DELETE' && tokenData) {
      const id = parsePositiveIntOrThrow(pathname.split('/')[4], 'enquiry id');
      await db.executeQuery('DELETE FROM enquiries WHERE id = ?', [id]);
      log('info', 'Enquiry deleted', { id, user: tokenData.email });
      return sendJson(res, 200, { success: true });
    }

    // 404
    sendJson(res, 404, { error: 'Endpoint not found' });
  } catch (error) {
    if (error instanceof HttpError) {
      return sendJson(res, error.status, { error: error.message });
    }
    log('error', 'Request error', { path: pathname, error: error.message });
    sendJson(res, 500, { error: 'Internal server error' });
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function rowToProduct(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category_name || row.category || '',
    categoryId: row.category_id,
    categoryName: row.category_name,
    shortDescription: row.short_description,
    description: row.description,
    highlights: JSON.parse(row.highlights_json || '[]'),
    specs: JSON.parse(row.specs_json || '[]'),
    imageKey: row.image_key,
    imageData: row.image_data,
    price: Number(row.price) || 0,
    costPrice: Number(row.cost_price) || 0,
    sku: row.sku,
    isFeatured: Boolean(row.is_featured),
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function validateProductPayload(payload) {
  const name = String(payload.name ?? '').trim();
  const categoryId = payload.categoryId ? Number(payload.categoryId) : null;
  const category = String(payload.category ?? '').trim();
  const shortDescription = String(payload.shortDescription ?? '').trim();
  const description = String(payload.description ?? '').trim();

  if (!name || !shortDescription || !description) {
    return { error: 'name, shortDescription, and description are required.' };
  }
  if (categoryId !== null && (!Number.isInteger(categoryId) || categoryId <= 0)) {
    return { error: 'categoryId must be a positive integer.' };
  }

  const highlights = Array.isArray(payload.highlights)
    ? payload.highlights.map((item) => String(item).trim()).filter(Boolean)
    : [];
  const specs = Array.isArray(payload.specs)
    ? payload.specs
      .map((item) => ({ label: String(item?.label ?? '').trim(), value: String(item?.value ?? '').trim() }))
      .filter((item) => item.label && item.value)
    : [];

  const imageKey = String(payload.imageKey ?? '').trim();
  const imageData = String(payload.imageData ?? '').trim();
  const slug = payload.slug ? String(payload.slug).toLowerCase().trim() : name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const price = Number(payload.price) || 0;
  const costPrice = Number(payload.costPrice) || 0;
  const sku = String(payload.sku ?? '').trim() || null;

  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return { error: 'slug must contain only lowercase letters, numbers and hyphens.' };
  }
  if (price < 0 || costPrice < 0) {
    return { error: 'price and costPrice cannot be negative.' };
  }

  return {
    value: {
      slug,
      name,
      categoryId,
      category,
      shortDescription,
      description,
      highlights,
      specs,
      imageKey: imageData ? null : imageKey || null,
      imageData: imageData || null,
      isFeatured: payload.isFeatured ? 1 : 0,
      price,
      costPrice,
      sku,
    },
  };
}

async function logActivity(userId, action, entityType, entityId, oldValues = null, newValues = null) {
  try {
    await db.executeQuery(
      'INSERT INTO activity_logs (admin_user_id, action, entity_type, entity_id, old_values, new_values) VALUES (?, ?, ?, ?, ?, ?)',
      [
        userId,
        action,
        entityType,
        entityId,
        oldValues ? JSON.stringify(oldValues) : null,
        newValues ? JSON.stringify(newValues) : null,
      ]
    );
  } catch (e) {
    log('warn', 'Failed to log activity', { error: e.message });
  }
}

function rowToEnquiry(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    subject: row.subject,
    message: row.message,
    status: row.status,
    isRead: Boolean(row.is_read),
    repliedAt: row.replied_at,
    notes: row.notes,
    ipAddress: row.ip_address,
    userAgent: row.user_agent,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// ============================================================================
// SERVER STARTUP
// ============================================================================

const server = createServer(handleRequest);

async function start() {
  try {
    validateStartupConfig();

    // Initialize database connection pool
    await db.initializePool(config);
    log('info', 'Database connection pool initialized');

    // Initialize database schema
    await initializeDatabase();

    // Start server
    server.listen(config.PORT, config.HOST, () => {
      log('info', 'Server started', {
        url: `http://${config.HOST}:${config.PORT}`,
        env: config.NODE_ENV,
        database: config.DB_NAME,
      });
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      log('info', 'SIGTERM received, shutting down gracefully...');
      server.close(async () => {
        await db.closePool();
        process.exit(0);
      });
    });
  } catch (error) {
    log('error', 'Failed to start server', { error: error.message });
    process.exit(1);
  }
}

start();
