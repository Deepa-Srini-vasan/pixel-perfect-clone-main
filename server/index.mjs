import { createServer } from "node:http";
import { createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } from "node:crypto";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { defaultAdmin, seedProducts } from "./catalog.mjs";

const PORT = Number(process.env.PORT ?? 8787);
const JWT_SECRET = process.env.ADMIN_JWT_SECRET ?? "plumtek-admin-secret";
const DB_PATH = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "plumtek-admin.sqlite");
const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 7;

const db = new DatabaseSync(DB_PATH);

function nowIso() {
  return new Date().toISOString();
}

function slugify(value) {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || `product-${Date.now()}`;
}

function hashPassword(password, salt = randomBytes(16).toString("hex")) {
  const iterations = 120000;
  const hash = pbkdf2Sync(password, salt, iterations, 64, "sha512").toString("hex");
  return `pbkdf2$${iterations}$${salt}$${hash}`;
}

function verifyPassword(password, stored) {
  const [scheme, iterationsText, salt, expectedHash] = String(stored).split("$");
  if (scheme !== "pbkdf2" || !iterationsText || !salt || !expectedHash) return false;
  const computed = pbkdf2Sync(password, salt, Number(iterationsText), 64, "sha512").toString("hex");
  return timingSafeEqual(Buffer.from(computed, "hex"), Buffer.from(expectedHash, "hex"));
}

function base64UrlEncode(value) {
  return Buffer.from(typeof value === "string" ? value : JSON.stringify(value)).toString("base64url");
}

function base64UrlDecode(value) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signToken(payload) {
  const header = { alg: "HS256", typ: "JWT" };
  const body = {
    ...payload,
    exp: Date.now() + TOKEN_TTL_MS,
  };
  const unsigned = `${base64UrlEncode(header)}.${base64UrlEncode(body)}`;
  const signature = createHmac("sha256", JWT_SECRET).update(unsigned).digest("base64url");
  return `${unsigned}.${signature}`;
}

function verifyToken(token) {
  const [headerPart, payloadPart, signaturePart] = String(token).split(".");
  if (!headerPart || !payloadPart || !signaturePart) return null;
  const unsigned = `${headerPart}.${payloadPart}`;
  const expectedSignature = createHmac("sha256", JWT_SECRET).update(unsigned).digest("base64url");
  if (expectedSignature !== signaturePart) return null;

  const payload = JSON.parse(base64UrlDecode(payloadPart));
  if (payload.exp && payload.exp < Date.now()) return null;
  return payload;
}

function sendJson(res, statusCode, body) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  });
  res.end(JSON.stringify(body));
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return {};
  return JSON.parse(raw);
}

