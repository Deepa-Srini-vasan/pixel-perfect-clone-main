import { BaseRepository } from './BaseRepository.js';
import { executeQuery } from '../database/connection.js';

export class InventoryRepository extends BaseRepository {
  constructor() {
    super('inventory');
  }

  async getFiltered({ search, lowStock, limit, offset }) {
    let where = 'p.deleted_at IS NULL';
    const params = [];

    if (lowStock) {
      where += ' AND i.quantity_in_stock < i.reorder_level';
    }
    if (search) {
      where += ' AND (p.name LIKE ? OR p.sku LIKE ?)';
      const s = `%${search}%`;
      params.push(s, s);
    }

    const [countRow] = await executeQuery(
      `SELECT COUNT(*) AS total FROM inventory i JOIN products p ON i.product_id = p.id WHERE ${where}`,
      params
    );

    const items = await executeQuery(
      `SELECT p.id, p.name, p.sku, c.name AS category,
              i.quantity_in_stock AS qty, i.quantity_reserved AS reserved,
              i.reorder_level, i.reorder_qty, i.last_restocked, i.updated_at
       FROM inventory i
       JOIN products p ON i.product_id = p.id
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE ${where}
       ORDER BY i.quantity_in_stock ASC
       LIMIT ${limit} OFFSET ${offset}`,
      params
    );

    return { items, total: countRow?.total || 0 };
  }

  async findByProductId(productId) {
    const [row] = await executeQuery('SELECT * FROM inventory WHERE product_id = ? LIMIT 1', [productId]);
    return row || null;
  }

  async updateByProductId(productId, data) {
    const updates = Object.keys(data).map(k => `\`${k}\` = ?`).join(', ');
    const values = [...Object.values(data), productId];
    return await executeQuery(`UPDATE inventory SET ${updates} WHERE product_id = ?`, values);
  }
}
