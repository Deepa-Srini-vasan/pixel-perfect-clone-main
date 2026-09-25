import { BaseRepository } from './BaseRepository.js';
import { executeQuery } from '../database/connection.js';

export class MediaRepository extends BaseRepository {
  constructor() {
    super('media');
  }

  async create(data) {
    const keys = Object.keys(data);
    const placeholders = keys.map(() => '?').join(', ');
    const values = Object.values(data);
    const result = await executeQuery(
      `INSERT INTO media (${keys.map(k => `\`${k}\``).join(', ')}) VALUES (${placeholders})`,
      values
    );
    return result.insertId;
  }
}
