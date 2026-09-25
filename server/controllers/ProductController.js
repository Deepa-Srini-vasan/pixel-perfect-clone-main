import { productService } from '../services/ProductService.js';
import { sendJson, readBody } from '../utils/http.js';
import { safeInt } from '../utils/helpers.js';

export class ProductController {
  async getPublicProducts(req, res) {
    const params = new URLSearchParams(req.query || '');
    const data = await productService.getProducts({
      search:       params.get('search'),
      categoryId:   safeInt(params.get('categoryId')) || undefined,
      categorySlug: params.get('category'),
      featured:     params.has('featured') ? params.get('featured') === 'true' : undefined,
      brandId:      safeInt(params.get('brandId')) || undefined,
      sort:         params.get('sort'),
      page:         params.has('page') ? safeInt(params.get('page')) : undefined,
      limit:        params.has('limit') ? safeInt(params.get('limit')) : undefined,
      active:       true, // public only sees active products
    });
    sendJson(res, 200, data);
  }

  async getPublicProductBySlug(req, res, slug) {
    const product = await productService.getProductBySlug(slug);
    if (!product) {
      sendJson(res, 404, { error: 'Product not found' });
      return;
    }
    sendJson(res, 200, { product });
  }

  async getAdminProducts(req, res) {
    const params = new URLSearchParams(req.query || '');
    const data = await productService.getProducts({
      search:       params.get('search'),
      categoryId:   safeInt(params.get('categoryId')) || undefined,
      featured:     params.has('featured') ? params.get('featured') === 'true' : undefined,
      active:       params.has('active') ? params.get('active') === 'true' : undefined,
      sort:         params.get('sort'),
      page:         params.has('page') ? safeInt(params.get('page')) : undefined,
      limit:        params.has('limit') ? safeInt(params.get('limit')) : undefined,
    });
    sendJson(res, 200, data);
  }

  async createProduct(req, res) {
    const body = await readBody(req);
    const result = await productService.createProduct(body, req.user?.userId, req.ip);
    sendJson(res, 201, result);
  }

  async updateProduct(req, res, id) {
    const body = await readBody(req);
    await productService.updateProduct(safeInt(id), body, req.user?.userId, req.ip);
    sendJson(res, 200, { success: true });
  }

  async deleteProduct(req, res, id) {
    await productService.deleteProduct(safeInt(id), req.user?.userId, req.ip);
    sendJson(res, 200, { success: true });
  }
}
export const productController = new ProductController();
