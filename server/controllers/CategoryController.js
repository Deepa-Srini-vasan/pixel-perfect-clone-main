import { categoryService } from '../services/CategoryService.js';
import { sendJson, readBody } from '../utils/http.js';
import { safeInt } from '../utils/helpers.js';

export class CategoryController {
  async getPublicCategories(req, res) {
    const categories = await categoryService.getCategoriesTree();
    sendJson(res, 200, { categories });
  }

  async getAdminCategories(req, res) {
    const categories = await categoryService.getAllCategories();
    sendJson(res, 200, { categories });
  }

  async createCategory(req, res) {
    const body = await readBody(req);
    const id = await categoryService.createCategory(body, req.user?.userId, req.ip);
    sendJson(res, 201, { id });
  }

  async updateCategory(req, res, id) {
    const body = await readBody(req);
    await categoryService.updateCategory(safeInt(id), body, req.user?.userId, req.ip);
    sendJson(res, 200, { success: true });
  }

  async deleteCategory(req, res, id) {
    try {
      await categoryService.deleteCategory(safeInt(id), req.user?.userId, req.ip);
      sendJson(res, 200, { success: true });
    } catch (err) {
      sendJson(res, 400, { error: err.message });
    }
  }
}
export const categoryController = new CategoryController();
