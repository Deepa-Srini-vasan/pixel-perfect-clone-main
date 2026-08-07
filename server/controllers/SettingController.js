import { settingService } from '../services/SettingService.js';
import { sendJson, readBody } from '../utils/http.js';

export class SettingController {
  async getSettings(req, res, group = null) {
    const data = await settingService.getSettings(group);
    sendJson(res, 200, data);
  }

  async updateSettings(req, res) {
    const body = await readBody(req);
    const count = await settingService.updateSettings(body);
    sendJson(res, 200, { success: true, updated: count });
  }
}
export const settingController = new SettingController();
