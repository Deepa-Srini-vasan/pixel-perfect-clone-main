import { enquiryService } from '../services/EnquiryService.js';
import { sendJson, readBody } from '../utils/http.js';
import { safeInt } from '../utils/helpers.js';

export class EnquiryController {
  async getEnquiries(req, res) {
    const params = new URLSearchParams(req.query || '');
    const data = await enquiryService.getEnquiries({
      search: params.get('search'),
      type:   params.get('type'),
      status: params.get('status'),
      unread: params.has('unread') ? params.get('unread') === 'true' : undefined,
      page:   safeInt(params.get('page')),
      limit:  safeInt(params.get('limit')),
    });
    sendJson(res, 200, data);
  }

  async getEnquiryById(req, res, id) {
    const data = await enquiryService.getEnquiryById(safeInt(id));
    if (!data) {
      sendJson(res, 404, { error: 'Enquiry not found' });
      return;
    }
    // Automatically mark read on fetch
    if (!data.enquiry.is_read) {
      await enquiryService.updateEnquiry(safeInt(id), { is_read: true }, req.user?.userId, req.ip);
      data.enquiry.is_read = 1;
    }
    sendJson(res, 200, data);
  }

  async submitEnquiry(req, res) {
    const body = await readBody(req);
    const userAgent = req.headers['user-agent'];
    const id = await enquiryService.submitEnquiry(body, req.ip, userAgent);
    sendJson(res, 201, { success: true, id });
  }

  async updateEnquiry(req, res, id) {
    const body = await readBody(req);
    await enquiryService.updateEnquiry(safeInt(id), body, req.user?.userId, req.ip);
    sendJson(res, 200, { success: true });
  }

  async replyToEnquiry(req, res, id) {
    const body = await readBody(req);
    if (!body.message) {
      sendJson(res, 400, { error: 'message is required' });
      return;
    }
    await enquiryService.replyToEnquiry(safeInt(id), req.user?.userId, body.message, req.ip);
    sendJson(res, 201, { success: true });
  }

  async deleteEnquiry(req, res, id) {
    await enquiryService.deleteEnquiry(safeInt(id), req.user?.userId, req.ip);
    sendJson(res, 200, { success: true });
  }
}
export const enquiryController = new EnquiryController();
