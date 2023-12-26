import Link from 'next/link';
import { ComponentProps, ReactNode } from 'react';

import { cn } from '../../lib/utils';

type TNavLink = ComponentProps<typeof Link> & {
  children: ReactNode;
};
export const NavLink = ({ children, className, ...props }: TNavLink) => {
  return (
    <Link
      {...props}
      className={cn(
        'group relative px-4 py-2 text-mineral-green-600',
        className,
      )}
    >
      {children}
      <div className="absolute bottom-2 left-4 right-4 h-0.5 origin-center translate-y-full scale-x-0 bg-mineral-green-600 transition-all duration-300 group-hover:scale-x-100" />
    </Link>
  );
};
