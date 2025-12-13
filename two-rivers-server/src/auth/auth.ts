import { betterAuth } from 'better-auth';
import { Pool } from 'pg';
import { ENV } from '../env.js';

export const auth = betterAuth({
  database: new Pool({
    connectionString: ENV.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    'http://localhost:5173', 
    'http://localhost:3001', 
    'http://localhost:3000'
  ],
  // Ensure we do not disable security checks as per strict directive
  advanced: {
    defaultCookieAttributes: {
      secure: false, // Strict dev addendum
      sameSite: 'lax', // Strict dev addendum
    },
  },
});