function rowToProduct(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    shortDescription: row.short_description,
    description: row.description,
    highlights: JSON.parse(row.highlights_json || "[]"),
    specs: JSON.parse(row.specs_json || "[]"),
    imageKey: row.image_key,
    imageData: row.image_data,
    isFeatured: Boolean(row.is_featured),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function logActivity(userId, action, entityType, entityId, name = null) {
  const timestamp = nowIso();
  db.prepare(
    "INSERT INTO activity_logs (admin_user_id, action, entity_type, entity_id, name, created_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(userId, action, entityType, entityId, name, timestamp);
}

function validateProductPayload(payload) {
  const name = String(payload.name ?? "").trim();
  const category = String(payload.category ?? "").trim();
  const shortDescription = String(payload.shortDescription ?? "").trim();
  const description = String(payload.description ?? "").trim();

  if (!name || !category || !shortDescription || !description) {
    return { error: "name, category, shortDescription, and description are required." };
  }

  const highlights = Array.isArray(payload.highlights) ? payload.highlights.map((item) => String(item).trim()).filter(Boolean) : [];
  const specs = Array.isArray(payload.specs)
    ? payload.specs
        .map((item) => ({ label: String(item?.label ?? "").trim(), value: String(item?.value ?? "").trim() }))
        .filter((item) => item.label && item.value)
    : [];

  const imageKey = String(payload.imageKey ?? "").trim();
  const imageData = String(payload.imageData ?? "").trim();
  const slug = slugify(payload.slug || name);

  return {
    value: {
      slug,
      name,
      category,
      shortDescription,
      description,
      highlights,
      specs,
      imageKey: imageData ? null : imageKey || null,
      imageData: imageData || null,
      isFeatured: payload.isFeatured ? 1 : 0,
    },
  };
}

function requireAuth(req) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return null;
  return verifyToken(token);
}

function getProducts({ search = "", category = "", featured = "", page = 1, limit = 24, sort = "latest" } = {}) {
  const clauses = [];
  const params = {};
  if (search) {
    clauses.push("(name LIKE @search OR category LIKE @search OR short_description LIKE @search OR description LIKE @search)");
    params.search = `%${search}%`;
  }
  if (category) {
    clauses.push("category = @category");
    params.category = category;
  }
  if (featured === "true") {
    clauses.push("is_featured = 1");
  }

  const where = clauses.length ? ` WHERE ${clauses.join(" AND ")}` : "";

  // Count total matching rows
  const countRow = db.prepare(`SELECT COUNT(*) AS total FROM products${where}`).get(params);
  const total = countRow?.total ?? 0;

  // Sort
  let order = "created_at DESC, id DESC";
  if (sort === "name-asc")  order = "name ASC";
  if (sort === "name-desc") order = "name DESC";

  // Pagination
  const pageNum  = Math.max(1, Number(page));
  const pageSize = Math.min(Math.max(1, Number(limit)), 200);
  const offset   = (pageNum - 1) * pageSize;

  const sql = `SELECT * FROM products${where} ORDER BY ${order} LIMIT @limit OFFSET @offset`;
  const rows = db.prepare(sql).all({ ...params, limit: pageSize, offset });

  return {
    products: rows.map(rowToProduct),
    total,
    page: pageNum,
    limit: pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      name TEXT,
      role TEXT NOT NULL DEFAULT 'admin',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      short_description TEXT NOT NULL,
      description TEXT NOT NULL,
      highlights_json TEXT NOT NULL,
      specs_json TEXT NOT NULL,
      image_key TEXT,
      image_data TEXT,
      is_featured INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      ip_address TEXT,
      user_agent TEXT,
      is_read INTEGER NOT NULL DEFAULT 0,
      replied_at TEXT,
      notes TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL UNIQUE,
      quantity_in_stock INTEGER NOT NULL DEFAULT 0,
      reorder_level INTEGER DEFAULT 10,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key_name TEXT NOT NULL UNIQUE,
      value TEXT,
      data_type TEXT,
      description TEXT,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      slug TEXT NOT NULL UNIQUE,
      description TEXT,
      display_order INTEGER NOT NULL DEFAULT 0,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS activity_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      admin_user_id INTEGER,
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id INTEGER,
      name TEXT,
      created_at TEXT NOT NULL
    );
  `);

  const existingAdmin = db.prepare("SELECT id FROM users LIMIT 1").get();
  if (!existingAdmin) {
    const insert = db.prepare(
      "INSERT INTO users (email, password_hash, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?)"
    );
    const timestamp = nowIso();
    insert.run(defaultAdmin.email, hashPassword(defaultAdmin.password), "admin", timestamp, timestamp);
    console.log(`Seeded admin user: ${defaultAdmin.email}`);
  }

  const existingProducts = db.prepare("SELECT COUNT(*) AS count FROM products").get();
  if (!existingProducts?.count) {
    const insert = db.prepare(
      `INSERT INTO products
       (slug, name, category, short_description, description, highlights_json, specs_json, image_key, image_data, is_featured, created_at, updated_at)
       VALUES (@slug, @name, @category, @shortDescription, @description, @highlightsJson, @specsJson, @imageKey, @imageData, @isFeatured, @createdAt, @updatedAt)`
    );
    const timestamp = nowIso();
    db.exec("BEGIN");
    try {
      const insertInventory = db.prepare(
        "INSERT INTO inventory (product_id, quantity_in_stock, updated_at) VALUES (?, ?, ?)"
      );

      for (const item of seedProducts) {
        const result = insert.run({
          slug: item.slug,
          name: item.name,
          category: item.category,
          shortDescription: item.shortDescription,
          description: item.description,
          highlightsJson: JSON.stringify(item.highlights),
          specsJson: JSON.stringify(item.specs),
          imageKey: item.imageKey,
          imageData: null,
          isFeatured: item.isFeatured,
          createdAt: timestamp,
          updatedAt: timestamp,
        });

        insertInventory.run(result.lastInsertRowid, 100, timestamp);
      }
      db.exec("COMMIT");
      console.log(`Seeded ${seedProducts.length} products`);
    } catch (error) {
      db.exec("ROLLBACK");
      throw error;
    }
  }

  const existingEnquiries = db.prepare("SELECT COUNT(*) AS count FROM enquiries").get();
  if (!existingEnquiries?.count) {
    const timestamp = nowIso();
    const insertEnquiry = db.prepare(`
      INSERT INTO enquiries (name, email, phone, subject, message, status, is_read, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertEnquiry.run(
      "Ahmed Khan",
      "ahmed@example.com",
      "919876543210",
      "Bulk Order for PPR Pipes",
      "We are interested in a bulk order of PPR-PN20 pipes for a large residential project. Please share your latest price list.",
      "new",
      0,
      timestamp,
      timestamp
    );

    insertEnquiry.run(
      "Sara Jane",
      "sara@gmail.com",
      null,
      "Installation Query",
      "Do you provide installation services for the Luxury Chrome Basin Mixer?",
      "new",
      0,
      timestamp,
      timestamp
    );

    console.log("Seeded sample enquiries");
  }

  const existingLogs = db.prepare("SELECT COUNT(*) AS count FROM activity_logs").get();
  if (!existingLogs?.count) {
    const timestamp = nowIso();
    const admin = db.prepare("SELECT id FROM users LIMIT 1").get();
    if (admin) {
      logActivity(admin.id, "login", "user", admin.id, "Admin");
      logActivity(admin.id, "update", "settings", null, "Site Settings");
      console.log("Seeded sample activity logs");
    }
  }

  const settingsTimestamp = nowIso();
  const insertSetting = db.prepare(
    "INSERT OR IGNORE INTO settings (key_name, value, data_type, description, updated_at) VALUES (?, ?, ?, ?, ?)"
  );

  insertSetting.run("site_name", "Plumtek Solutions", "string", "Site display name", settingsTimestamp);
  insertSetting.run("site_email", "support@plumtek.com", "string", "Public contact email", settingsTimestamp);
  insertSetting.run("site_phone", "+91 98427 42936", "string", "Public contact phone", settingsTimestamp);
  insertSetting.run("site_address", "", "string", "Business address", settingsTimestamp);
  insertSetting.run("site_description", "Industrial piping and fittings supplier", "string", "SEO description", settingsTimestamp);
  insertSetting.run("currency", "INR", "string", "Default display currency", settingsTimestamp);
  insertSetting.run("vat_rate", "18", "number", "Tax percentage", settingsTimestamp);
  insertSetting.run("items_per_page", "10", "number", "Default listing page size", settingsTimestamp);
  insertSetting.run("activity_logs_retention_days", "90", "number", "Retention in days for audit logs", settingsTimestamp);
  insertSetting.run("enquiry_email_notifications", "true", "boolean", "Send notifications for new enquiries", settingsTimestamp);

  const existingCategories = db.prepare("SELECT COUNT(*) AS count FROM categories").get();
  if (!existingCategories?.count) {
    const timestamp = nowIso();
    const insertCategory = db.prepare(
      "INSERT OR IGNORE INTO categories (name, slug, description, display_order, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, 1, ?, ?)"
    );
    const productCategories = db.prepare("SELECT DISTINCT category FROM products").all();
    let order = 1;
    for (const row of productCategories) {
      if (row.category) {
        const slug = slugify(row.category);
        insertCategory.run(row.category, slug, `${row.category} category description`, order++, timestamp, timestamp);
      }
    }
    if (productCategories.length === 0) {
      const fallbackCategories = [
        "PPR, PP-RCT Pipes",
        "PPR Fittings",
        "PERT & Push Fittings",
        "HDPE & MDPE Fittings",
        "Hoses",
        "Taps, Faucets & Accessories"
      ];
      for (const name of fallbackCategories) {
        const slug = slugify(name);
        insertCategory.run(name, slug, `${name} category description`, order++, timestamp, timestamp);
      }
    }
    console.log("Seeded categories table in SQLite.");
  }
}

initDatabase();

// ── Cleanup: remove orphaned inventory rows (product deleted but inventory left) ──
const orphanedCleanup = db.prepare(
  "DELETE FROM inventory WHERE product_id NOT IN (SELECT id FROM products)"
).run();
if (orphanedCleanup.changes > 0) {
  console.log(`Cleaned up ${orphanedCleanup.changes} orphaned inventory row(s).`);
}

const server = createServer(async (req, res) => {
  if (!req.url || !req.method) {
    sendJson(res, 400, { error: "Bad request" });
    return;
  }

  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const { pathname, searchParams } = url;

  try {
    if (pathname === "/api/health" && req.method === "GET") {
      sendJson(res, 200, { ok: true });
      return;
    }

    if (pathname === "/api/auth/login" && req.method === "POST") {
      const body = await readJson(req);
      const email = String(body.email ?? "").trim().toLowerCase();
      const password = String(body.password ?? "");
      const user = db.prepare("SELECT * FROM users WHERE lower(email) = lower(?) LIMIT 1").get(email);

      if (!user || !verifyPassword(password, user.password_hash)) {
        sendJson(res, 401, { error: "Invalid email or password." });
        return;
      }

      const token = signToken({ sub: user.id, email: user.email, role: user.role });
      sendJson(res, 200, { token, user: { id: user.id, email: user.email, role: user.role } });
      return;
    }

    if (pathname === "/api/auth/me" && req.method === "GET") {
      const auth = requireAuth(req);
      if (!auth) {
        sendJson(res, 401, { error: "Unauthorized" });
        return;
      }
      sendJson(res, 200, { user: { id: auth.sub, email: auth.email, role: auth.role } });
      return;
    }

    if (pathname === "/api/categories" && req.method === "GET") {
      const rows = db.prepare("SELECT category, COUNT(*) AS count FROM products GROUP BY category ORDER BY category ASC").all();
      sendJson(res, 200, { categories: rows.map((row) => ({ name: row.category, count: row.count })) });
      return;
    }

    if (pathname === "/api/products" && req.method === "GET") {
      const result = getProducts({
        search:   searchParams.get("search")   ?? "",
        category: searchParams.get("category") ?? "",
        featured: searchParams.get("featured") ?? "",
        page:     Number(searchParams.get("page")  ?? "1"),
        limit:    Number(searchParams.get("limit") ?? "24"),
        sort:     searchParams.get("sort") ?? "latest",
      });
      sendJson(res, 200, result);
      return;
    }

    if (pathname.startsWith("/api/products/") && req.method === "GET") {
      const slug = decodeURIComponent(pathname.split("/").pop() || "");
      const row = db.prepare("SELECT * FROM products WHERE slug = ? LIMIT 1").get(slug);
      if (!row) {
        sendJson(res, 404, { error: "Product not found" });
        return;
      }
      sendJson(res, 200, { product: rowToProduct(row) });
      return;
    }

    if (pathname === "/api/admin/products" && req.method === "GET") {
      const auth = requireAuth(req);
      if (!auth) {
        sendJson(res, 401, { error: "Unauthorized" });
        return;
      }
      // Admin always gets all products (no pagination) — extract the array from the paginated result
      const result = getProducts({ limit: 500, page: 1 });
      sendJson(res, 200, { products: result.products, total: result.total });
      return;
    }

    if (pathname === "/api/admin/products" && req.method === "POST") {
      const auth = requireAuth(req);
      if (!auth) {
        sendJson(res, 401, { error: "Unauthorized" });
        return;
      }
      const body = await readJson(req);
      const validation = validateProductPayload(body);
      if (validation.error) {
        sendJson(res, 400, { error: validation.error });
        return;
      }
      const product = validation.value;
      const exists = db.prepare("SELECT id FROM products WHERE slug = ? LIMIT 1").get(product.slug);
      if (exists) {
        sendJson(res, 409, { error: "A product with the same slug already exists." });
        return;
      }
      const timestamp = nowIso();
      const result = db.prepare(
        `INSERT INTO products
         (slug, name, category, short_description, description, highlights_json, specs_json, image_key, image_data, is_featured, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).run(
        product.slug,
        product.name,
        product.category,
        product.shortDescription,
        product.description,
        JSON.stringify(product.highlights),
        JSON.stringify(product.specs),
        product.imageKey,
        product.imageData,
        product.isFeatured,
        timestamp,
        timestamp
      );
      const created = db.prepare("SELECT * FROM products WHERE id = ?").get(result.lastInsertRowid);
      sendJson(res, 201, { product: rowToProduct(created) });
      return;
    }

    if (pathname.startsWith("/api/admin/products/") && (req.method === "PUT" || req.method === "DELETE")) {
      const auth = requireAuth(req);
      if (!auth) {
        sendJson(res, 401, { error: "Unauthorized" });
        return;
      }

      const id = Number(pathname.split("/").pop());
      if (!Number.isFinite(id)) {
        sendJson(res, 400, { error: "Invalid product id" });
        return;
      }

      const existing = db.prepare("SELECT * FROM products WHERE id = ? LIMIT 1").get(id);
      if (!existing) {
        sendJson(res, 404, { error: "Product not found" });
        return;
      }

      if (req.method === "DELETE") {
        // Cascade: remove inventory record for this product too
        db.prepare("DELETE FROM inventory WHERE product_id = ?").run(id);
        db.prepare("DELETE FROM products WHERE id = ?").run(id);
        sendJson(res, 200, { success: true });
        return;
      }

      const body = await readJson(req);
      const validation = validateProductPayload(body);
      if (validation.error) {
        sendJson(res, 400, { error: validation.error });
        return;
      }
      const product = validation.value;
      const duplicate = db.prepare("SELECT id FROM products WHERE slug = ? AND id <> ? LIMIT 1").get(product.slug, id);
      if (duplicate) {
        sendJson(res, 409, { error: "A product with the same slug already exists." });
        return;
      }
      const timestamp = nowIso();
      db.prepare(
        `UPDATE products SET
          slug = ?,
          name = ?,
          category = ?,
          short_description = ?,
          description = ?,
          highlights_json = ?,
          specs_json = ?,
          image_key = ?,
          image_data = ?,
          is_featured = ?,
          updated_at = ?
        WHERE id = ?`
      ).run(
        product.slug,
        product.name,
        product.category,
        product.shortDescription,
        product.description,
        JSON.stringify(product.highlights),
        JSON.stringify(product.specs),
        product.imageKey,
        product.imageData,
        product.isFeatured,
        timestamp,
        id
      );
      const updated = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
      sendJson(res, 200, { product: rowToProduct(updated) });
      return;
    }

    // ========== DASHBOARD ENDPOINT ==========

    if (pathname === "/api/admin/dashboard" && req.method === "GET") {
      const auth = requireAuth(req);
      if (!auth) {
        sendJson(res, 401, { error: "Unauthorized" });
        return;
      }

      const statsResult = db.prepare(`
        SELECT
          (SELECT COUNT(*) FROM products) as total_products,
          (SELECT COUNT(DISTINCT category) FROM products) as total_categories,
          (SELECT COUNT(*) FROM enquiries) as total_enquiries,
          (SELECT COUNT(*) FROM enquiries WHERE is_read = 0) as unread_enquiries,
          (SELECT COUNT(*) FROM enquiries WHERE status = 'new') as new_enquiries,
          (SELECT COUNT(*) FROM inventory i WHERE i.quantity_in_stock < i.reorder_level AND EXISTS (SELECT 1 FROM products p WHERE p.id = i.product_id)) as low_stock_items,
          (SELECT COALESCE(SUM(i.quantity_in_stock), 0) FROM inventory i WHERE EXISTS (SELECT 1 FROM products p WHERE p.id = i.product_id)) as total_inventory
      `).get();

      const activityLogs = db.prepare(`
        SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT 20
      `).all();

      sendJson(res, 200, { stats: statsResult || {}, recentActivity: activityLogs || [] });
      return;
    }

    // ========== SETTINGS ENDPOINTS ==========

    if (pathname === "/api/admin/settings" && req.method === "GET") {
      const auth = requireAuth(req);
      if (!auth) {
        sendJson(res, 401, { error: "Unauthorized" });
        return;
      }

      const rows = db.prepare("SELECT key_name, value, data_type FROM settings ORDER BY key_name ASC").all();
      const settings = {};
      for (const row of rows) {
        settings[row.key_name] = row.value ?? "";
      }

      sendJson(res, 200, { settings });
      return;
    }

    if (pathname === "/api/admin/settings" && req.method === "PUT") {
      const auth = requireAuth(req);
      if (!auth) {
        sendJson(res, 401, { error: "Unauthorized" });
        return;
      }

      const payload = await readJson(req);
      const timestamp = nowIso();

      for (const [key, value] of Object.entries(payload)) {
        db.prepare(
          "INSERT INTO settings (key_name, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key_name) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at"
        ).run(String(key), String(value), timestamp);
      }

      logActivity(auth.sub, "update", "settings", null, "Site Settings");
      sendJson(res, 200, { success: true });
      return;
    }

    // ========== ENQUIRY ENDPOINTS ==========

    if (pathname === "/api/enquiries" && req.method === "POST") {
      const body = await readJson(req);
      const name = String(body.name ?? "").trim();
      const email = String(body.email ?? "").trim().toLowerCase();
      const message = String(body.message ?? "").trim();
      
      if (!name || !email || !message) {
        sendJson(res, 400, { error: "Name, email, and message are required." });
        return;
      }

      const timestamp = nowIso();
      db.prepare(
        `INSERT INTO enquiries (name, email, phone, subject, message, ip_address, user_agent, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).run(
        name,
        email,
        body.phone || null,
        body.subject || null,
        message,
        req.headers["x-forwarded-for"] || req.socket.remoteAddress,
        req.headers["user-agent"],
        timestamp,
        timestamp
      );

      sendJson(res, 201, { success: true });
      return;
    }

    if (pathname === "/api/admin/enquiries/stats" && req.method === "GET") {
      const auth = requireAuth(req);
      if (!auth) {
        sendJson(res, 401, { error: "Unauthorized" });
        return;
      }

      const statsResult = db.prepare(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN is_read = 0 THEN 1 ELSE 0 END) as unread,
          SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new
        FROM enquiries
      `).get();

      sendJson(res, 200, {
        total: statsResult.total || 0,
        unread: statsResult.unread || 0,
        new: statsResult.new || 0
      });
      return;
    }

    if (pathname === "/api/admin/enquiries" && req.method === "GET") {
      const auth = requireAuth(req);
      if (!auth) {
        sendJson(res, 401, { error: "Unauthorized" });
        return;
      }

      const searchFilter = searchParams.get("search") || "";
      const statusFilter = searchParams.get("status") || "all";

      let sql = "SELECT * FROM enquiries";
      const clauses = [];
      const params = [];

      if (searchFilter) {
        clauses.push("(name LIKE ? OR email LIKE ? OR subject LIKE ? OR message LIKE ?)");
        const p = `%${searchFilter}%`;
        params.push(p, p, p, p);
      }
      if (statusFilter !== "all") {
        clauses.push("status = ?");
        params.push(statusFilter);
      }

      if (clauses.length > 0) {
        sql += " WHERE " + clauses.join(" AND ");
      }
      sql += " ORDER BY created_at DESC";

      const rows = db.prepare(sql).all(...params);
      sendJson(res, 200, { enquiries: rows || [] });
      return;
    }

    if (pathname.startsWith("/api/admin/enquiries/") && req.method === "PUT") {
      const auth = requireAuth(req);
      if (!auth) {
        sendJson(res, 401, { error: "Unauthorized" });
        return;
      }

      const id = pathname.split("/").pop();
      const body = await readJson(req);
      const timestamp = nowIso();

      if (body.markReplied) {
        db.prepare("UPDATE enquiries SET status = 'replied', replied_at = ?, notes = ?, updated_at = ? WHERE id = ?").run(timestamp, body.notes || null, timestamp, id);
      } else {
        db.prepare("UPDATE enquiries SET status = ?, notes = ?, updated_at = ?, is_read = 1 WHERE id = ?").run(body.status || 'new', body.notes || null, timestamp, id);
      }

      sendJson(res, 200, { success: true });
      return;
    }

    if (pathname.startsWith("/api/admin/enquiries/") && req.method === "GET") {
      const auth = requireAuth(req);
      if (!auth) {
        sendJson(res, 401, { error: "Unauthorized" });
        return;
      }

      const id = pathname.split("/").pop();
      const row = db.prepare("SELECT * FROM enquiries WHERE id = ?").get(id);
      if (!row) {
        sendJson(res, 404, { error: "Enquiry not found" });
        return;
      }

      // Mark as read
      db.prepare("UPDATE enquiries SET is_read = 1 WHERE id = ?").run(id);

      sendJson(res, 200, row);
      return;
    }

    if (pathname.startsWith("/api/admin/enquiries/") && req.method === "DELETE") {
      const auth = requireAuth(req);
      if (!auth) {
        sendJson(res, 401, { error: "Unauthorized" });
        return;
      }

      const id = pathname.split("/").pop();
      db.prepare("DELETE FROM enquiries WHERE id = ?").run(id);
      sendJson(res, 200, { success: true });
      return;
    }

    // ========== ADMIN USERS ENDPOINTS ==========

    if (pathname === "/api/admin/users" && req.method === "GET") {
      const auth = requireAuth(req);
      if (!auth || auth.role !== "admin") {
        sendJson(res, 401, { error: "Unauthorized" });
        return;
      }

      const rows = db.prepare("SELECT id, email, name, role, created_at FROM users ORDER BY created_at DESC").all();
      sendJson(res, 200, { users: rows || [] });
      return;
    }

    if (pathname === "/api/admin/users" && req.method === "POST") {
      const auth = requireAuth(req);
      if (!auth || auth.role !== "admin") {
        sendJson(res, 401, { error: "Unauthorized" });
        return;
      }

      const body = await readJson(req);
      const email = String(body.email ?? "").trim().toLowerCase();
      const name = String(body.name ?? "").trim();
      const password = String(body.password ?? "");
      const role = String(body.role ?? "staff").trim();

      if (!email || !name || !password) {
        sendJson(res, 400, { error: "Email, name, and password are required." });
        return;
      }

      const exists = db.prepare("SELECT id FROM users WHERE lower(email) = lower(?) LIMIT 1").get(email);
      if (exists) {
        sendJson(res, 409, { error: "User with this email already exists." });
        return;
      }

      const timestamp = nowIso();
      const result = db.prepare(
        "INSERT INTO users (email, name, password_hash, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
      ).run(email, name, hashPassword(password), role, timestamp, timestamp);

      const created = db.prepare("SELECT id, email, name, role, created_at FROM users WHERE id = ?").get(result.lastInsertRowid);
      sendJson(res, 201, { user: created });
      return;
    }

    if (pathname.startsWith("/api/admin/users/") && req.method === "PUT") {
      const auth = requireAuth(req);
      if (!auth || auth.role !== "admin") {
        sendJson(res, 401, { error: "Unauthorized" });
        return;
      }

      const id = Number(pathname.split("/").pop());
      if (!Number.isFinite(id)) {
        sendJson(res, 400, { error: "Invalid user id" });
        return;
      }

      const body = await readJson(req);
      const name = String(body.name ?? "").trim();
      const password = String(body.password ?? "");
      const role = String(body.role ?? "staff").trim();

      if (!name) {
        sendJson(res, 400, { error: "Name is required." });
        return;
      }

      const existing = db.prepare("SELECT * FROM users WHERE id = ? LIMIT 1").get(id);
      if (!existing) {
        sendJson(res, 404, { error: "User not found" });
        return;
      }

      const timestamp = nowIso();
      if (password) {
        db.prepare(
          "UPDATE users SET name = ?, password_hash = ?, role = ?, updated_at = ? WHERE id = ?"
        ).run(name, hashPassword(password), role, timestamp, id);
      } else {
        db.prepare(
          "UPDATE users SET name = ?, role = ?, updated_at = ? WHERE id = ?"
        ).run(name, role, timestamp, id);
      }

      const updated = db.prepare("SELECT id, email, name, role, created_at FROM users WHERE id = ?").get(id);
      sendJson(res, 200, { user: updated });
      return;
    }

    // ========== ADMIN CATEGORIES ENDPOINTS ==========

    if (pathname === "/api/admin/categories" && req.method === "GET") {
      const auth = requireAuth(req);
      if (!auth) {
        sendJson(res, 401, { error: "Unauthorized" });
        return;
      }

      const rows = db.prepare(
        "SELECT * FROM categories ORDER BY display_order ASC, name ASC LIMIT 500"
      ).all();

      sendJson(res, 200, {
        categories: rows.map((row) => ({
          id: row.id,
          name: row.name,
          slug: row.slug,
          description: row.description ?? "",
          displayOrder: row.display_order,
          isActive: Boolean(row.is_active),
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        })),
      });
      return;
    }

    if (pathname === "/api/admin/categories" && req.method === "POST") {
      const auth = requireAuth(req);
      if (!auth || auth.role !== "admin") {
        sendJson(res, 401, { error: "Unauthorized" });
        return;
      }

      const body = await readJson(req);
      const name = String(body.name ?? "").trim();
      const description = String(body.description ?? "").trim();
      const displayOrder = Number.parseInt(String(body.displayOrder ?? 0), 10) || 0;

      if (!name) {
        sendJson(res, 400, { error: "name is required" });
        return;
      }

      const slug = slugify(body.slug || name);
      const timestamp = nowIso();

      try {
        const result = db.prepare(
          "INSERT INTO categories (name, slug, description, display_order, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, 1, ?, ?)"
        ).run(name, slug, description, displayOrder, timestamp, timestamp);

        logActivity(auth.sub, "create", "category", result.lastInsertRowid, name);
        sendJson(res, 201, { success: true });
      } catch (error) {
        sendJson(res, 400, { error: "Category already exists" });
      }
      return;
    }

    if (pathname.startsWith("/api/admin/categories/") && req.method === "PUT") {
      const auth = requireAuth(req);
      if (!auth || auth.role !== "admin") {
        sendJson(res, 401, { error: "Unauthorized" });
        return;
      }

      const id = Number(pathname.split("/").pop());
      if (!Number.isFinite(id)) {
        sendJson(res, 400, { error: "Invalid category id" });
        return;
      }

      const body = await readJson(req);
      const existing = db.prepare("SELECT * FROM categories WHERE id = ? LIMIT 1").get(id);
      if (!existing) {
        sendJson(res, 404, { error: "Category not found" });
        return;
      }

      const name = body.name !== undefined ? String(body.name).trim() : undefined;
      const description = body.description !== undefined ? String(body.description).trim() : undefined;
      const displayOrder = body.displayOrder !== undefined ? Number.parseInt(String(body.displayOrder), 10) || 0 : undefined;
      const isActive = body.isActive !== undefined ? (body.isActive ? 1 : 0) : undefined;

      const timestamp = nowIso();
      const updates = [];
      const values = [];

      if (name !== undefined && name !== "") {
        updates.push("name = ?");
        values.push(name);
      }
      if (description !== undefined) {
        updates.push("description = ?");
        values.push(description);
      }
      if (displayOrder !== undefined) {
        updates.push("display_order = ?");
        values.push(displayOrder);
      }
      if (isActive !== undefined) {
        updates.push("is_active = ?");
        values.push(isActive);
      }

      if (!updates.length) {
        sendJson(res, 400, { error: "No fields to update" });
        return;
      }

      updates.push("updated_at = ?");
      values.push(timestamp);
      values.push(id);

      const sql = `UPDATE categories SET ${updates.join(", ")} WHERE id = ?`;
      try {
        db.prepare(sql).run(...values);
        logActivity(auth.sub, "update", "category", id, name ?? existing.name);
        sendJson(res, 200, { success: true });
      } catch (error) {
        sendJson(res, 400, { error: "Category already exists" });
      }
      return;
    }

    if (pathname.startsWith("/api/admin/categories/") && req.method === "DELETE") {
      const auth = requireAuth(req);
      if (!auth || auth.role !== "admin") {
        sendJson(res, 401, { error: "Unauthorized" });
        return;
      }

      const id = Number(pathname.split("/").pop());
      if (!Number.isFinite(id)) {
        sendJson(res, 400, { error: "Invalid category id" });
        return;
      }

      const existing = db.prepare("SELECT * FROM categories WHERE id = ? LIMIT 1").get(id);
      if (!existing) {
        sendJson(res, 404, { error: "Category not found" });
        return;
      }

      const productCount = db.prepare("SELECT COUNT(*) AS count FROM products WHERE category = ?").get(existing.name);
      if (productCount.count > 0) {
        sendJson(res, 400, { error: "Cannot delete category with products" });
        return;
      }

      db.prepare("DELETE FROM categories WHERE id = ?").run(id);
      logActivity(auth.sub, "delete", "category", id, existing.name);
      sendJson(res, 200, { success: true });
      return;
    }

    // ========== ADMIN INVENTORY ENDPOINTS ==========

    if (pathname === "/api/admin/inventory" && req.method === "GET") {
      const auth = requireAuth(req);
      if (!auth) {
        sendJson(res, 401, { error: "Unauthorized" });
        return;
      }

      const lowStockOnly = searchParams.get("lowStock") === "true";
      let sql = `
        SELECT
          i.id,
          i.product_id,
          p.name,
          p.slug AS sku,
          i.quantity_in_stock,
          0 AS quantity_reserved,
          i.reorder_level,
          50 AS reorder_quantity,
          NULL AS last_restock
        FROM inventory i
        JOIN products p ON i.product_id = p.id
        WHERE 1=1
      `;

      if (lowStockOnly) {
        sql += " AND i.quantity_in_stock < i.reorder_level";
      }

      sql += " ORDER BY i.quantity_in_stock ASC LIMIT 500";
      const rows = db.prepare(sql).all();
      sendJson(res, 200, { inventory: rows || [] });
      return;
    }

    if (pathname.startsWith("/api/admin/inventory/") && req.method === "PUT") {
      const auth = requireAuth(req);
      if (!auth) {
        sendJson(res, 401, { error: "Unauthorized" });
        return;
      }

      const productId = Number(pathname.split("/").pop());
      if (!Number.isFinite(productId)) {
        sendJson(res, 400, { error: "Invalid product id" });
        return;
      }

      const payload = await readJson(req);
      const existing = db.prepare("SELECT * FROM inventory WHERE product_id = ? LIMIT 1").get(productId);
      if (!existing) {
        sendJson(res, 404, { error: "Inventory item not found" });
        return;
      }

      const updates = [];
      const values = [];

      if (payload.quantityInStock !== undefined) {
        updates.push("quantity_in_stock = ?");
        values.push(Number.parseInt(String(payload.quantityInStock), 10) || 0);
      }

      if (payload.reorderLevel !== undefined) {
        updates.push("reorder_level = ?");
        values.push(Number.parseInt(String(payload.reorderLevel), 10) || 0);
      }

      if (!updates.length) {
        sendJson(res, 400, { error: "No fields to update" });
        return;
      }

      updates.push("updated_at = ?");
      values.push(nowIso());
      values.push(productId);

      const sql = `UPDATE inventory SET ${updates.join(", ")} WHERE product_id = ?`;
      db.prepare(sql).run(...values);
      logActivity(auth.sub, "update", "inventory", productId, null, payload);
      sendJson(res, 200, { success: true });
      return;
    }

    // ========== ACTIVITY LOGS ENDPOINTS ==========

    if (pathname === "/api/admin/activity-logs" && req.method === "GET") {
      const auth = requireAuth(req);
      if (!auth) {
        sendJson(res, 401, { error: "Unauthorized" });
        return;
      }

      const limit = Math.min(Number(searchParams.get("limit") ?? "50"), 500);
      const rows = db.prepare(`
        SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT ?
      `).all(limit);

      sendJson(res, 200, { logs: rows || [] });
      return;
    }

    sendJson(res, 404, { error: "Not found" });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: error instanceof Error ? error.message : "Internal server error" });
  }
});

server.listen(PORT, () => {
  console.log(`Admin API running on http://localhost:${PORT}`);
});
