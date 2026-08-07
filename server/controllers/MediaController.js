import { mediaService } from '../services/MediaService.js';
import { sendJson, readBody } from '../utils/http.js';

export class MediaController {
  async uploadFile(req, res) {
    const body = await readBody(req);
    const { filename, mimeType, base64Data } = body;

    if (!filename || !mimeType || !base64Data) {
      sendJson(res, 400, { error: 'filename, mimeType, and base64Data are required' });
      return;
    }

    try {
      const buffer = Buffer.from(base64Data, 'base64');
      const result = await mediaService.saveFile(filename, mimeType, buffer, req.user?.userId);
      sendJson(res, 201, result);
    } catch (err) {
      sendJson(res, 500, { error: err.message });
    }
  }

  async getMediaItem(req, res, id) {
    const item = await mediaService.getMediaItem(Number(id));
    if (!item) {
      sendJson(res, 404, { error: 'Media file not found' });
      return;
    }
    sendJson(res, 200, { media: item });
  }
}
export const mediaController = new MediaController();
