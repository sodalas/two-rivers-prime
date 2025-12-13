import { createRootRoute, createRouter, Outlet } from '@tanstack/react-router';
import { landingRoute } from '@/features/landing/routes';

export const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const routeTree = rootRoute.addChildren([landingRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
