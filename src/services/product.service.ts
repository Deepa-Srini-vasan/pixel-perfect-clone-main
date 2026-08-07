import { request } from "../lib/api";
import type { ApiProduct, PaginatedProductsResponse } from "../types/product";
import type { ApiBrand } from "../types/category";

export interface FetchProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  categoryId?: number;
  brandId?: number;
  featured?: boolean;
  sort?: "latest" | "name-asc" | "name-desc" | "featured";
}

export interface AdminProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  categoryId?: number;
  brandId?: number;
  active?: boolean;
}

export function normalizeApiProduct(p: any): ApiProduct {
  let specs = p.specs || [];
  if (typeof p.specs_json === "string") {
    try { specs = JSON.parse(p.specs_json); } catch {}
  }
  let highlights = p.highlights || [];
  if (typeof p.highlights_json === "string") {
    try { highlights = JSON.parse(p.highlights_json); } catch {}
  }

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category_name || p.category || "General",
    categoryId: p.category_id ?? p.categoryId ?? null,
    brandId: p.brand_id ?? p.brandId ?? null,
    brand: p.brand_name || p.brand || null,
    sku: p.sku || null,
    shortDescription: p.short_description || p.shortDescription || p.name,
    description: p.description || p.short_description || p.name,
    highlights: Array.isArray(highlights) ? highlights : ["Quality-tested Plumtek product"],
    specs: Array.isArray(specs) ? specs : [],
    imageKey: p.image_key || p.imageKey || null,
    imageData: p.image_data || p.imageData || null,
    videoUrl: p.video_url || p.videoUrl || null,
    pdfUrl: p.pdf_url || p.pdfUrl || null,
    isFeatured: Boolean(p.is_featured ?? p.isFeatured),
    isActive: Boolean(p.is_active ?? p.isActive ?? true),
    createdAt: p.created_at || p.createdAt || new Date().toISOString(),
    updatedAt: p.updated_at || p.updatedAt || new Date().toISOString(),
  };
}

export const ProductService = {
  // Public
  fetchProducts: async (params: FetchProductsParams = {}): Promise<PaginatedProductsResponse> => {
    const qs = new URLSearchParams();
    if (params.page)       qs.set("page",       String(params.page));
    qs.set("limit", String(params.limit || 1000));
    if (params.search)     qs.set("search",     params.search);
    if (params.category)   qs.set("category",   params.category);
    if (params.categoryId) qs.set("categoryId", String(params.categoryId));
    if (params.brandId)    qs.set("brandId",    String(params.brandId));
    if (params.featured)   qs.set("featured",   "true");
    if (params.sort)       qs.set("sort",       params.sort);
    
    const res = await request<any>(`/api/products?${qs}`);
    const rawProducts = res.products || res.items || [];
    return {
      products: rawProducts.map(normalizeApiProduct),
      total: res.total || rawProducts.length,
      page: res.page || 1,
      limit: res.limit || 20,
      totalPages: res.totalPages || Math.ceil((res.total || rawProducts.length) / (res.limit || 20)),
    };
  },

  fetchProductBySlug: async (slug: string) => {
    const res = await request<any>(`/api/products/${encodeURIComponent(slug)}`);
    return { product: normalizeApiProduct(res.product || res) };
  },

  // Admin CRUD
  fetchAdminProducts: async (params: AdminProductsParams = {}) => {
    const qs = new URLSearchParams();
    if (params.page)       qs.set("page",       String(params.page));
    qs.set("limit", String(params.limit || 1000));
    if (params.search)     qs.set("search",     params.search);
    if (params.category)   qs.set("category",   params.category);
    if (params.categoryId) qs.set("categoryId", String(params.categoryId));
    if (params.brandId)    qs.set("brandId",    String(params.brandId));
    if (params.active !== undefined) qs.set("active", String(params.active));
    
    const res = await request<any>(`/api/admin/products?${qs}`);
    const rawProducts = res.products || res.items || [];
    return {
      products: rawProducts.map(normalizeApiProduct),
      total: res.total || rawProducts.length,
      page: res.page || 1,
      limit: res.limit || 20,
      totalPages: res.totalPages || Math.ceil((res.total || rawProducts.length) / (res.limit || 20)),
    };
  },

  createProduct: async (data: Partial<ApiProduct>) =>
    request<{ id: number; slug: string }>("/api/admin/products", { method: "POST", body: JSON.stringify(data) }),

  updateProduct: async (id: number, data: Partial<ApiProduct>) =>
    request<{ success: boolean }>(`/api/admin/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  deleteProduct: async (id: number) =>
    request<{ success: boolean }>(`/api/admin/products/${id}`, { method: "DELETE" }),

  // Brands
  fetchBrands: async () =>
    request<{ brands: ApiBrand[] }>("/api/brands"),

  fetchAdminBrands: async () =>
    request<{ brands: ApiBrand[] }>("/api/admin/brands"),

  createAdminBrand: async (data: Partial<ApiBrand>) =>
    request<{ id: number }>("/api/admin/brands", { method: "POST", body: JSON.stringify(data) }),

  updateAdminBrand: async (id: number, data: Partial<ApiBrand>) =>
    request<{ success: boolean }>(`/api/admin/brands/${id}`, { method: "PUT", body: JSON.stringify(data) }),
};
