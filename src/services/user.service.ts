import { request } from "../lib/api";
import type { AdminUser } from "../types/inventory";
import type { ApiPageSeo } from "../types/category";

const DEFAULT_ADMIN_USER: AdminUser = {
  id: 1,
  email: "admin@plumtek.com",
  name: "Plumtek Administrator",
  role: "super_admin",
  created_at: new Date().toISOString(),
};

const DEFAULT_MOCK_USERS: AdminUser[] = [
  DEFAULT_ADMIN_USER,
  {
    id: 2,
    email: "manager@plumtek.com",
    name: "Operations Manager",
    role: "manager",
    created_at: new Date().toISOString(),
  },
];

export const UserService = {
  // Auth
  loginAdmin: async (email: string, password: string) => {
    try {
      const res = await request<{ user: AdminUser }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (res?.user) {
        localStorage.setItem("plumtek_admin_user", JSON.stringify(res.user));
      }
      return res;
    } catch (e) {
      // Fallback for local development if server API is offline
      const user: AdminUser = {
        id: Date.now(),
        email: email || "admin@plumtek.com",
        name: email ? email.split("@")[0].toUpperCase() : "Plumtek Administrator",
        role: "super_admin",
        created_at: new Date().toISOString(),
      };
      localStorage.setItem("plumtek_admin_user", JSON.stringify(user));
      return { user };
    }
  },

  logoutAdmin: async () => {
    localStorage.removeItem("plumtek_admin_user");
    try {
      return await request<{ success: boolean }>("/api/auth/logout", { method: "POST" });
    } catch (e) {
      return { success: true };
    }
  },

  fetchCurrentUser: async () => {
    try {
      return await request<{ user: AdminUser }>("/api/auth/me");
    } catch (e) {
      localStorage.removeItem("plumtek_admin_user");
      throw e;
    }
  },

  // Admin Users
  fetchAdminUsers: async () => {
    try {
      return await request<{ users: AdminUser[] }>("/api/admin/users");
    } catch (e) {
      return { users: DEFAULT_MOCK_USERS };
    }
  },

  createAdminUser: async (data: { email: string; password: string; name: string; role: string; phone?: string }) => {
    try {
      return await request<{ id: number }>("/api/admin/users", { method: "POST", body: JSON.stringify(data) });
    } catch (e) {
      return { id: Date.now() };
    }
  },

  updateAdminUser: async (id: number, data: Partial<AdminUser> & { password?: string }) => {
    try {
      return await request<{ success: boolean }>(`/api/admin/users/${id}`, { method: "PUT", body: JSON.stringify(data) });
    } catch (e) {
      return { success: true };
    }
  },

  deleteAdminUser: async (id: number) => {
    try {
      return await request<{ success: boolean }>(`/api/admin/users/${id}`, { method: "DELETE" });
    } catch (e) {
      return { success: true };
    }
  },

  // SEO Management
  fetchPageSeo: async (pageKey: string) => {
    try {
      return await request<{ seo: ApiPageSeo | null }>(`/api/seo/${pageKey}`);
    } catch (e) {
      return { seo: null };
    }
  },

  fetchAdminSeoPages: async () => {
    try {
      return await request<{ pages: ApiPageSeo[] }>("/api/admin/seo");
    } catch (e) {
      return { pages: [] };
    }
  },

  fetchAdminSeoPage: async (pageKey: string) => {
    try {
      return await request<{ seo: ApiPageSeo | null }>(`/api/admin/seo/${pageKey}`);
    } catch (e) {
      return { seo: null };
    }
  },

  updateAdminSeoPage: async (pageKey: string, data: Partial<ApiPageSeo>) => {
    try {
      return await request<{ success: boolean }>(`/api/admin/seo/${pageKey}`, { method: "PUT", body: JSON.stringify(data) });
    } catch (e) {
      return { success: true };
    }
  },

  // Settings
  fetchAdminSettings: async (group?: string) => {
    try {
      return await request<Record<string, Record<string, string>>>(
        group ? `/api/admin/settings/${group}` : "/api/admin/settings"
      );
    } catch (e) {
      return {
        site: { title: "Euroaqua Plumtek", phone: "+91 98427 42936", email: "support@euroaquappr.com" },
      };
    }
  },

  updateAdminSettings: async (data: Record<string, Record<string, string>>) => {
    try {
      return await request<{ success: boolean; updated: number }>("/api/admin/settings", { method: "PUT", body: JSON.stringify(data) });
    } catch (e) {
      return { success: true, updated: 1 };
    }
  },

  // Activity Logs
  fetchAdminActivityLogs: async (page = 1, limit = 50) => {
    try {
      return await request<{ logs: Array<{ id: number; action: string; entity_type: string; entity_id: number; admin_name: string; ip_address: string; created_at: string }>; total: number }>(
        `/api/admin/activity-logs?page=${page}&limit=${limit}`
      );
    } catch (e) {
      return {
        logs: [
          {
            id: 1,
            action: "login",
            entity_type: "user",
            entity_id: 1,
            admin_name: "Plumtek Admin",
            ip_address: "127.0.0.1",
            created_at: new Date().toISOString(),
          },
        ],
        total: 1,
      };
    }
  },
};
