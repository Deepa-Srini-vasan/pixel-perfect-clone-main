import { executeQuery } from '../database/connection.js';

export class BaseRepository {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async all() {
    return await executeQuery(`SELECT * FROM \`${this.tableName}\``);
  }

  async find(id) {
    const [row] = await executeQuery(`SELECT * FROM \`${this.tableName}\` WHERE id = ? LIMIT 1`, [id]);
    return row || null;
  }

  async delete(id) {
    return await executeQuery(`DELETE FROM \`${this.tableName}\` WHERE id = ?`, [id]);
  }
}
