import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { createHmac, pbkdf2Sync, randomBytes } from 'node:crypto';

// Load config
dotenv.config({ path: '.env' });
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production', override: true });
}

const config = {
  DB_HOST: process.env.DB_HOST ?? 'localhost',
  DB_PORT: Number(process.env.DB_PORT ?? 3306),
  DB_USER: process.env.DB_USER ?? 'root',
  DB_PASSWORD: process.env.DB_PASSWORD ?? '',
  DB_NAME: process.env.DB_NAME ?? 'plumtek_catalog',
  DB_SSL: process.env.DB_SSL === 'true',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? 'admin@plumtek.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ?? 'PlumtekAdmin@2025',
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  const hash = pbkdf2Sync(password, salt, 120000, 64, 'sha512').toString('hex');
  return `pbkdf2$120000$${salt}$${hash}`;
}

async function run() {
  console.log(`Starting Plumtek Migration V3... Connecting to ${config.DB_HOST}:${config.DB_PORT} as ${config.DB_USER}`);

  const conn = await mysql.createConnection({
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    multipleStatements: true,
    ssl: config.DB_SSL ? { rejectUnauthorized: false } : false,
  });

  try {
//    // Read schema SQL file
//    const sqlPath = path.join(__dirname, 'schema-v3.sql');
//    const sql = fs.readFileSync(sqlPath, 'utf8');
//
//    console.log('Executing V3 Upgrades from schema-v3.sql...');
//    await conn.query(sql);
//    console.log('✓ Tables created/upgraded successfully.');

    // 1. Seed Permissions & Role mappings
    const perms = [
      ['dashboard.view', 'View Dashboard Analytics'],
      ['products.view', 'View Products'],
      ['products.create', 'Create Product'],
      ['products.edit', 'Edit Product'],
      ['products.delete', 'Delete Product'],
      ['products.import', 'Import Products'],
      ['products.export', 'Export Products'],
      ['categories.view', 'View Categories'],
      ['categories.create', 'Create Category'],
      ['categories.edit', 'Edit Category'],
      ['categories.delete', 'Delete Category'],
      ['brands.view', 'View Brands'],
      ['brands.create', 'Create Brand'],
      ['brands.edit', 'Edit Brand'],
      ['brands.delete', 'Delete Brand'],
      ['inventory.view', 'View Inventory'],
      ['inventory.edit', 'Edit Inventory Levels'],
      ['enquiries.view', 'View Contact Enquiries'],
      ['enquiries.edit', 'Update Enquiry Status'],
      ['enquiries.delete', 'Delete Enquiries'],
      ['enquiries.reply', 'Reply to Enquiries'],
      ['careers.view', 'View Career Job Listings & Applications'],
      ['careers.create', 'Create Job Listings'],
      ['careers.edit', 'Edit Job Listings'],
      ['careers.delete', 'Delete Job Listings'],
      ['clients.view', 'View Client Partners'],
      ['clients.create', 'Create Clients'],
      ['clients.edit', 'Edit Clients'],
      ['clients.delete', 'Delete Clients'],
      ['testimonials.view', 'View Testimonials'],
      ['testimonials.create', 'Create Testimonial'],
      ['testimonials.edit', 'Edit Testimonial'],
      ['testimonials.delete', 'Delete Testimonial'],
      ['seo.view', 'View Page SEO Metadata'],
      ['seo.edit', 'Update SEO Metadata'],
      ['settings.view', 'View System Settings'],
      ['settings.edit', 'Edit System Settings'],
      ['users.view', 'View Admin Users'],
      ['users.create', 'Create Admin User'],
      ['users.edit', 'Edit Admin User'],
      ['users.delete', 'Delete Admin User'],
      ['activity_logs.view', 'View Audit Logs']
    ];

    console.log('Seeding Permissions...');
    for (const [name, desc] of perms) {
      await conn.query(
        'INSERT INTO permissions (name, description) VALUES (?, ?) ON DUPLICATE KEY UPDATE description = VALUES(description)',
        [name, desc]
      );
    }

    // Role-Permissions mapping
    const rolesMapping = {
      super_admin: perms.map(p => p[0]), // All
      admin: perms.map(p => p[0]).filter(p => !p.startsWith('users.')), // All except user management
      hr_manager: ['dashboard.view', 'careers.view', 'careers.create', 'careers.edit', 'careers.delete'],
      marketing: ['dashboard.view', 'clients.view', 'clients.create', 'clients.edit', 'clients.delete',
                  'testimonials.view', 'testimonials.create', 'testimonials.edit', 'testimonials.delete',
                  'enquiries.view', 'enquiries.edit', 'enquiries.reply', 'seo.view', 'seo.edit'],
      inventory: ['dashboard.view', 'products.view', 'products.create', 'products.edit', 'products.delete',
                  'categories.view', 'categories.create', 'categories.edit', 'categories.delete',
                  'inventory.view', 'inventory.edit'],
      manager: ['dashboard.view', 'enquiries.view', 'enquiries.edit', 'enquiries.reply',
                'careers.view', 'careers.create', 'careers.edit', 'careers.delete',
                'clients.view', 'clients.create', 'clients.edit', 'clients.delete',
                'testimonials.view', 'testimonials.create', 'testimonials.edit', 'testimonials.delete'],
      staff: ['dashboard.view', 'enquiries.view', 'enquiries.edit'],
    };

    console.log('Seeding Role Permissions...');
    await conn.query('DELETE FROM role_permissions');
    for (const [role, rolePerms] of Object.entries(rolesMapping)) {
      for (const perm of rolePerms) {
        await conn.query('INSERT INTO role_permissions (role, permission) VALUES (?, ?)', [role, perm]);
      }
    }

    // 2. Ensure Super Admin exists
    const [adminCheck] = await conn.query('SELECT id FROM admin_users WHERE email = ?', [config.ADMIN_EMAIL]);
    if (adminCheck.length === 0) {
      const pHash = hashPassword(config.ADMIN_PASSWORD);
      await conn.query(
        'INSERT INTO admin_users (email, password_hash, name, role, is_active, created_at) VALUES (?, ?, ?, ?, 1, NOW())',
        [config.ADMIN_EMAIL, pHash, 'Super Admin', 'super_admin']
      );
      console.log(`✓ Super Admin user created: ${config.ADMIN_EMAIL}`);
    }

    // 3. Seed Career Departments & Locations
    const depts = ['Sales', 'Manufacturing', 'Human Resources', 'Operations', 'Finance', 'Engineering'];
    const locs = ['Coimbatore', 'Chennai', 'Bengaluru', 'Salem', 'Madurai', 'Tirupur', 'Trichy'];

    for (const dept of depts) {
      await conn.query('INSERT IGNORE INTO career_departments (name) VALUES (?)', [dept]);
    }
    for (const loc of locs) {
      await conn.query('INSERT IGNORE INTO career_locations (name) VALUES (?)', [loc]);
    }

    // Connect existing career jobs to the new location/department IDs
    const [jobsCheck] = await conn.query('SELECT COUNT(*) AS count FROM career_jobs');
    if (jobsCheck[0].count === 0) {
      const defaultJobs = [
        { title: 'Sales Executive', dept: 'Sales', loc: 'Chennai', type: 'full-time', desc: 'Drive B2B sales across the Tamil Nadu region.', reqs: '2+ years sales experience, own two-wheeler' },
        { title: 'Quality Control Inspector', dept: 'Manufacturing', loc: 'Coimbatore', type: 'full-time', desc: 'Inspect PPR pipes and fittings for ISO compliance.', reqs: 'Diploma/Degree in Mechanical, 1+ years QC experience' },
        { title: 'HR Executive', dept: 'Human Resources', loc: 'Coimbatore', type: 'full-time', desc: 'Manage recruitment, onboarding, and employee relations.', reqs: 'MBA in HR, 2+ years experience' },
      ];

      for (const j of defaultJobs) {
        const [dRow] = await conn.query('SELECT id FROM career_departments WHERE name = ?', [j.dept]);
        const [lRow] = await conn.query('SELECT id FROM career_locations WHERE name = ?', [j.loc]);
        if (dRow.length > 0 && lRow.length > 0) {
          await conn.query(
            'INSERT INTO career_jobs (title, department_id, location_id, type, description, requirements, is_active, created_at) VALUES (?, ?, ?, ?, ?, ?, 1, NOW())',
            [j.title, dRow[0].id, lRow[0].id, j.type, j.desc, j.reqs]
          );
        }
      }
      console.log('✓ Seeded career listings mapping');
    }

    // 4. Migrate Categories & Products categories references
    console.log('Upgrading category relationships...');
    // Connect products' text category column to the proper category ID from categories table
    await conn.query(`
      UPDATE products p
      JOIN categories c ON LOWER(c.name) = LOWER(p.category)
      SET p.category_id = c.id
      WHERE p.category_id IS NULL
    `);

    // Ensure inventory has correct schema additions if it already existed
    try {
      await conn.query('ALTER TABLE `inventory` ADD COLUMN `quantity_reserved` INT NOT NULL DEFAULT 0 AFTER `quantity_in_stock`');
    } catch (e) {}
    try {
      await conn.query('ALTER TABLE `inventory` ADD COLUMN `reorder_qty` INT NOT NULL DEFAULT 50 AFTER `reorder_level`');
    } catch (e) {}
    try {
      await conn.query('ALTER TABLE `inventory` ADD COLUMN `last_restocked` DATETIME DEFAULT NULL AFTER `reorder_qty`');
    } catch (e) {}

    // Ensure all products have an inventory entry
    await conn.query(`
      INSERT IGNORE INTO inventory (product_id, quantity_in_stock, reorder_level, reorder_qty, updated_at)
      SELECT id, 100, 10, 50, NOW() FROM products
    `);

    console.log('✓ Migration V3 completed successfully.');

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await conn.end();
  }
}

run();
