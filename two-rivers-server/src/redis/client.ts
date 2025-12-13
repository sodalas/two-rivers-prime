import { createClient } from 'redis';
import { ENV } from '../env.js';

let isConnected = false;

export const redisClient = createClient({
  url: ENV.REDIS_URL,
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

redisClient.on('connect', () => {
  console.info('Redis Client Connecting...');
});

redisClient.on('ready', () => {
  console.info('Redis Client Connected and Ready');
  isConnected = true;
});

redisClient.on('end', () => {
  console.info('Redis Client Disconnected');
  isConnected = false;
});

export async function connectRedis() {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error('FATAL: Failed to connect to Redis at startup.', error);
    process.exit(1);
  }
}

export async function disconnectRedis() {
  if (redisClient.isOpen) {
    await redisClient.quit();
  }
}

export function isRedisConnected() {
  return isConnected;
}
