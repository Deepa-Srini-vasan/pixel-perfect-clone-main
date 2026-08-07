import { InventoryRepository } from '../repositories/InventoryRepository.js';
import { nowStr, safeInt } from '../utils/helpers.js';

const invRepo = new InventoryRepository();

export class InventoryService {
  async getInventoryList(params = {}) {
    const page   = safeInt(params.page, 1, 1);
    const limit  = safeInt(params.limit, 50, 1, 200);
    const offset = (page - 1) * limit;

    const { items, total } = await invRepo.getFiltered({
      ...params,
      limit,
      offset
    });

    return {
      items,
      total,
      page,
      limit
    };
  }

  async updateInventory(productId, data, adminId, ip) {
    const existing = await invRepo.findByProductId(productId);
    if (!existing) return false;

    const payload = {
      quantity_in_stock: safeInt(data.qty ?? data.quantity_in_stock, existing.quantity_in_stock, 0),
      reorder_level:     safeInt(data.reorderLevel ?? data.reorder_level, existing.reorder_level, 0),
      reorder_qty:       safeInt(data.reorderQty ?? data.reorder_qty, existing.reorder_qty, 0),
      updated_at:        nowStr(),
    };

    if (data.restocked) {
      payload.last_restocked = nowStr();
    }

    return await invRepo.updateByProductId(productId, payload);
  }
}
export const inventoryService = new InventoryService();
