import { TestimonialRepository } from '../repositories/TestimonialRepository.js';
import { nowStr, safeInt } from '../utils/helpers.js';

const testRepo = new TestimonialRepository();

export class TestimonialService {
  async getPublicTestimonials() {
    return await testRepo.getActive();
  }

  async getAdminTestimonials() {
    return await testRepo.allWithPhoto();
  }

  async createTestimonial(data, adminId, ip) {
    const payload = {
      name:            data.name,
      company:         data.company || null,
      designation:     data.designation || null,
      industry:        data.industry || null,
      rating:          safeInt(data.rating, 5, 1, 5),
      message:         data.message,
      photo_media_id:  data.photoMediaId || null,
      is_featured:     data.isFeatured ? 1 : 0,
      sort_order:      data.sortOrder || 0,
      is_active:       1,
      created_at:      nowStr(),
      updated_at:      nowStr(),
    };
    return await testRepo.create(payload);
  }

  async updateTestimonial(id, data, adminId, ip) {
    const payload = {
      name:            data.name,
      company:         data.company,
      designation:     data.designation,
      industry:        data.industry,
      rating:          data.rating !== undefined ? safeInt(data.rating, 5, 1, 5) : undefined,
      message:         data.message,
      photo_media_id:  data.photoMediaId,
      is_featured:     data.isFeatured !== undefined ? (data.isFeatured ? 1 : 0) : undefined,
      sort_order:      data.sortOrder !== undefined ? data.sortOrder : undefined,
      is_active:       data.isActive !== undefined ? (data.isActive ? 1 : 0) : undefined,
      updated_at:      nowStr(),
    };
    // Clean undefined keys
    Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

    return await testRepo.update(id, payload);
  }

  async deleteTestimonial(id, adminId, ip) {
    return await testRepo.update(id, { is_active: 0, updated_at: nowStr() });
  }
}
export const testimonialService = new TestimonialService();
