import { createRootRoute, createRouter, Outlet } from '@tanstack/react-router';
import { landingRoute } from '@/features/landing/routes';

export const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

import { loginRoute, signupRoute } from '@/features/auth/routes';

const routeTree = rootRoute.addChildren([landingRoute, loginRoute, signupRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
