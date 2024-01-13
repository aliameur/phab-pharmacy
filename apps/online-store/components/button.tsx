import { Slot } from '@radix-ui/react-slot';
import { ComponentPropsWithoutRef } from 'react';

import { cn } from '../lib/utils';

type TButton = ComponentPropsWithoutRef<'button'> & {
  asChild?: boolean;
  variant?: 'light' | 'dark';
};
export const Button = ({
  className,
  children,
  asChild,
  variant = 'dark',
  ...props
}: TButton) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(
        'group flex justify-center rounded-2xl px-8 py-4',
        {
          'bg-mineral-green-600 text-pampas-100': variant === 'dark',
          'bg-pampas-100 text-mineral-green-600': variant === 'light',
        },
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
    </Comp>
  );
};
