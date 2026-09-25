import { BaseRepository } from './BaseRepository.js';
import { executeQuery } from '../database/connection.js';

export class UserRepository extends BaseRepository {
  constructor() {
    super('admin_users');
  }

  async findByEmail(email) {
    const [row] = await executeQuery(
      'SELECT * FROM admin_users WHERE email = ? AND is_active = 1 LIMIT 1',
      [String(email).trim().toLowerCase()]
    );
    return row || null;
  }

  async create(data) {
    const keys = Object.keys(data);
    const placeholders = keys.map(() => '?').join(', ');
    const values = Object.values(data);
    const result = await executeQuery(
      `INSERT INTO admin_users (${keys.map(k => `\`${k}\``).join(', ')}) VALUES (${placeholders})`,
      values
    );
    return result.insertId;
  }

  async update(id, data) {
    const updates = Object.keys(data).map(k => `\`${k}\` = ?`).join(', ');
    const values = [...Object.values(data), id];
    return await executeQuery(`UPDATE admin_users SET ${updates} WHERE id = ?`, values);
  }

  async logActivity(adminId, action, entityType, entityId, oldValues, newValues, ip, userAgent) {
    try {
      await executeQuery(
        `INSERT INTO activity_logs 
         (admin_user_id, action, entity_type, entity_id, old_values, new_values, ip_address, user_agent, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          adminId, action, entityType, entityId,
          oldValues ? JSON.stringify(oldValues) : null,
          newValues ? JSON.stringify(newValues) : null,
          ip, userAgent || null
        ]
      );
    } catch (e) {
      console.error('[ActivityLog error]', e.message);
    }
  }

  async getRecentActivity(limit = 20) {
    return await executeQuery(
      `SELECT al.id, al.action, al.entity_type, al.entity_id, al.created_at, u.name AS admin_name
       FROM activity_logs al
       LEFT JOIN admin_users u ON al.admin_user_id = u.id
       ORDER BY al.created_at DESC LIMIT ?`,
      [Number.parseInt(limit, 10)]
    );
  }

  async getActivityLogsFiltered(limit, offset) {
    const [countRow] = await executeQuery('SELECT COUNT(*) AS total FROM activity_logs');
    const logs = await executeQuery(
      `SELECT al.*, u.name AS admin_name
       FROM activity_logs al
       LEFT JOIN admin_users u ON al.admin_user_id = u.id
       ORDER BY al.created_at DESC
       LIMIT ? OFFSET ?`,
      [Number.parseInt(limit, 10), Number.parseInt(offset, 10)]
    );
    return { logs, total: countRow?.total || 0 };
  }
}
