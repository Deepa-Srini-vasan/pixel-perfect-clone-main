import { ProductRepository } from '../repositories/ProductRepository.js';
import { slugify, nowStr, safeInt } from '../utils/helpers.js';
import { executeQuery } from '../database/connection.js';

const prodRepo = new ProductRepository();

export class ProductService {
  async getProducts(params = {}) {
    const page   = safeInt(params.page, 1, 1);
    const limit  = safeInt(params.limit, 1000, 1, 10000);
    const offset = (page - 1) * limit;

    const { products, total } = await prodRepo.findFiltered({
      ...params,
      limit,
      offset
    });

    return {
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getProductBySlug(slug) {
    const product = await prodRepo.findBySlug(slug);
    if (!product) return null;

    // Load attachments
    product.images    = await prodRepo.getImages(product.id);
    product.documents = await prodRepo.getDocuments(product.id);
    product.videos    = await prodRepo.getVideos(product.id);

    return product;
  }

  async createProduct(data, adminId, ip) {
    const slug = data.slug || slugify(data.name || '');
    if (!data.name) throw new Error('Product name is required');

    const payload = {
      slug,
      name:              data.name,
      category_id:       data.categoryId || null,
      category:          data.category || null,
      brand_id:          data.brandId || null,
      sku:               data.sku || `PLM-${Date.now()}`,
      short_description: String(data.shortDescription || '').slice(0, 500),
      description:       data.description || '',
      highlights_json:   JSON.stringify(data.highlights || []),
      specs_json:        JSON.stringify(data.specs || []),
      video_url:         data.videoUrl || null,
      pdf_url:           data.pdfUrl || null,
      is_featured:       data.isFeatured ? 1 : 0,
      is_active:         data.isActive !== false ? 1 : 0,
      sort_order:        data.sortOrder || 0,
      meta_title:        data.metaTitle || null,
      meta_description:  data.metaDescription || null,
      cost_price:        data.costPrice || 0.00,
      tags:              data.tags || null,
      created_by:        adminId,
      created_at:        nowStr(),
      updated_at:        nowStr(),
    };

    const id = await prodRepo.create(payload);

    // Create inventory record
    await executeQuery(
      'INSERT INTO inventory (product_id, quantity_in_stock, reorder_level, updated_at) VALUES (?, ?, ?, NOW())',
      [id, data.stock || 0, 10]
    );

    // Link primary image if key matches
    if (data.imageKey) {
      // Find or insert media record
      const [media] = await executeQuery('SELECT id FROM media WHERE file_path = ? OR filename = ? LIMIT 1', [data.imageKey, data.imageKey]);
      let mediaId = media?.id;
      if (!mediaId) {
        const res = await executeQuery(
          'INSERT INTO media (filename, mime_type, file_size, file_path, created_at) VALUES (?, ?, ?, ?, NOW())',
          [data.imageKey, 'image/png', 0, data.imageKey]
        );
        mediaId = res.insertId;
      }
      await executeQuery(
        'INSERT INTO product_images (product_id, media_id, alt_text, is_primary, created_at) VALUES (?, ?, ?, 1, NOW())',
        [id, mediaId, data.name]
      );
    }

    return { id, slug };
  }

  async updateProduct(id, data, adminId, ip) {
    const existing = await prodRepo.find(id);
    if (!existing) return false;

    const payload = {
      name:              data.name              ?? existing.name,
      category_id:       data.categoryId        ?? existing.category_id,
      category:          data.category          ?? existing.category,
      brand_id:          data.brandId           ?? existing.brand_id,
      sku:               data.sku               ?? existing.sku,
      short_description: data.shortDescription ?? existing.short_description,
      description:       data.description       ?? existing.description,
      video_url:         data.videoUrl          ?? existing.video_url,
      pdf_url:           data.pdfUrl            ?? existing.pdf_url,
      is_featured:       data.isFeatured !== undefined ? (data.isFeatured ? 1 : 0) : existing.is_featured,
      is_active:         data.isActive !== undefined ? (data.isActive ? 1 : 0) : existing.is_active,
      sort_order:        data.sortOrder         ?? existing.sort_order,
      meta_title:        data.metaTitle         ?? existing.meta_title,
      meta_description:  data.metaDescription  ?? existing.meta_description,
      cost_price:        data.costPrice         ?? existing.cost_price,
      tags:              data.tags              ?? existing.tags,
      updated_by:        adminId,
      updated_at:        nowStr(),
    };

    if (data.highlights) payload.highlights_json = JSON.stringify(data.highlights);
    if (data.specs)      payload.specs_json      = JSON.stringify(data.specs);

    await prodRepo.update(id, payload);
    return true;
  }

  async deleteProduct(id, adminId, ip) {
    await prodRepo.softDelete(id, adminId);
    return true;
  }
}
export const productService = new ProductService();
