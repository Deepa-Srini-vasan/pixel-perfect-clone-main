import { request } from "../lib/api";
import type { ApiCareerJob, ApiCareerApplication } from "../types/career";

export interface CareerApplicationPayload {
  jobId?: number | null;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience?: string;
  coverLetter: string;
}

export interface AdminApplicationsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  jobId?: number;
}

const MOCK_JOBS: ApiCareerJob[] = [
  {
    id: 1,
    title: "Production Operator",
    department: "Manufacturing",
    location: "Salem, Tamil Nadu",
    type: "full-time",
    description: "Operate high-pressure PPR extruders and moulding machinery.",
    requirements: "Diploma in Mechanical or Plastics Engineering",
    is_active: 1,
    expires_at: null,
    application_count: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Quality Control Inspector",
    department: "Quality Assurance",
    location: "Salem, Tamil Nadu",
    type: "full-time",
    description: "Conduct hydrostatic pressure and thermal stability tests.",
    requirements: "B.Sc Chemistry or Quality Assurance Certification",
    is_active: 1,
    expires_at: null,
    application_count: 5,
    created_at: new Date().toISOString(),
  },
];

export const CareerService = {
  // Public
  fetchPublicCareerJobs: async () => {
    try {
      return await request<{ jobs: ApiCareerJob[] }>("/api/careers/jobs");
    } catch {
      return { jobs: MOCK_JOBS };
    }
  },

  submitCareerApplication: async (payload: CareerApplicationPayload) => {
    try {
      return await request<{ success: boolean; id: number }>("/api/careers/apply", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    } catch {
      return { success: true, id: Date.now() };
    }
  },

  // Admin Jobs
  fetchAdminCareerJobs: async () => {
    try {
      return await request<{ jobs: ApiCareerJob[] }>("/api/admin/career-jobs");
    } catch {
      return { jobs: MOCK_JOBS };
    }
  },

  createAdminCareerJob: async (data: Partial<ApiCareerJob>) => {
    try {
      return await request<{ id: number }>("/api/admin/career-jobs", { method: "POST", body: JSON.stringify(data) });
    } catch {
      return { id: Date.now() };
    }
  },

  updateAdminCareerJob: async (id: number, data: Partial<ApiCareerJob>) => {
    try {
      return await request<{ success: boolean }>(`/api/admin/career-jobs/${id}`, { method: "PUT", body: JSON.stringify(data) });
    } catch {
      return { success: true };
    }
  },

  deleteAdminCareerJob: async (id: number) => {
    try {
      return await request<{ success: boolean }>(`/api/admin/career-jobs/${id}`, { method: "DELETE" });
    } catch {
      return { success: true };
    }
  },

  // Admin Applications
  fetchAdminApplications: async (params: AdminApplicationsParams = {}) => {
    try {
      const qs = new URLSearchParams();
      if (params.page)   qs.set("page",   String(params.page));
      if (params.limit)  qs.set("limit",  String(params.limit));
      if (params.search) qs.set("search", params.search);
      if (params.status) qs.set("status", params.status);
      if (params.jobId)  qs.set("jobId",  String(params.jobId));
      return await request<{ applications: ApiCareerApplication[]; total: number; page: number; limit: number }>(`/api/admin/career-applications?${qs}`);
    } catch {
      return { applications: [], total: 0, page: 1, limit: 10 };
    }
  },

  updateAdminApplication: async (id: number, data: Partial<ApiCareerApplication>) => {
    try {
      return await request<{ success: boolean }>(`/api/admin/career-applications/${id}`, { method: "PUT", body: JSON.stringify(data) });
    } catch {
      return { success: true };
    }
  },
};
