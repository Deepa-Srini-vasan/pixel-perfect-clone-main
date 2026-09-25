import { CareerRepository } from '../repositories/CareerRepository.js';
import { nowStr, safeInt } from '../utils/helpers.js';
import { queueService } from './QueueService.js';

const careerRepo = new CareerRepository();

export class CareerService {
  async getPublicJobs() {
    return await careerRepo.getPublicJobs();
  }

  async getAdminJobs() {
    return await careerRepo.getAdminJobs();
  }

  async createJob(data, adminId, ip) {
    let deptId = data.departmentId;
    let locId = data.locationId;

    if (data.department) {
      deptId = await careerRepo.findOrCreateDept(data.department);
    }
    if (data.location) {
      locId = await careerRepo.findOrCreateLoc(data.location);
    }

    const payload = {
      title:         data.title,
      department_id: deptId,
      location_id:   locId,
      type:          data.type || 'full-time',
      description:   data.description,
      requirements:  data.requirements || null,
      is_active:     data.isActive !== false ? 1 : 0,
      expires_at:    data.expiresAt || null,
      created_by:    adminId,
      created_at:    nowStr(),
    };
    return await careerRepo.createJob(payload);
  }

  async updateJob(id, data, adminId, ip) {
    const existing = await careerRepo.getJobById(id);
    if (!existing) return false;

    let deptId = data.departmentId ?? existing.department_id;
    let locId = data.locationId ?? existing.location_id;

    if (data.department) {
      deptId = await careerRepo.findOrCreateDept(data.department);
    }
    if (data.location) {
      locId = await careerRepo.findOrCreateLoc(data.location);
    }

    const payload = {
      title:         data.title         ?? existing.title,
      department_id: deptId,
      location_id:   locId,
      type:          data.type          ?? existing.type,
      description:   data.description   ?? existing.description,
      requirements:  data.requirements  ?? existing.requirements,
      is_active:     data.isActive !== undefined ? (data.isActive ? 1 : 0) : existing.is_active,
      expires_at:    data.expiresAt     ?? existing.expires_at,
    };
    return await careerRepo.updateJob(id, payload);
  }

  async deleteJob(id, adminId, ip) {
    return await careerRepo.deleteJob(id);
  }

  async getApplications(params = {}) {
    const page   = safeInt(params.page, 1, 1);
    const limit  = safeInt(params.limit, 25, 1, 100);
    const offset = (page - 1) * limit;

    const { applications, total } = await careerRepo.getApplications({
      ...params,
      limit,
      offset
    });

    return {
      applications,
      total,
      page,
      limit
    };
  }

  async getApplicationById(id) {
    return await careerRepo.getApplicationById(id);
  }

  async submitApplication(data, ip) {
    const payload = {
      job_id:          data.jobId || null,
      name:            data.name,
      email:           data.email,
      phone:           data.phone,
      position:        data.position,
      experience:      data.experience || null,
      cover_letter:    data.coverLetter || '',
      resume_media_id: data.resumeMediaId || null,
      status:          'new',
      is_read:         0,
      ip_address:      ip,
      created_at:      nowStr(),
    };

    const id = await careerRepo.createApplication(payload);

    // Queue background email
    await queueService.addJob('career_email', {
      name:         data.name,
      email:        data.email,
      phone:        data.phone,
      position:     data.position,
      experience:   data.experience,
      coverLetter:  data.coverLetter,
    });

    return id;
  }

  async updateApplication(id, data, adminId, ip) {
    const payload = {
      status:      data.status,
      notes:       data.notes,
      assigned_to: data.assignedTo || null,
      is_read:     1,
    };
    return await careerRepo.updateApplication(id, payload);
  }
}
export const careerService = new CareerService();
