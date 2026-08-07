import { mediaController } from '../../controllers/MediaController.js';
import { applyLimiter } from '../../middleware/rateLimiter.js';

export const mediaRoutes = [
  // Public uploads (e.g. resumes)
  {
    method: 'POST',
    path: /^\/api\/v1\/media\/upload$/,
    limiter: applyLimiter,
    handler: (req, res) => mediaController.uploadFile(req, res)
  },

  // Public fetch media metadata
  {
    method: 'GET',
    path: /^\/api\/v1\/media\/(\d+)$/,
    handler: (req, res, matches) => mediaController.getMediaItem(req, res, matches[1])
  }
];
