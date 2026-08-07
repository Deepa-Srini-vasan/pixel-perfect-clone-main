import { BaseRepository } from './BaseRepository.js';
import { executeQuery } from '../database/connection.js';

export class ClientRepository extends BaseRepository {
  constructor() {
    super('clients');
  }

  async getActive() {
    return await executeQuery(
      `SELECT c.id, c.name, c.industry, c.location, c.website_url, c.description, c.is_featured, c.sort_order, m.file_path AS logo_path
       FROM clients c
       LEFT JOIN media m ON c.logo_media_id = m.id
       WHERE c.is_active = 1
       ORDER BY c.sort_order, c.id`
    );
  }

  async allWithLogo() {
    return await executeQuery(
      `SELECT c.*, m.file_path AS logo_path
       FROM clients c
       LEFT JOIN media m ON c.logo_media_id = m.id
       ORDER BY c.sort_order, c.id`
    );
  }

  async create(data) {
    const keys = Object.keys(data);
    const placeholders = keys.map(() => '?').join(', ');
    const values = Object.values(data);
    const result = await executeQuery(
      `INSERT INTO clients (${keys.map(k => `\`${k}\``).join(', ')}) VALUES (${placeholders})`,
      values
    );
    return result.insertId;
  }

  async update(id, data) {
    const updates = Object.keys(data).map(k => `\`${k}\` = ?`).join(', ');
    const values = [...Object.values(data), id];
    return await executeQuery(`UPDATE clients SET ${updates} WHERE id = ?`, values);
  }
}
