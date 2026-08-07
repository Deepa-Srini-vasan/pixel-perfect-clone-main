import { userController } from '../../controllers/UserController.js';

export const authRoutes = [
  // Auth
  {
    method: 'POST',
    path: /^\/api\/v1\/auth\/login$/,
    handler: (req, res) => userController.login(req, res)
  },
  {
    method: 'GET',
    path: /^\/api\/v1\/auth\/me$/,
    handler: (req, res) => userController.me(req, res)
  },
  {
    method: 'POST',
    path: /^\/api\/v1\/auth\/logout$/,
    handler: (req, res) => userController.logout(req, res)
  },

  // Admin users CRUD (requires users.view permission)
  {
    method: 'GET',
    path: /^\/api\/v1\/admin\/users$/,
    permission: 'users.view',
    handler: (req, res) => userController.getUsers(req, res)
  },
  {
    method: 'POST',
    path: /^\/api\/v1\/admin\/users$/,
    permission: 'users.create',
    handler: (req, res) => userController.createUser(req, res)
  },
  {
    method: 'PUT',
    path: /^\/api\/v1\/admin\/users\/(\d+)$/,
    permission: 'users.edit',
    handler: (req, res, matches) => userController.updateUser(req, res, matches[1])
  },
  {
    method: 'DELETE',
    path: /^\/api\/v1\/admin\/users\/(\d+)$/,
    permission: 'users.delete',
    handler: (req, res, matches) => userController.deleteUser(req, res, matches[1])
  },

  // Activity logs
  {
    method: 'GET',
    path: /^\/api\/v1\/admin\/activity-logs$/,
    permission: 'activity_logs.view',
    handler: (req, res) => userController.getActivityLogs(req, res)
  }
];
