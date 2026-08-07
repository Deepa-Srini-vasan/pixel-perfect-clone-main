import { executeQuery } from '../database/connection.js';
import { sendJson } from '../utils/http.js';

let statsCache = null;
let statsCacheExpiry = 0;
const CACHE_TTL = 300000; // 5 minutes

export class DashboardController {
  async getStats(req, res) {
    const now = Date.now();
    if (statsCache && now < statsCacheExpiry) {
      sendJson(res, 200, statsCache);
      return;
    }

    const [stats] = await executeQuery(`
      SELECT
        (SELECT COUNT(*) FROM products   WHERE is_active = 1 AND deleted_at IS NULL) AS products,
        (SELECT COUNT(*) FROM categories WHERE is_active = 1)                        AS categories,
        (SELECT COUNT(*) FROM enquiries)                                              AS enquiries,
        (SELECT COUNT(*) FROM enquiries  WHERE is_read = 0)                          AS unread_enquiries,
        (SELECT COUNT(*) FROM enquiries  WHERE status = 'new')                       AS new_enquiries,
        (SELECT COUNT(*) FROM career_applications WHERE status = 'new')              AS new_applications,
        (SELECT COUNT(*) FROM clients    WHERE is_active = 1)                        AS clients,
        (SELECT COUNT(*) FROM testimonials WHERE is_active = 1)                      AS testimonials,
        (SELECT COUNT(*) FROM inventory  WHERE quantity_in_stock < reorder_level)    AS low_stock,
        (SELECT COALESCE(SUM(quantity_in_stock), 0) FROM inventory)                  AS total_stock
    `);

    const recentEnquiries = await executeQuery(
      'SELECT id, type, name, email, subject, status, created_at FROM enquiries ORDER BY created_at DESC LIMIT 10'
    );

    const recentActivity = await executeQuery(
      `SELECT al.id, al.action, al.entity_type, al.entity_id, al.created_at, u.name AS admin_name
       FROM activity_logs al
       LEFT JOIN admin_users u ON al.admin_user_id = u.id
       ORDER BY al.created_at DESC LIMIT 20`
    );

    const lowStockItems = await executeQuery(
      `SELECT p.id, p.name, p.sku, i.quantity_in_stock, i.reorder_level
       FROM inventory i JOIN products p ON i.product_id = p.id
       WHERE i.quantity_in_stock < i.reorder_level AND p.is_active = 1
       ORDER BY i.quantity_in_stock ASC LIMIT 10`
    );

    // Rich widget information: visitors count mock, top queried products
    const topProducts = await executeQuery(`
      SELECT product_name, COUNT(*) AS count 
      FROM enquiries 
      WHERE product_name IS NOT NULL 
      GROUP BY product_name 
      ORDER BY count DESC LIMIT 5
    `);

    const leadsByStatus = await executeQuery(`
      SELECT status, COUNT(*) AS count 
      FROM enquiries 
      GROUP BY status
    `);

    statsCache = {
      stats,
      recentEnquiries,
      recentActivity,
      lowStockItems,
      topProducts,
      leadsByStatus,
      visitors_today: Math.floor(Math.random() * 50) + 120, // Real-time simulated hits
    };
    statsCacheExpiry = now + CACHE_TTL;

    sendJson(res, 200, statsCache);
  }
}
export const dashboardController = new DashboardController();
