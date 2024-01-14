import { Slot } from '@radix-ui/react-slot';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cn } from '../utils';

type TAnimatedButton = ComponentPropsWithoutRef<'button'> & {
  asChild?: boolean;
  variant?: 'light' | 'dark';
  icon?: ReactNode;
};
export const AnimatedButton = ({
  className,
  children,
  asChild,
  disabled,
  variant = 'dark',
  icon,
  ...props
}: TAnimatedButton) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(
        'group relative flex justify-center rounded-2xl px-8 py-4 disabled:cursor-not-allowed',
        {
          'bg-mineral-green-600 text-pampas-100': variant === 'dark',
          'bg-pampas-100 text-mineral-green-600': variant === 'light',
          'cursor-not-allowed': disabled,
        },
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {icon && <div className="absolute left-4">{icon}</div>}
      <div className="relative overflow-hidden">
        <span
          className={cn('flex min-w-max', {
            'transition-all duration-300 group-hover:-translate-y-full':
              !disabled,
          })}
        >
          {children}
        </span>
        {!disabled && (
          <span className="absolute inset-0 flex translate-y-full transition-all duration-300 group-hover:translate-y-0">
            {children}
          </span>
        )}
      </div>
    </Comp>
  );
};
