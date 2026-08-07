import { BaseRepository } from './BaseRepository.js';
import { executeQuery } from '../database/connection.js';
import { nowStr } from '../utils/helpers.js';

export class ProductRepository extends BaseRepository {
  constructor() {
    super('products');
  }

  async findFiltered({ search, categoryId, categorySlug, featured, brandId, active, limit, offset, sort }) {
    let where = 'p.deleted_at IS NULL';
    const params = [];

    if (search) {
      where += ' AND (p.name LIKE ? OR p.short_description LIKE ? OR p.description LIKE ? OR p.sku LIKE ?)';
      const s = `%${search}%`;
      params.push(s, s, s, s);
    }
    if (categoryId) {
      where += ' AND (p.category_id = ? OR c.parent_id = ?)';
      params.push(categoryId, categoryId);
    } else if (categorySlug) {
      where += ' AND (c.slug = ? OR c.name = ?)';
      params.push(categorySlug, categorySlug);
    }
    if (featured !== undefined) {
      where += ' AND p.is_featured = ?';
      params.push(featured ? 1 : 0);
    }
    if (brandId) {
      where += ' AND p.brand_id = ?';
      params.push(brandId);
    }
    if (active !== undefined) {
      where += ' AND p.is_active = ?';
      params.push(active ? 1 : 0);
    }

    const orderMap = {
      latest:      'p.created_at DESC',
      'name-asc':  'p.name ASC',
      'name-desc': 'p.name DESC',
      featured:    'p.is_featured DESC, p.sort_order ASC',
    };
    const order = orderMap[sort] || orderMap.latest;

    const [countRow] = await executeQuery(
      `SELECT COUNT(DISTINCT p.id) AS total FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE ${where}`,
      params
    );

    const products = await executeQuery(
      `SELECT p.*, MAX(c.name) AS category_name, MAX(b.name) AS brand_name, MAX(m.file_path) AS main_image_path
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN brands b ON p.brand_id = b.id
       LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_primary = 1
       LEFT JOIN media m ON pi.media_id = m.id
       WHERE ${where}
       GROUP BY p.id
       ORDER BY ${order}
       LIMIT ${limit} OFFSET ${offset}`,
      params
    );

    return { products, total: countRow?.total || 0 };
  }

  async findBySlug(slug) {
    const [row] = await executeQuery(
      `SELECT p.*, c.name AS category_name, b.name AS brand_name
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN brands b ON p.brand_id = b.id
       WHERE p.slug = ? AND p.deleted_at IS NULL LIMIT 1`,
      [slug]
    );
    return row || null;
  }

  async getImages(productId) {
    return await executeQuery(
      'SELECT pi.id, pi.media_id, pi.alt_text, pi.is_primary, pi.sort_order, m.file_path FROM product_images pi JOIN media m ON pi.media_id = m.id WHERE pi.product_id = ? ORDER BY pi.sort_order, pi.id',
      [productId]
    );
  }

  async getDocuments(productId) {
    return await executeQuery(
      'SELECT pd.id, pd.media_id, pd.title, pd.sort_order, m.file_path FROM product_documents pd JOIN media m ON pd.media_id = m.id WHERE pd.product_id = ? ORDER BY pd.sort_order, pd.id',
      [productId]
    );
  }

  async getVideos(productId) {
    return await executeQuery(
      'SELECT * FROM product_videos WHERE product_id = ? ORDER BY sort_order, id',
      [productId]
    );
  }

  async create(data) {
    const keys = Object.keys(data);
    const placeholders = keys.map(() => '?').join(', ');
    const values = Object.values(data);

    const result = await executeQuery(
      `INSERT INTO products (${keys.map(k => `\`${k}\``).join(', ')}) VALUES (${placeholders})`,
      values
    );
    return result.insertId;
  }

  async update(id, data) {
    const updates = Object.keys(data).map(k => `\`${k}\` = ?`).join(', ');
    const values = [...Object.values(data), id];

    return await executeQuery(
      `UPDATE products SET ${updates} WHERE id = ?`,
      values
    );
  }

  async softDelete(id, userId) {
    return await executeQuery(
      'UPDATE products SET deleted_at = ?, updated_by = ? WHERE id = ?',
      [nowStr(), userId, id]
    );
  }
}
