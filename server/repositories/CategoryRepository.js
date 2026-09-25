import { BaseRepository } from './BaseRepository.js';
import { executeQuery } from '../database/connection.js';

export class CategoryRepository extends BaseRepository {
  constructor() {
    super('categories');
  }

  async getTree() {
    return await executeQuery(
      `SELECT c.id, c.name, c.slug, c.parent_id AS parentId, m.file_path AS imageUrl, c.display_order, c.is_active,
              COUNT(p.id) AS count
       FROM categories c
       LEFT JOIN products p ON p.category_id = c.id AND p.is_active = 1 AND p.deleted_at IS NULL
       LEFT JOIN media m ON c.image_media_id = m.id
       WHERE c.is_active = 1
       GROUP BY c.id
       ORDER BY c.display_order, c.name`
    );
  }

  async allWithCount() {
    return await executeQuery(
      `SELECT c.*, COUNT(p.id) AS product_count, m.file_path AS image_path
       FROM categories c
       LEFT JOIN products p ON p.category_id = c.id AND p.deleted_at IS NULL
       LEFT JOIN media m ON c.image_media_id = m.id
       GROUP BY c.id
       ORDER BY c.display_order, c.name`
    );
  }

  async create(data) {
    const keys = Object.keys(data);
    const placeholders = keys.map(() => '?').join(', ');
    const values = Object.values(data);
    const result = await executeQuery(
      `INSERT INTO categories (${keys.map(k => `\`${k}\``).join(', ')}) VALUES (${placeholders})`,
      values
    );
    return result.insertId;
  }

  async update(id, data) {
    const updates = Object.keys(data).map(k => `\`${k}\` = ?`).join(', ');
    const values = [...Object.values(data), id];
    return await executeQuery(`UPDATE categories SET ${updates} WHERE id = ?`, values);
  }

  async getProductCount(id) {
    const [row] = await executeQuery(
      'SELECT COUNT(*) AS count FROM products WHERE category_id = ? AND deleted_at IS NULL',
      [id]
    );
    return row?.count || 0;
  }
}
