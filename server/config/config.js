import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production', override: true });
}

export const config = {
  PORT:                  Number(process.env.PORT ?? 8787),
  HOST:                  process.env.HOST ?? 'localhost',
  NODE_ENV:              process.env.NODE_ENV ?? 'development',
  DB_HOST:               process.env.DB_HOST ?? 'localhost',
  DB_PORT:               Number(process.env.DB_PORT ?? 3306),
  DB_USER:               process.env.DB_USER ?? 'root',
  DB_PASSWORD:           process.env.DB_PASSWORD ?? '',
  DB_NAME:               process.env.DB_NAME ?? 'plumtek_catalog',
  DB_SSL:                process.env.DB_SSL === 'true',
  JWT_SECRET:            process.env.ADMIN_JWT_SECRET ?? 'plumtek-dev-secret-change-in-prod',
  JWT_EXPIRY:            Number(process.env.ADMIN_JWT_EXPIRY ?? 604800000), // 7 days
  CORS_ORIGINS:          (process.env.CORS_ORIGIN ?? 'http://localhost:5173,http://localhost:5174').split(',').map(s => s.trim()),
  RATE_LIMIT_WINDOW:     Number(process.env.RATE_LIMIT_WINDOW_MS ?? 900000),
  RATE_LIMIT_MAX:        Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? 200),
  LOG_LEVEL:             process.env.LOG_LEVEL ?? 'info',
  MAX_BODY_BYTES:        Number(process.env.MAX_REQUEST_SIZE_BYTES ?? 2097152), // 2MB
  IS_PROD:               (process.env.NODE_ENV ?? 'development') === 'production',
};
