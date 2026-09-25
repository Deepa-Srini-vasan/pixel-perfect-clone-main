import { request } from "../lib/api";
import type { ApiCategory } from "../types/category";

export const CategoryService = {
  // Public
  fetchCategories: async () => {
    const res = await request<{ categories: ApiCategory[] }>("/api/categories");
    return {
      categories: (res.categories || []).map((c: any) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        parentId: c.parentId ?? c.parent_id ?? null,
        imageUrl: c.imageUrl ?? c.image_url ?? null,
        display_order: c.display_order ?? c.sort_order ?? 0,
        is_active: c.is_active ?? 1,
        count: c.count || c.product_count || 0,
      })),
    };
  },

  // Admin CRUD
  fetchAdminCategories: async () => {
    const res = await request<{ categories: (ApiCategory & { product_count: number })[] }>("/api/admin/categories");
    return {
      categories: (res.categories || []).map((c: any) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        parentId: c.parentId ?? c.parent_id ?? null,
        imageUrl: c.imageUrl ?? c.image_url ?? null,
        display_order: c.display_order ?? c.sort_order ?? 0,
        is_active: c.is_active ?? 1,
        count: c.count || c.product_count || 0,
        product_count: c.product_count || c.count || 0,
      })),
    };
  },

  createCategory: async (data: Partial<ApiCategory>) =>
    request<{ id: number; slug: string }>("/api/admin/categories", { method: "POST", body: JSON.stringify(data) }),

  updateCategory: async (id: number, data: Partial<ApiCategory>) =>
    request<{ success: boolean }>(`/api/admin/categories/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  deleteCategory: async (id: number) =>
    request<{ success: boolean }>(`/api/admin/categories/${id}`, { method: "DELETE" }),
};
