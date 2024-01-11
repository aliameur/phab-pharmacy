'use client';

import { motion } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';

import { cn } from '../../lib/utils';

type TSidebarWrapper = {
  side: 'left' | 'right';
  children: ReactNode;
  className?: string;
};

export const SidebarWrapper = forwardRef<HTMLDivElement, TSidebarWrapper>(
  ({ side, children, className }, ref) => {
    const x = side === 'left' ? '-100%' : '100%';
    return (
      <motion.div
        ref={ref}
        initial={{ x }}
        animate={{ x: 0, transition: { duration: 0.3 } }}
        exit={{ x, transition: { duration: 0.2 } }}
        className={cn('fixed inset-0 z-10', className)}
      >
        {children}
      </motion.div>
    );
  },
);

SidebarWrapper.displayName = 'SidebarWrapper';
