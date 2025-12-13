import { createRoute } from '@tanstack/react-router';
import { LandingPage } from './LandingPage';
import { rootRoute } from '@/app/router';

export const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});
