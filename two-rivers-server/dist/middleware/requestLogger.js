import { pinoHttp } from 'pino-http';
import pino from 'pino';
// Define the logger instance
export const logger = pino({
    level: process.env.NODE_ENV === 'test' ? 'silent' : 'info',
    transport: process.env.NODE_ENV !== 'production'
        ? {
            target: 'pino-pretty',
            options: {
                colorize: true,
            },
        }
        : undefined,
});
// Create the middleware
export const requestLogger = pinoHttp({
    logger,
    // Reduce noise for health checks if needed, but directive says "Log everything"
    // keeping standard logging for now.
});
