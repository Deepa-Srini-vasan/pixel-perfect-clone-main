export interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  category: string;
  qty: number;
  reserved: number;
  reorder_level: number;
  reorder_qty: number;
  last_restocked: string | null;
  updated_at: string;
}

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: string;
  phone?: string | null;
  avatar_url?: string | null;
  is_active?: number;
  last_login_at?: string | null;
  created_at?: string;
}

export interface AdminDashboardStats {
  products: number;
  categories: number;
  enquiries: number;
  unread_enquiries: number;
  new_enquiries: number;
  new_applications: number;
  clients: number;
  testimonials: number;
  low_stock: number;
  total_stock: number;
}

export interface AdminDashboardResponse {
  stats: AdminDashboardStats;
  recentEnquiries: Array<{ id: number; type: string; name: string; email: string; subject: string; status: string; created_at: string }>;
  recentActivity: Array<{ id: number; action: string; entity_type: string; entity_id: number; created_at: string; admin_name: string }>;
  lowStockItems: Array<{ id: number; name: string; sku: string; quantity_in_stock: number; reorder_level: number }>;
}
