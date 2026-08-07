export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  url: string;
  alt_text: string | null;
  is_primary: boolean;
  sort_order: number;
}

export interface ProductDocument {
  id: number;
  product_id: number;
  title: string;
  url: string;
  file_type: string;
}

export interface ProductVideo {
  id: number;
  product_id: number;
  title: string;
  url: string;
  video_type: "youtube" | "vimeo" | "other";
}

export interface ApiProduct {
  id: number;
  slug: string;
  name: string;
  category: string;
  categoryId?: number | null;
  brandId?: number | null;
  brand?: string | null;
  sku?: string | null;
  shortDescription: string;
  description: string;
  highlights: string[];
  specs: ProductSpec[];
  imageKey?: string | null;
  imageData?: string | null;
  videoUrl?: string | null;
  pdfUrl?: string | null;
  isFeatured: boolean;
  isActive: boolean;
  tags?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  images?: ProductImage[];
  documents?: ProductDocument[];
  videos?: ProductVideo[];
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
