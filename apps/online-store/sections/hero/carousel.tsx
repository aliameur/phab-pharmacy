'use client';

import { motion } from 'framer-motion';

import { cn } from '../../lib/utils';

type TCarousel = {
  direction: 'up' | 'down' | 'left';
  offset?: number;
  className?: string;
};
export const Carousel = ({ direction, offset = 0, className }: TCarousel) => {
  const yInitial =
    direction === 'up' ? 0 : direction === 'down' ? '-200%' : undefined;
  const yAnimate =
    direction === 'up' ? '-200%' : direction === 'down' ? 0 : undefined;

  const xInitial = direction === 'left' ? 0 : undefined;
  const xAnimate = direction === 'left' ? '-100%' : undefined;

  return (
    <div
      className={cn(
        'flex grow overflow-hidden',
        { 'flex-col': direction !== 'left' },
        className,
      )}
    >
      {Array.from({ length: 5 }).map((_, idx) => (
        <motion.div
          key={idx}
          initial={{ y: yInitial, x: xInitial }}
          animate={{ y: yAnimate, x: xAnimate }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          className={direction === 'left' ? 'pr-4' : 'pb-4'}
        >
          <div
            style={{ transform: `translateY(${offset}px)` }}
            className={cn('aspect-[10/11] bg-norway-300', {
              'h-64': direction === 'left',
            })}
          ></div>
        </motion.div>
      ))}
    </div>
  );
};
