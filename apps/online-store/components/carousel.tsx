'use client';

import { motion } from 'framer-motion';

type TCarousel = {
  direction: 'up' | 'down';
  offset?: number;
};
export const Carousel = ({ direction, offset = 0 }: TCarousel) => {
  return (
    <div className="flex grow flex-col overflow-y-hidden">
      {Array.from({ length: 4 }).map((_, idx) => (
        <motion.div
          key={idx}
          initial={{ y: direction == 'up' ? 0 : '-200%' }}
          animate={{ y: direction == 'up' ? '-200%' : 0 }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="pb-4"
        >
          <div
            style={{ transform: `translateY(${offset}px)` }}
            className="aspect-[10/11] bg-blue-400"
          ></div>
        </motion.div>
      ))}
    </div>
  );
};
