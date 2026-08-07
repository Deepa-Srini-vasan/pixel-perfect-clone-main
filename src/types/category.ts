export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  imageUrl: string | null;
  display_order: number;
  is_active: number;
  count: number;
}

export interface ApiBrand {
  id: number;
  name: string;
  slug: string;
  logo_url: string | null;
  description: string | null;
  is_active: number;
}

export interface ApiPageSeo {
  id: number;
  page_key: string;
  title: string | null;
  meta_description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  canonical_url: string | null;
  robots: string;
}
