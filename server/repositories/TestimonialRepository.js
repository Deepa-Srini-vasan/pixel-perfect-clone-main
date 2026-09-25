import { BaseRepository } from './BaseRepository.js';
import { executeQuery } from '../database/connection.js';

export class TestimonialRepository extends BaseRepository {
  constructor() {
    super('testimonials');
  }

  async getActive() {
    return await executeQuery(
      `SELECT t.id, t.name, t.company, t.designation, t.industry, t.rating, t.message, t.is_featured, t.sort_order, m.file_path AS photo_path
       FROM testimonials t
       LEFT JOIN media m ON t.photo_media_id = m.id
       WHERE t.is_active = 1
       ORDER BY t.sort_order, t.id`
    );
  }

  async allWithPhoto() {
    return await executeQuery(
      `SELECT t.*, m.file_path AS photo_path
       FROM testimonials t
       LEFT JOIN media m ON t.photo_media_id = m.id
       ORDER BY t.sort_order, t.id`
    );
  }

  async create(data) {
    const keys = Object.keys(data);
    const placeholders = keys.map(() => '?').join(', ');
    const values = Object.values(data);
    const result = await executeQuery(
      `INSERT INTO testimonials (${keys.map(k => `\`${k}\``).join(', ')}) VALUES (${placeholders})`,
      values
    );
    return result.insertId;
  }

  async update(id, data) {
    const updates = Object.keys(data).map(k => `\`${k}\` = ?`).join(', ');
    const values = [...Object.values(data), id];
    return await executeQuery(`UPDATE testimonials SET ${updates} WHERE id = ?`, values);
  }
}
