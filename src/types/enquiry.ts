export interface ApiEnquiry {
  id: number;
  type: "product" | "dealer" | "general" | "contact" | "career";
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  city: string | null;
  state: string | null;
  product_id: number | null;
  product_name: string | null;
  subject: string | null;
  message: string;
  status: "new" | "contacted" | "qualified" | "closed";
  is_read: number;
  assigned_to: number | null;
  source_page: string | null;
  notes: string | null;
  replied_at: string | null;
  created_at: string;
  updated_at: string;
}
