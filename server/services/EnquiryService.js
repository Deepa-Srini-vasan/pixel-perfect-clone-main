import { EnquiryRepository } from '../repositories/EnquiryRepository.js';
import { nowStr, safeInt } from '../utils/helpers.js';

const enqRepo = new EnquiryRepository();

export class EnquiryService {
  async getEnquiries(params = {}) {
    const page   = safeInt(params.page, 1, 1);
    const limit  = safeInt(params.limit, 25, 1, 100);
    const offset = (page - 1) * limit;

    const { enquiries, total } = await enqRepo.getFiltered({
      ...params,
      limit,
      offset
    });

    return {
      enquiries,
      total,
      page,
      limit
    };
  }

  async getEnquiryById(id) {
    const enquiry = await enqRepo.find(id);
    if (!enquiry) return null;

    // Load replies
    const replies = await enqRepo.getReplies(id);
    return { enquiry, replies };
  }

  async submitEnquiry(data, ip, userAgent) {
    const payload = {
      type:         data.type || 'general',
      name:         data.name,
      email:        data.email,
      phone:        data.phone || null,
      company:      data.company || null,
      city:         data.city || null,
      state:        data.state || null,
      product_id:   data.productId || null,
      product_name: data.productName || null,
      subject:      data.subject || null,
      message:      data.message,
      status:       'new',
      is_read:      0,
      source_page:  data.sourcePage || null,
      ip_address:   ip,
      user_agent:   userAgent || null,
      created_at:   nowStr(),
      updated_at:   nowStr(),
    };
    return await enqRepo.create(payload);
  }

  async updateEnquiry(id, data, adminId, ip) {
    const payload = {
      status:      data.status,
      is_read:     data.is_read !== undefined ? (data.is_read ? 1 : 0) : undefined,
      notes:       data.notes,
      assigned_to: data.assigned_to || null,
      updated_at:  nowStr(),
    };
    // Clean undefined keys
    Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

    return await enqRepo.update(id, payload);
  }

  async replyToEnquiry(enquiryId, adminId, message, ip) {
    await enqRepo.createReply(enquiryId, adminId, message);
    await enqRepo.update(enquiryId, {
      status:     'contacted',
      replied_at: nowStr(),
      updated_at: nowStr(),
    });
    return true;
  }

  async deleteEnquiry(id, adminId, ip) {
    return await enqRepo.delete(id);
  }
}
export const enquiryService = new EnquiryService();
