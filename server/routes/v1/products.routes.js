import { productController } from '../../controllers/ProductController.js';

export const productRoutes = [
  // Public
  {
    method: 'GET',
    path: /^\/api\/v1\/products$/,
    handler: (req, res) => productController.getPublicProducts(req, res)
  },
  {
    method: 'GET',
    path: /^\/api\/v1\/products\/([^/]+)$/,
    handler: (req, res, matches) => productController.getPublicProductBySlug(req, res, matches[1])
  },

  // Admin
  {
    method: 'GET',
    path: /^\/api\/v1\/admin\/products$/,
    permission: 'products.view',
    handler: (req, res) => productController.getAdminProducts(req, res)
  },
  {
    method: 'POST',
    path: /^\/api\/v1\/admin\/products$/,
    permission: 'products.create',
    handler: (req, res) => productController.createProduct(req, res)
  },
  {
    method: 'PUT',
    path: /^\/api\/v1\/admin\/products\/(\d+)$/,
    permission: 'products.edit',
    handler: (req, res, matches) => productController.updateProduct(req, res, matches[1])
  },
  {
    method: 'DELETE',
    path: /^\/api\/v1\/admin\/products\/(\d+)$/,
    permission: 'products.delete',
    handler: (req, res, matches) => productController.deleteProduct(req, res, matches[1])
  }
];
