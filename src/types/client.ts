export interface ApiClient {
  id: number;
  name: string;
  industry: string | null;
  location: string | null;
  logo_url: string | null;
  website_url: string | null;
  is_featured: number;
  sort_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}
