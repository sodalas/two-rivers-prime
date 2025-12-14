import { betterAuth } from 'better-auth';
import { Pool } from 'pg';
import { ENV } from '../env.js';

export const auth = betterAuth({
  database: new Pool({
    connectionString: ENV.DATABASE_URL,
  }),
  baseURL: ENV.BETTER_AUTH_URL, // Explicit
  secret: ENV.BETTER_AUTH_SECRET, // Explicit
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    'http://localhost:5173', 
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3001'
  ],
  // Ensure we do not disable security checks as per strict directive
  advanced: {
    defaultCookieAttributes: {
      secure: false, // Strict dev addendum
      sameSite: 'lax', // Strict dev addendum
    },
  },
});
