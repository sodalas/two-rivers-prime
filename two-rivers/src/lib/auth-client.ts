import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: '/api/auth', // Relative URL relying on Vite Proxy
});
