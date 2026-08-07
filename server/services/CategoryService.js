import { CategoryRepository } from '../repositories/CategoryRepository.js';
import { slugify, nowStr } from '../utils/helpers.js';

const catRepo = new CategoryRepository();

export class CategoryService {
  async getCategoriesTree() {
    return await catRepo.getTree();
  }

  async getAllCategories() {
    return await catRepo.allWithCount();
  }

  async createCategory(data, adminId, ip) {
    const slug = data.slug || slugify(data.name || '');
    const payload = {
      parent_id:      data.parentId || null,
      name:           data.name,
      slug,
      description:    data.description || null,
      image_media_id: data.imageMediaId || null,
      display_order:  data.displayOrder || 0,
      is_active:      1,
      created_at:     nowStr(),
      updated_at:     nowStr(),
    };
    return await catRepo.create(payload);
  }

  async updateCategory(id, data, adminId, ip) {
    const payload = {
      parent_id:      data.parentId || null,
      name:           data.name,
      slug:           data.slug || slugify(data.name),
      description:    data.description || null,
      image_media_id: data.imageMediaId || null,
      display_order:  data.displayOrder || 0,
      is_active:      data.isActive !== false ? 1 : 0,
      updated_at:     nowStr(),
    };
    return await catRepo.update(id, payload);
  }

  async deleteCategory(id, adminId, ip) {
    const pCount = await catRepo.getProductCount(id);
    if (pCount > 0) {
      throw new Error('Cannot delete category with active products');
    }
    return await catRepo.delete(id);
  }
}
export const categoryService = new CategoryService();
