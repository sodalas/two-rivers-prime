import dotenv from 'dotenv';

dotenv.config();

export const PORT = parseInt(process.env.PORT || '3000', 10);
export const REDIS_URL = process.env.REDIS_URL;
export const NEO4J_URI = process.env.NEO4J_URI;
export const NEO4J_USERNAME = process.env.NEO4J_USERNAME;
export const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD;

export const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET;
export const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL;
export const DATABASE_URL = process.env.DATABASE_URL;

if (!REDIS_URL) {
  console.error('FATAL: REDIS_URL is not defined in environment variables.');
  process.exit(1);
}

if (!NEO4J_URI || !NEO4J_USERNAME || !NEO4J_PASSWORD) {
  console.error('FATAL: Neo4j environment variables (NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD) are missing.');
  process.exit(1);
}

if (!BETTER_AUTH_SECRET || !BETTER_AUTH_URL || !DATABASE_URL) {
  console.error('FATAL: Auth environment variables (BETTER_AUTH_SECRET, BETTER_AUTH_URL, DATABASE_URL) are missing.');
  process.exit(1);
}

export const ENV = {
  PORT,
  REDIS_URL,
  NEO4J_URI,
  NEO4J_USERNAME,
  NEO4J_PASSWORD,
  BETTER_AUTH_SECRET,
  BETTER_AUTH_URL,
  DATABASE_URL,
};
