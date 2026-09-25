import { BaseRepository } from './BaseRepository.js';
import { executeQuery } from '../database/connection.js';

export class EnquiryRepository extends BaseRepository {
  constructor() {
    super('enquiries');
  }

  async getFiltered({ search, type, status, unread, limit, offset }) {
    let where = '1=1';
    const params = [];

    if (search) {
      where += ' AND (name LIKE ? OR email LIKE ? OR subject LIKE ? OR phone LIKE ?)';
      const s = `%${search}%`;
      params.push(s, s, s, s);
    }
    if (type) {
      where += ' AND type = ?';
      params.push(type);
    }
    if (status) {
      where += ' AND status = ?';
      params.push(status);
    }
    if (unread !== undefined) {
      where += ' AND is_read = ?';
      params.push(unread ? 0 : 1);
    }

    const [countRow] = await executeQuery(`SELECT COUNT(*) AS total FROM enquiries WHERE ${where}`, params);
    const enquiries = await executeQuery(
      `SELECT e.*, u.name AS assignee_name
       FROM enquiries e
       LEFT JOIN admin_users u ON e.assigned_to = u.id
       WHERE ${where}
       ORDER BY e.created_at DESC
       LIMIT ${limit} OFFSET ${offset}`,
      params
    );

    return { enquiries, total: countRow?.total || 0 };
  }

  async getReplies(enquiryId) {
    return await executeQuery(
      `SELECT er.*, u.name AS admin_name
       FROM enquiry_replies er
       JOIN admin_users u ON er.admin_id = u.id
       WHERE er.enquiry_id = ?
       ORDER BY er.created_at ASC`,
      [enquiryId]
    );
  }

  async create(data) {
    const keys = Object.keys(data);
    const placeholders = keys.map(() => '?').join(', ');
    const values = Object.values(data);
    const result = await executeQuery(
      `INSERT INTO enquiries (${keys.map(k => `\`${k}\``).join(', ')}) VALUES (${placeholders})`,
      values
    );
    return result.insertId;
  }

  async update(id, data) {
    const updates = Object.keys(data).map(k => `\`${k}\` = ?`).join(', ');
    const values = [...Object.values(data), id];
    return await executeQuery(`UPDATE enquiries SET ${updates} WHERE id = ?`, values);
  }

  async createReply(enquiryId, adminId, message) {
    return await executeQuery(
      'INSERT INTO enquiry_replies (enquiry_id, admin_id, message, created_at) VALUES (?, ?, ?, NOW())',
      [enquiryId, adminId, message]
    );
  }
}
