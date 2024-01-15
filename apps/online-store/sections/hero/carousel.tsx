'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { TProduct } from '@phab/types';
import { cn } from '@phab/utils';

type TCarousel = {
  direction: 'up' | 'down' | 'left';
  offset?: number;
  className?: string;
  products: TProduct[];
};
export const Carousel = ({
  direction,
  offset = 0,
  className,
  products,
}: TCarousel) => {
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
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: yInitial, x: xInitial }}
          animate={{ y: yAnimate, x: xAnimate }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          className={cn('', {
            'flex-col': direction !== 'left',
          })}
        >
          {products.map((product) =>
            product.thumbnail ? (
              <Link
                key={product.id}
                href={`/products/${product.handle}`}
                className={direction === 'left' ? 'pr-4' : 'pb-4'}
              >
                <div
                  style={{ transform: `translateY(${offset}px)` }}
                  className={cn('relative aspect-[10/11]', {
                    'h-64': direction === 'left',
                  })}
                >
                  <Image
                    src={product.thumbnail}
                    alt={product.title || ''}
                    className="object-contain"
                    fill
                  />
                </div>
              </Link>
            ) : null,
          )}
        </motion.div>
      ))}
    </div>
  );
};
