import { careerService } from '../services/CareerService.js';
import { sendJson, readBody } from '../utils/http.js';
import { safeInt } from '../utils/helpers.js';

export class CareerController {
  async getPublicJobs(req, res) {
    const jobs = await careerService.getPublicJobs();
    sendJson(res, 200, { jobs });
  }

  async getAdminJobs(req, res) {
    const jobs = await careerService.getAdminJobs();
    sendJson(res, 200, { jobs });
  }

  async createJob(req, res) {
    const body = await readBody(req);
    const id = await careerService.createJob(body, req.user?.userId, req.ip);
    sendJson(res, 201, { id });
  }

  async updateJob(req, res, id) {
    const body = await readBody(req);
    await careerService.updateJob(safeInt(id), body, req.user?.userId, req.ip);
    sendJson(res, 200, { success: true });
  }

  async deleteJob(req, res, id) {
    await careerService.deleteJob(safeInt(id), req.user?.userId, req.ip);
    sendJson(res, 200, { success: true });
  }

  async getApplications(req, res) {
    const params = new URLSearchParams(req.query || '');
    const data = await careerService.getApplications({
      search: params.get('search'),
      status: params.get('status'),
      jobId:  safeInt(params.get('jobId')),
      page:   safeInt(params.get('page')),
      limit:  safeInt(params.get('limit')),
    });
    sendJson(res, 200, data);
  }

  async getApplicationById(req, res, id) {
    const application = await careerService.getApplicationById(safeInt(id));
    if (!application) {
      sendJson(res, 404, { error: 'Application not found' });
      return;
    }
    sendJson(res, 200, { application });
  }

  async submitApplication(req, res) {
    const body = await readBody(req);
    const id = await careerService.submitApplication(body, req.ip);
    sendJson(res, 201, { success: true, id });
  }

  async updateApplication(req, res, id) {
    const body = await readBody(req);
    await careerService.updateApplication(safeInt(id), body, req.user?.userId, req.ip);
    sendJson(res, 200, { success: true });
  }
}
export const careerController = new CareerController();
