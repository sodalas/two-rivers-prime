import express from 'express';
import { globalRateLimiter } from './middleware/rateLimit.js';
import { requestLogger } from './middleware/requestLogger.js';
import { healthRoutes } from './routes/health.js';
import { meRoutes } from './routes/me.js';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './auth/auth.js';
import cors from 'cors';

export const createApp = () => {
  const app = express();

  // Middleware
  app.use(requestLogger);
  app.use(globalRateLimiter); // Rate limiter should likely come before expensive ops, but acceptable here.

  // CORS (Explicit & Dev-Safe)
  const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }));

  // DEBUG: Log Auth Requests (REMOVE AFTER FIXED)
  app.use('/api/auth', (req, _res, next) => {
    console.log('[AuthDebug]', req.method, req.path, {
      origin: req.headers.origin,
      host: req.headers.host,
    });
    next();
  });

  // Auth Handler (CRITICAL: Before express.json)
  app.all('/api/auth/*', toNodeHandler(auth));

  // Body Parsing (After Auth)
  app.use(express.json());

  // Routes
  app.use('/', healthRoutes);
  app.use('/api', meRoutes);

  // 404 handler
  app.use((_req, res) => {
    res.status(404).json({ error: 'Not Found' });
  });

  return app;
};
