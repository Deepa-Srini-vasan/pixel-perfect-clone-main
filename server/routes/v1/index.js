import { productRoutes } from './products.routes.js';
import { categoryRoutes } from './categories.routes.js';
import { careerRoutes } from './careers.routes.js';
import { clientRoutes } from './clients.routes.js';
import { testimonialRoutes } from './testimonials.routes.js';
import { enquiryRoutes } from './enquiries.routes.js';
import { mediaRoutes } from './media.routes.js';
import { inventoryRoutes } from './inventory.routes.js';
import { settingRoutes } from './settings.routes.js';
import { dashboardRoutes } from './dashboard.routes.js';
import { authRoutes } from './auth.routes.js';
import { chatbotRoutes } from './chatbot.routes.js';

export const routes = [
  ...productRoutes,
  ...categoryRoutes,
  ...careerRoutes,
  ...clientRoutes,
  ...testimonialRoutes,
  ...enquiryRoutes,
  ...mediaRoutes,
  ...inventoryRoutes,
  ...settingRoutes,
  ...dashboardRoutes,
  ...authRoutes,
  ...chatbotRoutes,
];
