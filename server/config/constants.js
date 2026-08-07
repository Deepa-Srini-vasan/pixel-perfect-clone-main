export const ENQUIRY_TYPES = ['product', 'dealer', 'general', 'contact'];
export const ENQUIRY_STATUSES = ['new', 'contacted', 'qualified', 'closed'];

export const JOB_TYPES = ['full-time', 'part-time', 'contract', 'internship'];
export const APPLICATION_STATUSES = ['new', 'reviewing', 'shortlisted', 'rejected', 'hired'];

export const RATE_LIMIT_WINDOWS = {
  GLOBAL: 15 * 60 * 1000,
  ENQUIRY: 10 * 60 * 1000,
  CAREER_APPLY: 60 * 60 * 1000,
  LOGIN: 15 * 60 * 1000,
};

export const MAX_ATTEMPTS = {
  GLOBAL: 200,
  ENQUIRY: 5,
  CAREER_APPLY: 3,
  LOGIN: 10,
};
