import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { AppProvider } from './providers';

export const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
};
