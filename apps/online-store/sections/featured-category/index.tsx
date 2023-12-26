'use client';

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
};
export const FeaturedCategory = ({ side, title }: TFeaturedCategory) => {
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
        'flex flex-col-reverse items-center justify-between gap-16 py-16 lg:flex-row lg:gap-0',
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
          {Array.from({ length: 3 }).map((_, idx) => (
            <SwiperSlide className="max-w-min" key={idx}>
              <FeaturedProductCard />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex w-1/2 flex-col items-center gap-12">
        <h2 className="font-merriweather text-[40px] text-mineral-green-600">
          {title}
        </h2>
        <Button>Shop {title}</Button>
      </div>
    </div>
  );
};
