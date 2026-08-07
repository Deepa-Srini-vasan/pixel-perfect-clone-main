import { settingController } from '../../controllers/SettingController.js';

export const settingRoutes = [
  {
    method: 'GET',
    path: /^\/api\/v1\/admin\/settings$/,
    permission: 'settings.view',
    handler: (req, res) => settingController.getSettings(req, res)
  },
  {
    method: 'GET',
    path: /^\/api\/v1\/admin\/settings\/([^/]+)$/,
    permission: 'settings.view',
    handler: (req, res, matches) => settingController.getSettings(req, res, matches[1])
  },
  {
    method: 'PUT',
    path: /^\/api\/v1\/admin\/settings$/,
    permission: 'settings.edit',
    handler: (req, res) => settingController.updateSettings(req, res)
  }
];
