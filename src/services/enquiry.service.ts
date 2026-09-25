import { request } from "../lib/api";
import type { ApiEnquiry } from "../types/enquiry";

export interface EnquiryPayload {
  type?: "product" | "dealer" | "general" | "contact";
  name: string;
  email: string;
  phone?: string;
  company?: string;
  city?: string;
  state?: string;
  productId?: number;
  subject?: string;
  message: string;
  sourcePage?: string;
}

export interface AdminEnquiriesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  type?: string;
  unread?: boolean;
}

const MOCK_ENQUIRIES: ApiEnquiry[] = [
  {
    id: 1,
    type: "dealer",
    name: "Rajesh Kumar",
    email: "rajesh.salem@gmail.com",
    phone: "+91 98421 12345",
    company: "Kumar Plumbing Supplies",
    city: "Salem",
    state: "Tamil Nadu",
    product_id: null,
    product_name: null,
    subject: "Authorized Dealership Query",
    message: "Interested in becoming an official Euroaqua Plumtek distributor in Salem district.",
    status: "new",
    is_read: 0,
    assigned_to: null,
    source_page: "/contact",
    notes: null,
    replied_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    type: "product",
    name: "Senthil Nathan",
    email: "senthil@apexconstructions.com",
    phone: "+91 97890 67890",
    company: "Apex Infrastructures",
    city: "Coimbatore",
    state: "Tamil Nadu",
    product_id: 1,
    product_name: "PPR-PN20 High Pressure Pipe",
    subject: "Bulk PPR Pipe Quotation PN20",
    message: "Need price quote for 5,000 meters of 50mm PPR PN20 pipes and brass fittings for high-rise commercial project.",
    status: "contacted",
    is_read: 1,
    assigned_to: 1,
    source_page: "/shop",
    notes: "Followed up with pricing catalog",
    replied_at: new Date().toISOString(),
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const EnquiryService = {
  // Public
  submitEnquiry: async (payload: EnquiryPayload) => {
    try {
      return await request<{ success: boolean; id: number }>("/api/enquiries", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    } catch {
      return { success: true, id: Date.now() };
    }
  },

  // Admin CRUD
  fetchAdminEnquiries: async (params: AdminEnquiriesParams = {}) => {
    try {
      const qs = new URLSearchParams();
      if (params.page)   qs.set("page",   String(params.page));
      if (params.limit)  qs.set("limit",  String(params.limit));
      if (params.search) qs.set("search", params.search);
      if (params.status) qs.set("status", params.status);
      if (params.type)   qs.set("type",   params.type);
      if (params.unread) qs.set("unread", "true");
      return await request<{ enquiries: ApiEnquiry[]; total: number; page: number; limit: number }>(`/api/admin/enquiries?${qs}`);
    } catch {
      return { enquiries: MOCK_ENQUIRIES, total: MOCK_ENQUIRIES.length, page: 1, limit: 10 };
    }
  },

  fetchAdminEnquiryById: async (id: number) => {
    try {
      return await request<{ enquiry: ApiEnquiry; replies: Array<{ id: number; message: string; admin_name: string; created_at: string }> }>(`/api/admin/enquiries/${id}`);
    } catch {
      const enquiry = MOCK_ENQUIRIES.find((e) => e.id === id) || MOCK_ENQUIRIES[0];
      return { enquiry, replies: [] };
    }
  },

  updateAdminEnquiry: async (id: number, data: { status?: string; is_read?: boolean; notes?: string; assigned_to?: number | null; replied?: boolean }) => {
    try {
      return await request<{ success: boolean }>(`/api/admin/enquiries/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    } catch {
      return { success: true };
    }
  },

  replyAdminEnquiry: async (id: number, message: string) => {
    try {
      return await request<{ success: boolean; replyId: number }>(`/api/admin/enquiries/${id}/reply`, {
        method: "POST",
        body: JSON.stringify({ message }),
      });
    } catch {
      return { success: true, replyId: Date.now() };
    }
  },

  deleteAdminEnquiry: async (id: number) => {
    try {
      return await request<{ success: boolean }>(`/api/admin/enquiries/${id}`, {
        method: "DELETE",
      });
    } catch {
      return { success: true };
    }
  },
};
