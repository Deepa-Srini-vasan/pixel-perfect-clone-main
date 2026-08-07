import { careerController } from '../../controllers/CareerController.js';
import { applyLimiter } from '../../middleware/rateLimiter.js';

export const careerRoutes = [
  // Public
  {
    method: 'GET',
    path: /^\/api\/v1\/careers\/jobs$/,
    handler: (req, res) => careerController.getPublicJobs(req, res)
  },
  {
    method: 'POST',
    path: /^\/api\/v1\/careers\/apply$/,
    limiter: applyLimiter,
    handler: (req, res) => careerController.submitApplication(req, res)
  },

  // Admin jobs
  {
    method: 'GET',
    path: /^\/api\/v1\/admin\/career-jobs$/,
    permission: 'careers.view',
    handler: (req, res) => careerController.getAdminJobs(req, res)
  },
  {
    method: 'POST',
    path: /^\/api\/v1\/admin\/career-jobs$/,
    permission: 'careers.create',
    handler: (req, res) => careerController.createJob(req, res)
  },
  {
    method: 'PUT',
    path: /^\/api\/v1\/admin\/career-jobs\/(\d+)$/,
    permission: 'careers.edit',
    handler: (req, res, matches) => careerController.updateJob(req, res, matches[1])
  },
  {
    method: 'DELETE',
    path: /^\/api\/v1\/admin\/career-jobs\/(\d+)$/,
    permission: 'careers.delete',
    handler: (req, res, matches) => careerController.deleteJob(req, res, matches[1])
  },

  // Admin applications
  {
    method: 'GET',
    path: /^\/api\/v1\/admin\/career-applications$/,
    permission: 'careers.view',
    handler: (req, res) => careerController.getApplications(req, res)
  },
  {
    method: 'GET',
    path: /^\/api\/v1\/admin\/career-applications\/(\d+)$/,
    permission: 'careers.view',
    handler: (req, res, matches) => careerController.getApplicationById(req, res, matches[1])
  },
  {
    method: 'PUT',
    path: /^\/api\/v1\/admin\/career-applications\/(\d+)$/,
    permission: 'careers.edit',
    handler: (req, res, matches) => careerController.updateApplication(req, res, matches[1])
  }
];
