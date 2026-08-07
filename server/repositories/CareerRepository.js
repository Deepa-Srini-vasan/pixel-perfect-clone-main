import { executeQuery } from '../database/connection.js';

export class CareerRepository {
  async getPublicJobs() {
    return await executeQuery(
      `SELECT j.id, j.title, d.name AS department, l.name AS location, j.type, j.description, j.requirements, j.created_at
       FROM career_jobs j
       JOIN career_departments d ON j.department_id = d.id
       JOIN career_locations l ON j.location_id = l.id
       WHERE j.is_active = 1 AND (j.expires_at IS NULL OR j.expires_at >= CURDATE())
       ORDER BY j.created_at DESC`
    );
  }

  async getAdminJobs() {
    return await executeQuery(
      `SELECT j.*, d.name AS department, l.name AS location, COUNT(a.id) AS application_count
       FROM career_jobs j
       JOIN career_departments d ON j.department_id = d.id
       JOIN career_locations l ON j.location_id = l.id
       LEFT JOIN career_applications a ON a.job_id = j.id
       GROUP BY j.id
       ORDER BY j.created_at DESC`
    );
  }

  async getJobById(id) {
    const [row] = await executeQuery('SELECT * FROM career_jobs WHERE id = ? LIMIT 1', [id]);
    return row || null;
  }

  async createJob(data) {
    const keys = Object.keys(data);
    const placeholders = keys.map(() => '?').join(', ');
    const values = Object.values(data);
    const result = await executeQuery(
      `INSERT INTO career_jobs (${keys.map(k => `\`${k}\``).join(', ')}) VALUES (${placeholders})`,
      values
    );
    return result.insertId;
  }

  async updateJob(id, data) {
    const updates = Object.keys(data).map(k => `\`${k}\` = ?`).join(', ');
    const values = [...Object.values(data), id];
    return await executeQuery(`UPDATE career_jobs SET ${updates} WHERE id = ?`, values);
  }

  async deleteJob(id) {
    return await executeQuery('DELETE FROM career_jobs WHERE id = ?', [id]);
  }

  async findOrCreateDept(name) {
    const trimmed = String(name || '').trim();
    const [existing] = await executeQuery('SELECT id FROM career_departments WHERE name = ? LIMIT 1', [trimmed]);
    if (existing) return existing.id;
    const res = await executeQuery('INSERT INTO career_departments (name) VALUES (?)', [trimmed]);
    return res.insertId;
  }

  async findOrCreateLoc(name) {
    const trimmed = String(name || '').trim();
    const [existing] = await executeQuery('SELECT id FROM career_locations WHERE name = ? LIMIT 1', [trimmed]);
    if (existing) return existing.id;
    const res = await executeQuery('INSERT INTO career_locations (name) VALUES (?)', [trimmed]);
    return res.insertId;
  }

  async getApplications({ search, status, jobId, limit, offset }) {
    let where = '1=1';
    const params = [];

    if (search) {
      where += ' AND (ca.name LIKE ? OR ca.email LIKE ? OR ca.position LIKE ?)';
      const s = `%${search}%`;
      params.push(s, s, s);
    }
    if (status) {
      where += ' AND ca.status = ?';
      params.push(status);
    }
    if (jobId) {
      where += ' AND ca.job_id = ?';
      params.push(jobId);
    }

    const [countRow] = await executeQuery(
      `SELECT COUNT(*) AS total FROM career_applications ca WHERE ${where}`,
      params
    );

    const applications = await executeQuery(
      `SELECT ca.*, j.title AS job_title, m.file_path AS resume_path
       FROM career_applications ca
       LEFT JOIN career_jobs j ON ca.job_id = j.id
       LEFT JOIN media m ON ca.resume_media_id = m.id
       WHERE ${where}
       ORDER BY ca.created_at DESC
       LIMIT ${limit} OFFSET ${offset}`,
      params
    );

    return { applications, total: countRow?.total || 0 };
  }

  async getApplicationById(id) {
    const [row] = await executeQuery(
      `SELECT ca.*, j.title AS job_title, m.file_path AS resume_path
       FROM career_applications ca
       LEFT JOIN career_jobs j ON ca.job_id = j.id
       LEFT JOIN media m ON ca.resume_media_id = m.id
       WHERE ca.id = ? LIMIT 1`,
      [id]
    );
    return row || null;
  }

  async createApplication(data) {
    const keys = Object.keys(data);
    const placeholders = keys.map(() => '?').join(', ');
    const values = Object.values(data);
    const result = await executeQuery(
      `INSERT INTO career_applications (${keys.map(k => `\`${k}\``).join(', ')}) VALUES (${placeholders})`,
      values
    );
    return result.insertId;
  }

  async updateApplication(id, data) {
    const updates = Object.keys(data).map(k => `\`${k}\` = ?`).join(', ');
    const values = [...Object.values(data), id];
    return await executeQuery(`UPDATE career_applications SET ${updates} WHERE id = ?`, values);
  }
}
