import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@/app/router';
import { LoginPage } from './LoginPage';
import { SignupPage } from './SignupPage';

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

export const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: SignupPage,
});
