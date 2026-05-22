/**
 * PM2 Ecosystem Configuration
 * Manages application deployment, scaling, and monitoring
 */

module.exports = {
  apps: [
    {
      name: 'plumtek-api',
      script: './server/index-production.mjs',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 8787,
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 8787,
      },
      // Restart policies
      max_memory_restart: '500M',
      max_restarts: 10,
      min_uptime: '10s',
      listen_timeout: 5000,
      kill_timeout: 5000,
      // Logging
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time_format: 'YYYY-MM-DD HH:mm:ss Z',
      // Monitoring
      watch: false,
      ignore_watch: ['node_modules', 'dist', 'logs'],
      max_restarts: 10,
      min_uptime: '10s',
    },
    {
      name: 'plumtek-web',
      script: './dist/index.html',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      // Use a static file server instead
      // Consider using: npm install -g serve
      // script: 'serve -s dist -l 3000',
    },
  ],

  deploy: {
    production: {
      user: 'deploy',
      host: 'your-server.com',
      ref: 'origin/main',
      repo: 'git@github.com:yourusername/plumtek.git',
      path: '/var/www/plumtek',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-deploy-local': 'echo "Deploying to production"',
    },
  },
};
