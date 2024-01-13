'use client';

import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import Link from 'next/link';
import { useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as TSwiper } from 'swiper/types';

import { Button } from '../../components/button';
import { cn } from '../../lib/utils';
import { FeaturedProductCard } from './product-card';
import { SliderButton } from './slider-button';

type TFeaturedCategory = {
  side: 'left' | 'right';
  title: string;
  products: PricedProduct[];
  href: string;
};
export const FeaturedCategory = ({
  side,
  title,
  products,
  href,
}: TFeaturedCategory) => {
  const [swiper, setSwiper] = useState<TSwiper | null>(null);

  const handleClick = (direction: string) => () => {
    if (!swiper) return;

    // handles direction change due to using rtl mode in swiper
    if (direction === 'left') {
      return side === 'left' ? swiper.slideNext() : swiper.slidePrev();
    } else {
      return side === 'left' ? swiper.slidePrev() : swiper.slideNext();
    }
  };
  return (
    <div
      className={cn(
        'flex flex-col-reverse items-center justify-between gap-8 py-8 md:gap-16 md:py-16 lg:flex-row lg:gap-0',
        {
          'lg:flex-row-reverse': side === 'right',
        },
      )}
    >
      <div
        className={cn(
          'relative w-[90%] pt-6 sm:w-4/5 md:w-3/5 lg:w-2/5 lg:self-auto',
          side === 'left' ? 'self-start' : 'self-end',
        )}
      >
        <div
          className={cn('absolute inset-0 bg-mineral-green-600', {
            'right-8 sm:right-20': side === 'left',
            'left-8 sm:left-20': side === 'right',
          })}
        />
        <div
          className={cn('absolute top-20 z-50 flex flex-col gap-4', {
            'right-0 translate-x-1/2': side === 'left',
            'left-0 -translate-x-1/2': side === 'right',
          })}
        >
          <SliderButton onClick={handleClick('right')} direction="right" />
          <SliderButton onClick={handleClick('left')} direction="left" />
        </div>

        {/* using rtl mode here to align product card correctly*/}
        <Swiper
          onSwiper={setSwiper}
          slidesPerView={'auto'}
          spaceBetween={16}
          dir={side === 'left' ? 'rtl' : undefined}
          grabCursor
          loop
        >
          {products.map((product) => (
            <SwiperSlide className="max-w-min" key={product.title}>
              <Link href={`/products/${product.handle}`}>
                <FeaturedProductCard
                  title={product.title || ''}
                  tags={product.tags?.map((tag) => tag.value) || []}
                  price={{
                    amount: product.variants[0].prices[0].amount,
                    currencyCode: product.variants[0].prices[0].currency_code,
                  }}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex w-1/2 flex-col items-center gap-6 md:gap-12">
        <h2 className="text-center font-merriweather text-[40px] text-mineral-green-600">
          {title}
        </h2>
        <Button>
          <Link href={href}>Shop {title}</Link>
        </Button>
      </div>
    </div>
  );
};
