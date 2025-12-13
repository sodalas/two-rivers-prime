import express from 'express';
import { globalRateLimiter } from './middleware/rateLimit.js';
import { requestLogger } from './middleware/requestLogger.js';
import { healthRoutes } from './routes/health.js';
export const createApp = () => {
    const app = express();
    // Middleware
    app.use(requestLogger);
    app.use(globalRateLimiter);
    // Routes
    app.use('/', healthRoutes);
    // 404 handler
    app.use((_req, res) => {
        res.status(404).json({ error: 'Not Found' });
    });
    return app;
};
