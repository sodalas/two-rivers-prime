import { Router } from 'express';
import { isRedisConnected } from '../redis/client.js';
import { isNeo4jConnected } from '../neo4j/client.js';

const router = Router();

router.get('/health', (_req, res) => {
  const healthData = {
    status: 'ok',
    uptime: process.uptime(),
    redis: isRedisConnected() ? 'connected' : 'disconnected',
    neo4j: isNeo4jConnected() ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  };

  res.json(healthData);
});

export const healthRoutes = router;
