import { enquiryController } from '../../controllers/EnquiryController.js';
import { enquiryLimiter } from '../../middleware/rateLimiter.js';

export const enquiryRoutes = [
  // Public
  {
    method: 'POST',
    path: /^\/api\/v1\/enquiries$/,
    limiter: enquiryLimiter,
    handler: (req, res) => enquiryController.submitEnquiry(req, res)
  },

  // Admin
  {
    method: 'GET',
    path: /^\/api\/v1\/admin\/enquiries$/,
    permission: 'enquiries.view',
    handler: (req, res) => enquiryController.getEnquiries(req, res)
  },
  {
    method: 'GET',
    path: /^\/api\/v1\/admin\/enquiries\/(\d+)$/,
    permission: 'enquiries.view',
    handler: (req, res, matches) => enquiryController.getEnquiryById(req, res, matches[1])
  },
  {
    method: 'PUT',
    path: /^\/api\/v1\/admin\/enquiries\/(\d+)$/,
    permission: 'enquiries.edit',
    handler: (req, res, matches) => enquiryController.updateEnquiry(req, res, matches[1])
  },
  {
    method: 'POST',
    path: /^\/api\/v1\/admin\/enquiries\/(\d+)\/reply$/,
    permission: 'enquiries.reply',
    handler: (req, res, matches) => enquiryController.replyToEnquiry(req, res, matches[1])
  },
  {
    method: 'DELETE',
    path: /^\/api\/v1\/admin\/enquiries\/(\d+)$/,
    permission: 'enquiries.delete',
    handler: (req, res, matches) => enquiryController.deleteEnquiry(req, res, matches[1])
  }
];
