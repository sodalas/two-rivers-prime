import { type HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

const Container = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}
        {...props}
      />
    );
  }
);
Container.displayName = 'Container';

export { Container };
