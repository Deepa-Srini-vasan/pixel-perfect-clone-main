import { chatbotController } from '../../controllers/ChatbotController.js';
import { applyLimiter } from '../../middleware/rateLimiter.js';

export const chatbotRoutes = [
  {
    method: 'POST',
    path: /^\/api\/v1\/chatbot\/chat$/,
    limiter: applyLimiter,
    handler: (req, res) => chatbotController.chat(req, res)
  }
];
