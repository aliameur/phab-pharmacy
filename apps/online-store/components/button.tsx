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
        'text-pampas-100 bg-mineral-green-600 group rounded-2xl px-8 py-4',
        className,
      )}
      {...props}
    >
      <div className="relative overflow-hidden">
        <span className="flex transition-all duration-300 group-hover:-translate-y-full">
          {children}
        </span>
        <span className="absolute inset-0 flex translate-y-full transition-all duration-300 group-hover:translate-y-0">
          {children}
        </span>
      </div>
    </button>
  );
};
