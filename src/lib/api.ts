import type { QueryFunctionContext } from "@tanstack/react-query";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ApiProduct {
  id: number;
  slug: string;
  name: string;
  category: string;
  categoryId?: number | null;
  shortDescription: string;
  description: string;
  highlights: string[];
  specs: ProductSpec[];
  imageKey?: string | null;
  imageData?: string | null;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedProductsResponse {
  products: ApiProduct[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminUser {
  id: number;
  email: string;
  name?: string;
  role: string;
}

export interface AdminDashboardStats {
  total_products: number;
  total_categories: number;
  total_enquiries: number;
  unread_enquiries: number;
  new_enquiries: number;
  low_stock_items: number;
  total_inventory: number;
}

export interface AdminDashboardActivity {
  id: number;
  action: string;
  entity_type: string;
  entity_id: number;
  name: string;
  created_at: string;
}

export interface AdminDashboardResponse {
  stats: AdminDashboardStats;
  recentActivity: AdminDashboardActivity[];
}

const API_BASE = import.meta.env.VITE_API_URL?.trim() || (import.meta.env.DEV ? "" : "http://127.0.0.1:8787");

// No token storage needed — httpOnly cookies handle auth automatically
export const apiUrl = (path: string) => `${API_BASE}${path}`;

// Auth headers are no longer needed since httpOnly cookies are sent automatically
// This function is kept for backward compatibility with existing code
export const getAuthHeaders = () => ({});

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers ?? {});
  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(apiUrl(path), {
    ...options,
    headers,
    credentials: 'include', // Always include cookies
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error ?? "Request failed");
  }

  return payload as T;
}

export const loginAdmin = async (email: string, password: string) => {
  const response = await request<{ user: AdminUser }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  // Token is now in httpOnly cookie — no need to store it in JS
  return response;
};

export const fetchCurrentUser = async () => request<{ user: AdminUser }>("/api/auth/me", {});
export const logoutAdmin = async () => request<{ success: boolean }>("/api/auth/logout", { method: "POST" });
export const fetchAdminDashboard = async () => request<AdminDashboardResponse>("/api/admin/dashboard", {});
export const fetchProducts = async (
  search = "",
  category = "",
  page = 1,
  limit = 24,
  sort = "latest"
) => {
  const query = new URLSearchParams();
  if (search)   query.set("search",   search);
  if (category) query.set("category", category);
  if (page > 1) query.set("page",     String(page));
  if (limit !== 24) query.set("limit", String(limit));
  if (sort !== "latest") query.set("sort", sort);
  const suffix = query.toString() ? `?${query.toString()}` : "";
  return request<PaginatedProductsResponse>(`/api/products${suffix}`);
};

export const fetchProductBySlug = async (slug: string) => request<{ product: ApiProduct }>(`/api/products/${slug}`);
export const fetchCategories = async () => request<{ categories: Array<{ id?: number; name: string; count?: number }> }>("/api/categories");
export const fetchAdminProducts = async () => request<{ products: ApiProduct[] }>("/api/admin/products?limit=500", {});
export const createAdminProduct = async (payload: Partial<ApiProduct>) => request<{ product: ApiProduct }>("/api/admin/products", {
  method: "POST",
  body: JSON.stringify(payload),
});
export const updateAdminProduct = async (id: number, payload: Partial<ApiProduct>) => request<{ product: ApiProduct }>(`/api/admin/products/${id}`, {
  method: "PUT",
  body: JSON.stringify(payload),
});
export const deleteAdminProduct = async (id: number) => request<{ success: boolean }>(`/api/admin/products/${id}`, {
  method: "DELETE",
});

export const fetchAdminUsers = async () => request<{ users: AdminUser[] }>("/api/admin/users", {});
export const createAdminUser = async (payload: { email: string; name: string; password: string; role: string }) =>
  request<{ user: AdminUser }>("/api/admin/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
export const updateAdminUser = async (id: number, payload: { name: string; password?: string; role: string }) =>
  request<{ user: AdminUser }>(`/api/admin/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const fetchActivityLogs = async (limit = 50) =>
  request<{ logs: Array<{ id: number; admin_user_id: number; action: string; entity_type: string; entity_id: number; name: string; created_at: string }> }>(
    `/api/admin/activity-logs?limit=${limit}`,
    {}
  );

export const productQueryKey = (filters: { search?: string; category?: string } = {}) => ["products", filters];
export const productBySlugQueryKey = (slug: string) => ["product", slug];
export const adminProductsQueryKey = ["admin-products"];

/* ─────────────────────────────────────────────────────────────
   Enquiry submission — sends to admin panel + WhatsApp
───────────────────────────────────────────────────────────── */

const WHATSAPP_NUMBER = "6379665268"; // no + or spaces

export interface EnquiryPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

/**
 * 1. POST to /api/enquiries  → appears in admin Enquiries panel
 * 2. Open WhatsApp with a pre-filled message on the same number
 */
export const submitEnquiry = async (payload: EnquiryPayload): Promise<void> => {
  // 1 — Save to admin panel
  const res = await fetch(apiUrl("/api/enquiries"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const ct = res.headers.get("content-type") || "";
    const data = ct.includes("application/json")
      ? await res.json().catch(() => ({}))
      : { error: await res.text().catch(() => "") };
    throw new Error((data as { error?: string }).error || "Failed to submit enquiry");
  }

  // 2 — Open WhatsApp with pre-filled message (non-blocking)
  openWhatsApp(payload);
};

/** Build and open a WhatsApp deep-link with form details pre-filled. */
export const openWhatsApp = (payload: EnquiryPayload): void => {
  const lines = [
    `*New Enquiry from Plumtek Website*`,
    ``,
    `*Name:* ${payload.name}`,
    payload.phone   ? `*Phone:* ${payload.phone}`   : null,
    payload.email   ? `*Email:* ${payload.email}`   : null,
    payload.subject ? `*Subject:* ${payload.subject}` : null,
    ``,
    `*Message:*`,
    payload.message,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};
