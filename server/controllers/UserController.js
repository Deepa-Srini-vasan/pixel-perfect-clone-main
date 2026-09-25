import { userService } from '../services/UserService.js';
import { sendJson, readBody, setCookie, clearCookie } from '../utils/http.js';
import { safeInt } from '../utils/helpers.js';
import { loginLimiter } from '../middleware/rateLimiter.js';

export class UserController {
  async login(req, res) {
    loginLimiter(req);

    const { email, password } = await readBody(req);
    if (!email || !password) {
      sendJson(res, 400, { error: 'Email and password required' });
      return;
    }

    const result = await userService.authenticate(email, password, req.ip);
    if (!result) {
      sendJson(res, 401, { error: 'Invalid credentials' });
      return;
    }

    setCookie(res, 'plumtek_session', result.token);
    sendJson(res, 200, { user: result.user });
  }

  async me(req, res) {
    if (!req.user) {
      sendJson(res, 401, { error: 'Unauthorized' });
      return;
    }
    const user = await userService.getCurrentUser(req.user.userId);
    if (!user) {
      sendJson(res, 401, { error: 'User not found' });
      return;
    }
    sendJson(res, 200, { user });
  }

  async logout(req, res) {
    clearCookie(res, 'plumtek_session');
    sendJson(res, 200, { success: true });
  }

  async getUsers(req, res) {
    const users = await userService.getAllUsers();
    sendJson(res, 200, { users });
  }

  async createUser(req, res) {
    const body = await readBody(req);
    const id = await userService.createUser(body, req.user?.userId, req.ip);
    sendJson(res, 201, { id });
  }

  async updateUser(req, res, id) {
    const body = await readBody(req);
    await userService.updateUser(safeInt(id), body, req.user?.userId, req.ip);
    sendJson(res, 200, { success: true });
  }

  async deleteUser(req, res, id) {
    if (safeInt(id) === req.user?.userId) {
      sendJson(res, 400, { error: 'Cannot delete yourself' });
      return;
    }
    await userService.deleteUser(safeInt(id), req.user?.userId, req.ip);
    sendJson(res, 200, { success: true });
  }

  async getActivityLogs(req, res) {
    const params = new URLSearchParams(req.query || '');
    const page = safeInt(params.get('page'), 1, 1);
    const limit = safeInt(params.get('limit'), 50, 1, 200);
    const data = await userService.getActivityLogs(page, limit);
    sendJson(res, 200, data);
  }
}
export const userController = new UserController();
