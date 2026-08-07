import { executeQuery } from '../database/connection.js';
import { sendCareerApplicationEmail } from '../utils/email.js';

export class QueueService {
  async addJob(jobType, payload) {
    const result = await executeQuery(
      "INSERT INTO job_queue (job_type, payload, status, created_at, updated_at) VALUES (?, ?, 'pending', NOW(), NOW())",
      [jobType, JSON.stringify(payload)]
    );
    return result.insertId;
  }

  async processNext() {
    // Get next pending job
    const [job] = await executeQuery(
      "SELECT * FROM job_queue WHERE status = 'pending' ORDER BY id ASC LIMIT 1"
    );
    if (!job) return false;

    // Mark as processing
    await executeQuery(
      "UPDATE job_queue SET status = 'processing', attempts = attempts + 1, updated_at = NOW() WHERE id = ?",
      [job.id]
    );

    let payloadData = {};
    try {
      payloadData = typeof job.payload === 'string' ? JSON.parse(job.payload) : job.payload;
    } catch (e) {
      await executeQuery(
        "UPDATE job_queue SET status = 'failed', error_log = ? WHERE id = ?",
        ['Invalid JSON payload: ' + e.message, job.id]
      );
      return true;
    }

    try {
      if (job.job_type === 'career_email') {
        await sendCareerApplicationEmail(payloadData);
      } else {
        console.warn(`[QueueService] Unknown job type: ${job.job_type}`);
      }

      // Mark completed
      await executeQuery(
        "UPDATE job_queue SET status = 'completed', updated_at = NOW() WHERE id = ?",
        [job.id]
      );
    } catch (error) {
      const maxRetries = 3;
      const status = job.attempts >= maxRetries ? 'failed' : 'pending';
      await executeQuery(
        "UPDATE job_queue SET status = ?, error_log = ?, updated_at = NOW() WHERE id = ?",
        [status, error.message, job.id]
      );
      console.error(`[QueueService] Job ${job.id} failed: ${error.message}`);
    }

    return true;
  }

  startLoop() {
    // Poll queue every 15 seconds
    setInterval(async () => {
      try {
        let processed = true;
        while (processed) {
          processed = await this.processNext();
        }
      } catch (err) {
        console.error('[QueueService error]', err.message);
      }
    }, 15000).unref();
    console.log('[QueueService] Background loop started.');
  }
}
export const queueService = new QueueService();
