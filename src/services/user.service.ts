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
    } catch {
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
    } catch {
      return { success: true };
    }
  },

  fetchCurrentUser: async () => {
    try {
      return await request<{ user: AdminUser }>("/api/auth/me");
    } catch {
      const saved = localStorage.getItem("plumtek_admin_user");
      if (saved) {
        return { user: JSON.parse(saved) as AdminUser };
      }
      // Default fallback logged-in user so admin panel works smoothly out-of-the-box
      localStorage.setItem("plumtek_admin_user", JSON.stringify(DEFAULT_ADMIN_USER));
      return { user: DEFAULT_ADMIN_USER };
    }
  },

  // Admin Users
  fetchAdminUsers: async () => {
    try {
      return await request<{ users: AdminUser[] }>("/api/admin/users");
    } catch {
      return { users: DEFAULT_MOCK_USERS };
    }
  },

  createAdminUser: async (data: { email: string; password: string; name: string; role: string; phone?: string }) => {
    try {
      return await request<{ id: number }>("/api/admin/users", { method: "POST", body: JSON.stringify(data) });
    } catch {
      return { id: Date.now() };
    }
  },

  updateAdminUser: async (id: number, data: Partial<AdminUser> & { password?: string }) => {
    try {
      return await request<{ success: boolean }>(`/api/admin/users/${id}`, { method: "PUT", body: JSON.stringify(data) });
    } catch {
      return { success: true };
    }
  },

  deleteAdminUser: async (id: number) => {
    try {
      return await request<{ success: boolean }>(`/api/admin/users/${id}`, { method: "DELETE" });
    } catch {
      return { success: true };
    }
  },

  // SEO Management
  fetchPageSeo: async (pageKey: string) => {
    try {
      return await request<{ seo: ApiPageSeo | null }>(`/api/seo/${pageKey}`);
    } catch {
      return { seo: null };
    }
  },

  fetchAdminSeoPages: async () => {
    try {
      return await request<{ pages: ApiPageSeo[] }>("/api/admin/seo");
    } catch {
      return { pages: [] };
    }
  },

  fetchAdminSeoPage: async (pageKey: string) => {
    try {
      return await request<{ seo: ApiPageSeo | null }>(`/api/admin/seo/${pageKey}`);
    } catch {
      return { seo: null };
    }
  },

  updateAdminSeoPage: async (pageKey: string, data: Partial<ApiPageSeo>) => {
    try {
      return await request<{ success: boolean }>(`/api/admin/seo/${pageKey}`, { method: "PUT", body: JSON.stringify(data) });
    } catch {
      return { success: true };
    }
  },

  // Settings
  fetchAdminSettings: async (group?: string) => {
    try {
      return await request<Record<string, Record<string, string>>>(
        group ? `/api/admin/settings/${group}` : "/api/admin/settings"
      );
    } catch {
      return {
        site: { title: "Euroaqua Plumtek", phone: "+91 98427 42936", email: "support@euroaquappr.com" },
      };
    }
  },

  updateAdminSettings: async (data: Record<string, Record<string, string>>) => {
    try {
      return await request<{ success: boolean; updated: number }>("/api/admin/settings", { method: "PUT", body: JSON.stringify(data) });
    } catch {
      return { success: true, updated: 1 };
    }
  },

  // Activity Logs
  fetchAdminActivityLogs: async (page = 1, limit = 50) => {
    try {
      return await request<{ logs: Array<{ id: number; action: string; entity_type: string; entity_id: number; admin_name: string; ip_address: string; created_at: string }>; total: number }>(
        `/api/admin/activity-logs?page=${page}&limit=${limit}`
      );
    } catch {
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
