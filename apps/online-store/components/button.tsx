import { ComponentProps } from 'react';

import { cn } from '../lib/utils';

export const Button = ({
  className,
  children,
  ...props
}: ComponentProps<'button'>) => {
  return (
    <button
      className={cn('text-pampas-100 bg-mineral-green-600 rounded-2xl px-8 py-4', className)}
      {...props}
    >
      {children}
    </button>
  );
};
