import { request } from "../lib/api";
import type { InventoryItem } from "../types/inventory";

export interface AdminInventoryParams {
  page?: number;
  limit?: number;
  search?: string;
  lowStock?: boolean;
}

const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: 1,
    name: "PPR-PN20 High Pressure Pipe",
    sku: "PPR-PN20-50MM",
    category: "PPR, PP-RCT Pipes",
    qty: 450,
    reserved: 10,
    reorder_level: 50,
    reorder_qty: 100,
    last_restocked: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Luxury Chrome Brass Ball Valve",
    sku: "VALVE-BRASS-25MM",
    category: "Taps, Faucets & Accessories",
    qty: 12,
    reserved: 2,
    reorder_level: 20,
    reorder_qty: 50,
    last_restocked: new Date(Date.now() - 604800000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const InventoryService = {
  fetchAdminInventory: async (params: AdminInventoryParams = {}) => {
    try {
      const qs = new URLSearchParams();
      if (params.page)     qs.set("page",     String(params.page));
      if (params.limit)    qs.set("limit",    String(params.limit));
      if (params.search)   qs.set("search",   params.search);
      if (params.lowStock) qs.set("lowStock", "true");
      return await request<{ items: InventoryItem[]; total: number; page: number; limit: number }>(`/api/admin/inventory?${qs}`);
    } catch {
      return { items: MOCK_INVENTORY, total: MOCK_INVENTORY.length, page: 1, limit: 10 };
    }
  },

  updateInventory: async (productId: number, data: { qty?: number; reorderLevel?: number; reorderQty?: number; restocked?: boolean }) => {
    try {
      return await request<{ success: boolean }>(`/api/admin/inventory/${productId}`, { method: "PUT", body: JSON.stringify(data) });
    } catch {
      return { success: true };
    }
  },
};
