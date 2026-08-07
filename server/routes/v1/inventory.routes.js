import { inventoryController } from '../../controllers/InventoryController.js';

export const inventoryRoutes = [
  {
    method: 'GET',
    path: /^\/api\/v1\/admin\/inventory$/,
    permission: 'inventory.view',
    handler: (req, res) => inventoryController.getInventory(req, res)
  },
  {
    method: 'PUT',
    path: /^\/api\/v1\/admin\/inventory\/(\d+)$/,
    permission: 'inventory.edit',
    handler: (req, res, matches) => inventoryController.updateInventory(req, res, matches[1])
  }
];
