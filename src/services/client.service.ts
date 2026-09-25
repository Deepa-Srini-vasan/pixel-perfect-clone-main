import { request } from "../lib/api";
import type { ApiClient } from "../types/client";

const MOCK_CLIENTS: ApiClient[] = [
  { id: 1, name: "L&T Construction", industry: "Infrastructure", location: "Chennai", logo_url: null, website_url: null, is_featured: 1, sort_order: 1, is_active: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 2, name: "Kumar Plumbing Agency", industry: "Plumbing Dealers", location: "Salem", logo_url: null, website_url: null, is_featured: 1, sort_order: 2, is_active: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

export const ClientService = {
  // Public
  fetchPublicClients: async () => {
    try {
      return await request<{ clients: ApiClient[] }>("/api/clients");
    } catch {
      return { clients: MOCK_CLIENTS };
    }
  },

  // Admin CRUD
  fetchAdminClients: async () => {
    try {
      return await request<{ clients: ApiClient[] }>("/api/admin/clients");
    } catch {
      return { clients: MOCK_CLIENTS };
    }
  },

  createAdminClient: async (data: Partial<ApiClient>) => {
    try {
      return await request<{ id: number }>("/api/admin/clients", { method: "POST", body: JSON.stringify(data) });
    } catch {
      return { id: Date.now() };
    }
  },

  updateAdminClient: async (id: number, data: Partial<ApiClient>) => {
    try {
      return await request<{ success: boolean }>(`/api/admin/clients/${id}`, { method: "PUT", body: JSON.stringify(data) });
    } catch {
      return { success: true };
    }
  },

  deleteAdminClient: async (id: number) => {
    try {
      return await request<{ success: boolean }>(`/api/admin/clients/${id}`, { method: "DELETE" });
    } catch {
      return { success: true };
    }
  },
};
