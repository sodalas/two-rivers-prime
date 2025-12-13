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
    // Ensure we do not disable security checks as per strict directive
    advanced: {
        defaultCookieAttributes: {
            secure: false, // Strict dev addendum
            sameSite: 'lax', // Strict dev addendum
        },
    },
});
