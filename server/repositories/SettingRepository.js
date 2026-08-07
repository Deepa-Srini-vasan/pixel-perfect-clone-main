import { executeQuery } from '../database/connection.js';

export class SettingRepository {
  async getByGroup(group) {
    return await executeQuery('SELECT * FROM settings WHERE group_name = ? ORDER BY key_name', [group]);
  }

  async getAll() {
    return await executeQuery('SELECT * FROM settings ORDER BY group_name, key_name');
  }

  async set(group, key, value) {
    return await executeQuery(
      `INSERT INTO settings (group_name, key_name, value) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE value = VALUES(value), updated_at = NOW()`,
      [group, key, value]
    );
  }
}
