export interface ApiTestimonial {
  id: number;
  name: string;
  company: string | null;
  designation: string | null;
  rating: number;
  message: string;
  photo_url: string | null;
  is_featured: number;
  sort_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}
