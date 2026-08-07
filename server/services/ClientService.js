import { ClientRepository } from '../repositories/ClientRepository.js';
import { nowStr } from '../utils/helpers.js';

const clientRepo = new ClientRepository();

export class ClientService {
  async getPublicClients() {
    return await clientRepo.getActive();
  }

  async getAdminClients() {
    return await clientRepo.allWithLogo();
  }

  async createClient(data, adminId, ip) {
    const payload = {
      name:          data.name,
      industry:      data.industry || null,
      location:      data.location || null,
      logo_media_id: data.logoMediaId || null,
      website_url:   data.websiteUrl || null,
      description:   data.description || null,
      is_featured:   data.isFeatured ? 1 : 0,
      sort_order:    data.sortOrder || 0,
      is_active:     1,
      created_at:    nowStr(),
      updated_at:    nowStr(),
    };
    return await clientRepo.create(payload);
  }

  async updateClient(id, data, adminId, ip) {
    const payload = {
      name:          data.name,
      industry:      data.industry || null,
      location:      data.location || null,
      logo_media_id: data.logoMediaId || null,
      website_url:   data.websiteUrl || null,
      description:   data.description || null,
      is_featured:   data.isFeatured !== undefined ? (data.isFeatured ? 1 : 0) : undefined,
      sort_order:    data.sortOrder !== undefined ? data.sortOrder : undefined,
      is_active:     data.isActive !== undefined ? (data.isActive ? 1 : 0) : undefined,
      updated_at:    nowStr(),
    };
    // Clean undefined keys
    Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

    return await clientRepo.update(id, payload);
  }

  async deleteClient(id, adminId, ip) {
    return await clientRepo.update(id, { is_active: 0, updated_at: nowStr() });
  }
}
export const clientService = new ClientService();
