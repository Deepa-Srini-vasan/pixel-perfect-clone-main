import { clientService } from '../services/ClientService.js';
import { sendJson, readBody } from '../utils/http.js';
import { safeInt } from '../utils/helpers.js';

export class ClientController {
  async getPublicClients(req, res) {
    const clients = await clientService.getPublicClients();
    sendJson(res, 200, { clients });
  }

  async getAdminClients(req, res) {
    const clients = await clientService.getAdminClients();
    sendJson(res, 200, { clients });
  }

  async createClient(req, res) {
    const body = await readBody(req);
    const id = await clientService.createClient(body, req.user?.userId, req.ip);
    sendJson(res, 201, { id });
  }

  async updateClient(req, res, id) {
    const body = await readBody(req);
    await clientService.updateClient(safeInt(id), body, req.user?.userId, req.ip);
    sendJson(res, 200, { success: true });
  }

  async deleteClient(req, res, id) {
    await clientService.deleteClient(safeInt(id), req.user?.userId, req.ip);
    sendJson(res, 200, { success: true });
  }
}
export const clientController = new ClientController();
