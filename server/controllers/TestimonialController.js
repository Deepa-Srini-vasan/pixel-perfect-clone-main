import { testimonialService } from '../services/TestimonialService.js';
import { sendJson, readBody } from '../utils/http.js';
import { safeInt } from '../utils/helpers.js';

export class TestimonialController {
  async getPublicTestimonials(req, res) {
    const testimonials = await testimonialService.getPublicTestimonials();
    sendJson(res, 200, { testimonials });
  }

  async getAdminTestimonials(req, res) {
    const testimonials = await testimonialService.getAdminTestimonials();
    sendJson(res, 200, { testimonials });
  }

  async createTestimonial(req, res) {
    const body = await readBody(req);
    const id = await testimonialService.createTestimonial(body, req.user?.userId, req.ip);
    sendJson(res, 201, { id });
  }

  async updateTestimonial(req, res, id) {
    const body = await readBody(req);
    await testimonialService.updateTestimonial(safeInt(id), body, req.user?.userId, req.ip);
    sendJson(res, 200, { success: true });
  }

  async deleteTestimonial(req, res, id) {
    await testimonialService.deleteTestimonial(safeInt(id), req.user?.userId, req.ip);
    sendJson(res, 200, { success: true });
  }
}
export const testimonialController = new TestimonialController();
