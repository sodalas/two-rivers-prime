import { startTelemetry, stopTelemetry } from './telemetry/otel.js';
import { connectRedis, disconnectRedis } from './redis/client.js';
import { connectNeo4j, disconnectNeo4j } from './neo4j/client.js';
import { ENV } from './env.js';
import { createApp } from './app.js';
import { createServer } from 'http';

async function main() {
  // 1. Initialize Telemetry (Non-fatal)
  await startTelemetry();

  // 2. Connect to Redis (Fatal if fails)
  await connectRedis();

  // 3. Connect to Neo4j (Fatal if fails)
  await connectNeo4j();

  // 4. Start Express Server
  const app = createApp();
  const server = createServer(app);

  server.listen(ENV.PORT, () => {
    console.info(`Server listening on port ${ENV.PORT}`);
  });

  // Graceful Shutdown
  const shutdown = async (signal: string) => {
    console.info(`${signal} received. Starting graceful shutdown...`);

    // Stop accepting new connections
    server.close(async (err) => {
      if (err) {
        console.error('Error closing server', err);
        process.exit(1);
      }

      console.info('HTTP server closed.');

      // Close Redis
      await disconnectRedis();

      // Close Neo4j
      await disconnectNeo4j();

      // Flush and stop Telemetry
      await stopTelemetry();

      console.info('Graceful shutdown completed.');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

main().catch((error) => {
  console.error('FATAL: Unhandled error in main', error);
  process.exit(1);
});
