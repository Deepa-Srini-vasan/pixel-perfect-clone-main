/**
 * Plumtek Enterprise API Server Launcher
 * Bootstraps database pool, initializes queue loop, and starts listening.
 */

import { server } from './app.js';
import { initializePool, closePool } from './database/connection.js';
import { queueService } from './services/QueueService.js';
import { config } from './config/config.js';

async function main() {
  console.log(`Starting Plumtek Enterprise Server v3 [${config.NODE_ENV}]`);

  // 1. Initialize Database connection pool
  await initializePool();
  console.log(`✓ Database connection pool established: ${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`);

  // 2. Start background transactional jobs queue
  queueService.startLoop();

  // 3. Start listening
  server.listen(config.PORT, config.HOST, () => {
    console.log(`✓ Server listening on http://${config.HOST}:${config.PORT}`);
    console.log('✓ Enterprise routing system loaded.');
  });

  // Graceful shutdown sequence
  const shutdown = async (signal) => {
    console.log(`\n${signal} received. Initiating graceful shutdown...`);
    server.close(async () => {
      await closePool();
      console.log('✓ Database connection pool closed.');
      console.log('Server shutdown complete. Goodbye!');
      process.exit(0);
    });

    // Forced exit after 5 seconds
    setTimeout(() => {
      console.error('Forced shutdown due to timeout.');
      process.exit(1);
    }, 5000).unref();
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT',  () => shutdown('SIGINT'));
}

main().catch(err => {
  console.error('Fatal server startup crash:', err.message);
  process.exit(1);
});
