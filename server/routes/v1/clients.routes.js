import { clientController } from '../../controllers/ClientController.js';

export const clientRoutes = [
  // Public
  {
    method: 'GET',
    path: /^\/api\/v1\/clients$/,
    handler: (req, res) => clientController.getPublicClients(req, res)
  },

  // Admin
  {
    method: 'GET',
    path: /^\/api\/v1\/admin\/clients$/,
    permission: 'clients.view',
    handler: (req, res) => clientController.getAdminClients(req, res)
  },
  {
    method: 'POST',
    path: /^\/api\/v1\/admin\/clients$/,
    permission: 'clients.create',
    handler: (req, res) => clientController.createClient(req, res)
  },
  {
    method: 'PUT',
    path: /^\/api\/v1\/admin\/clients\/(\d+)$/,
    permission: 'clients.edit',
    handler: (req, res, matches) => clientController.updateClient(req, res, matches[1])
  },
  {
    method: 'DELETE',
    path: /^\/api\/v1\/admin\/clients\/(\d+)$/,
    permission: 'clients.delete',
    handler: (req, res, matches) => clientController.deleteClient(req, res, matches[1])
  }
];
