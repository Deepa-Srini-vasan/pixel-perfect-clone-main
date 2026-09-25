import { UserRepository } from '../repositories/UserRepository.js';
import { verifyPassword, hashPassword, signToken } from '../utils/crypto.js';
import { nowStr } from '../utils/helpers.js';

const userRepo = new UserRepository();

export class UserService {
  async authenticate(email, password, ip) {
    const user = await userRepo.findByEmail(email);
    if (!user || !verifyPassword(password, user.password_hash)) {
      return null;
    }

    const token = signToken({ userId: user.id, email: user.email, role: user.role });
    await userRepo.update(user.id, { last_login_at: nowStr() });
    await userRepo.logActivity(user.id, 'login', 'admin_user', user.id, null, null, ip);

    return {
      token,
      user: { id: user.id, email: user.email, role: user.role, name: user.name }
    };
  }

  async getCurrentUser(id) {
    return await userRepo.find(id);
  }

  async getAllUsers() {
    return await userRepo.all();
  }

  async createUser(data, adminId, ip) {
    const payload = {
      email:         String(data.email).toLowerCase().trim(),
      password_hash: hashPassword(data.password),
      name:          data.name,
      role:          data.role || 'staff',
      phone:         data.phone || null,
      is_active:     1,
      created_at:    nowStr(),
      updated_at:    nowStr(),
    };
    const id = await userRepo.create(payload);
    await userRepo.logActivity(adminId, 'create', 'admin_user', id, null, { email: payload.email, role: payload.role }, ip);
    return id;
  }

  async updateUser(id, data, adminId, ip) {
    const payload = {
      name:       data.name,
      role:       data.role,
      phone:      data.phone || null,
      is_active:  data.isActive !== false ? 1 : 0,
      updated_at: nowStr(),
    };
    if (data.password) {
      payload.password_hash = hashPassword(data.password);
    }
    await userRepo.update(id, payload);
    await userRepo.logActivity(adminId, 'update', 'admin_user', id, null, { role: payload.role }, ip);
    return true;
  }

  async deleteUser(id, adminId, ip) {
    await userRepo.update(id, { is_active: 0, updated_at: nowStr() });
    await userRepo.logActivity(adminId, 'delete', 'admin_user', id, null, null, ip);
    return true;
  }

  async getRecentActivity() {
    return await userRepo.getRecentActivity(20);
  }

  async getActivityLogs(page = 1, limit = 50) {
    const offset = (page - 1) * limit;
    return await userRepo.getActivityLogsFiltered(limit, offset);
  }

  async logCustomActivity(adminId, action, entityType, entityId, oldValues, newValues, ip, userAgent) {
    await userRepo.logActivity(adminId, action, entityType, entityId, oldValues, newValues, ip, userAgent);
  }
}
export const userService = new UserService();
