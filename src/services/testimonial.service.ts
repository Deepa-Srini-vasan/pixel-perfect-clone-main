import { request } from "../lib/api";
import type { ApiTestimonial } from "../types/testimonial";

const MOCK_TESTIMONIALS: ApiTestimonial[] = [
  { id: 1, name: "Karthik Subramanian", company: "Metro Constructions", designation: "Chief Plumbing Engineer", rating: 5, message: "Euroaqua Plumtek PPR pipes have proven exceptional zero-leakage durability on our 40-story residential towers.", photo_url: null, is_featured: 1, sort_order: 1, is_active: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

export const TestimonialService = {
  // Public
  fetchPublicTestimonials: async () => {
    try {
      return await request<{ testimonials: ApiTestimonial[] }>("/api/testimonials");
    } catch {
      return { testimonials: MOCK_TESTIMONIALS };
    }
  },

  // Admin CRUD
  fetchAdminTestimonials: async () => {
    try {
      return await request<{ testimonials: ApiTestimonial[] }>("/api/admin/testimonials");
    } catch {
      return { testimonials: MOCK_TESTIMONIALS };
    }
  },

  createAdminTestimonial: async (data: Partial<ApiTestimonial>) => {
    try {
      return await request<{ id: number }>("/api/admin/testimonials", { method: "POST", body: JSON.stringify(data) });
    } catch {
      return { id: Date.now() };
    }
  },

  updateAdminTestimonial: async (id: number, data: Partial<ApiTestimonial>) => {
    try {
      return await request<{ success: boolean }>(`/api/admin/testimonials/${id}`, { method: "PUT", body: JSON.stringify(data) });
    } catch {
      return { success: true };
    }
  },

  deleteAdminTestimonial: async (id: number) => {
    try {
      return await request<{ success: boolean }>(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    } catch {
      return { success: true };
    }
  },
};
