import { testimonialController } from '../../controllers/TestimonialController.js';

export const testimonialRoutes = [
  // Public
  {
    method: 'GET',
    path: /^\/api\/v1\/testimonials$/,
    handler: (req, res) => testimonialController.getPublicTestimonials(req, res)
  },

  // Admin
  {
    method: 'GET',
    path: /^\/api\/v1\/admin\/testimonials$/,
    permission: 'testimonials.view',
    handler: (req, res) => testimonialController.getAdminTestimonials(req, res)
  },
  {
    method: 'POST',
    path: /^\/api\/v1\/admin\/testimonials$/,
    permission: 'testimonials.create',
    handler: (req, res) => testimonialController.createTestimonial(req, res)
  },
  {
    method: 'PUT',
    path: /^\/api\/v1\/admin\/testimonials\/(\d+)$/,
    permission: 'testimonials.edit',
    handler: (req, res, matches) => testimonialController.updateTestimonial(req, res, matches[1])
  },
  {
    method: 'DELETE',
    path: /^\/api\/v1\/admin\/testimonials\/(\d+)$/,
    permission: 'testimonials.delete',
    handler: (req, res, matches) => testimonialController.deleteTestimonial(req, res, matches[1])
  }
];
