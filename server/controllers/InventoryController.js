import { inventoryService } from '../services/InventoryService.js';
import { sendJson, readBody } from '../utils/http.js';
import { safeInt } from '../utils/helpers.js';

export class InventoryController {
  async getInventory(req, res) {
    const params = new URLSearchParams(req.query || '');
    const data = await inventoryService.getInventoryList({
      search:   params.get('search'),
      lowStock: params.get('lowStock') === 'true',
      page:     safeInt(params.get('page')),
      limit:    safeInt(params.get('limit')),
    });
    sendJson(res, 200, data);
  }

  async updateInventory(req, res, productId) {
    const body = await readBody(req);
    await inventoryService.updateInventory(safeInt(productId), body, req.user?.userId, req.ip);
    sendJson(res, 200, { success: true });
  }
}
export const inventoryController = new InventoryController();
