import { rateLimit, MemoryStore } from 'express-rate-limit';
import { logger } from './requestLogger.js';
// Global rate limiter
export const globalRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    skip: (req) => {
        // Exempt localhost from rate limiting
        const ip = req.ip || req.socket.remoteAddress;
        return ip === '127.0.0.1' || ip === '::1';
    },
    handler: (req, res, next, options) => {
        logger.warn({
            msg: 'Rate limit exceeded',
            ip: req.ip,
            path: req.path,
        });
        res.status(options.statusCode).send(options.message);
    },
    store: new MemoryStore(), // Explicitly use memory store as per "Redis-backed rate limiting is explicitly forbidden"
});
