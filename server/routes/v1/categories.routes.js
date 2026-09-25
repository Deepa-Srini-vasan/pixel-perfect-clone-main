import { categoryController } from '../../controllers/CategoryController.js';

export const categoryRoutes = [
  // Public
  {
    method: 'GET',
    path: /^\/api\/v1\/categories$/,
    handler: (req, res) => categoryController.getPublicCategories(req, res)
  },

  // Admin
  {
    method: 'GET',
    path: /^\/api\/v1\/admin\/categories$/,
    permission: 'categories.view',
    handler: (req, res) => categoryController.getAdminCategories(req, res)
  },
  {
    method: 'POST',
    path: /^\/api\/v1\/admin\/categories$/,
    permission: 'categories.create',
    handler: (req, res) => categoryController.createCategory(req, res)
  },
  {
    method: 'PUT',
    path: /^\/api\/v1\/admin\/categories\/(\d+)$/,
    permission: 'categories.edit',
    handler: (req, res, matches) => categoryController.updateCategory(req, res, matches[1])
  },
  {
    method: 'DELETE',
    path: /^\/api\/v1\/admin\/categories\/(\d+)$/,
    permission: 'categories.delete',
    handler: (req, res, matches) => categoryController.deleteCategory(req, res, matches[1])
  }
];
