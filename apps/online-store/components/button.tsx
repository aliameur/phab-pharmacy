import { ComponentProps } from 'react';

import { cn } from '../lib/utils';

export const Button = ({
  className,
  children,
  ...props
}: ComponentProps<'button'>) => {
  return (
    <button
      className={cn(
        'group flex justify-center rounded-2xl bg-mineral-green-600 px-8 py-4 text-pampas-100',
        className,
      )}
      {...props}
    >
      <div className="relative overflow-hidden">
        <span className="flex min-w-max transition-all duration-300 group-hover:-translate-y-full">
          {children}
        </span>
        <span className="absolute inset-0 flex translate-y-full transition-all duration-300 group-hover:translate-y-0">
          {children}
        </span>
      </div>
    </button>
  );
};
