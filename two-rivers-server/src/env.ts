import dotenv from 'dotenv';

dotenv.config();

export const PORT = parseInt(process.env.PORT || '3000', 10);
export const REDIS_URL = process.env.REDIS_URL;
export const NEO4J_URI = process.env.NEO4J_URI;
export const NEO4J_USERNAME = process.env.NEO4J_USERNAME;
export const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD;

if (!REDIS_URL) {
  console.error('FATAL: REDIS_URL is not defined in environment variables.');
  process.exit(1);
}

if (!NEO4J_URI || !NEO4J_USERNAME || !NEO4J_PASSWORD) {
  console.error('FATAL: Neo4j environment variables (NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD) are missing.');
  process.exit(1);
}

export const ENV = {
  PORT,
  REDIS_URL,
  NEO4J_URI,
  NEO4J_USERNAME,
  NEO4J_PASSWORD,
};
