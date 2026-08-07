import { dashboardController } from '../../controllers/DashboardController.js';

export const dashboardRoutes = [
  {
    method: 'GET',
    path: /^\/api\/v1\/admin\/dashboard$/,
    permission: 'dashboard.view',
    handler: (req, res) => dashboardController.getStats(req, res)
  }
];
