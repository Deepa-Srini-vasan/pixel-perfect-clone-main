import { SettingRepository } from '../repositories/SettingRepository.js';

const settingRepo = new SettingRepository();

export class SettingService {
  async getSettings(group = null) {
    const rows = group
      ? await settingRepo.getByGroup(group)
      : await settingRepo.getAll();

    // Map into nested objects: { general: { site_name: 'value' } }
    const grouped = {};
    for (const row of rows) {
      if (!grouped[row.group_name]) {
        grouped[row.group_name] = {};
      }
      grouped[row.group_name][row.key_name] = row.value;
    }
    return { settings: grouped, raw: rows };
  }

  async updateSettings(body) {
    const entries = [];
    if (body.group && body.key && body.value !== undefined) {
      entries.push([body.group, body.key, String(body.value)]);
    } else {
      for (const [group, kv] of Object.entries(body)) {
        if (typeof kv === 'object' && kv !== null) {
          for (const [key, value] of Object.entries(kv)) {
            entries.push([group, key, String(value ?? '')]);
          }
        }
      }
    }
    for (const [group, key, value] of entries) {
      await settingRepo.set(group, key, value);
    }
    return entries.length;
  }
}
export const settingService = new SettingService();
