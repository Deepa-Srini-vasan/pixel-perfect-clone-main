export const JOB_TYPES = ["full-time", "part-time", "contract", "internship"] as const;
export type JobType = typeof JOB_TYPES[number];

export interface JobListing {
  id: number;
  title: string;
  department: string;
  location: string;
  type: JobType;
  description: string;
  requirements: string;
  is_active: boolean;
  created_at: string;
}

export interface Application {
  id: number;
  job_id?: number | null;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  cover_letter: string;
  status: "new" | "reviewing" | "shortlisted" | "rejected" | "hired";
  created_at: string;
}

export interface ApiCareerJob {
  id: number;
  title: string;
  department: string;
  location: string;
  type: JobType;
  description: string;
  requirements: string | null;
  is_active: number;
  expires_at: string | null;
  application_count?: number;
  created_at: string;
  updated_at: string;
}

export interface ApiCareerApplication {
  id: number;
  job_id: number | null;
  job_title?: string | null;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string | null;
  cover_letter: string;
  resume_url: string | null;
  status: "new" | "reviewing" | "shortlisted" | "rejected" | "hired";
  is_read: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}
