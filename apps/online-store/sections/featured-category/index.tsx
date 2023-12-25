'use client';

import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as TSwiper } from 'swiper/types';

import { Button } from '../../components/button';
import { cn } from '../../lib/utils';

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
      className={cn('flex items-center justify-between py-16', {
        'flex-row-reverse': side === 'right',
      })}
    >
      <div className="relative w-2/5 pt-6">
        <div
          className={cn('bg-mineral-green-600 absolute inset-0', {
            'right-20': side === 'left',
            'left-20': side === 'right',
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
        <h2 className="text-mineral-green-600 font-merriweather text-[40px]">
          {title}
        </h2>
        <Button>Shop {title}</Button>
      </div>
    </div>
  );
};

type TSliderButton = {
  direction: 'left' | 'right';
  onClick: () => void;
};
const SliderButton = ({ direction, onClick }: TSliderButton) => {
  return (
    <button
      onClick={onClick}
      className="border-mineral-green-600 flex w-16 items-center justify-center rounded-2xl border-2 p-3"
    >
      <MoveRight
        className={cn('text-mineral-green-600 h-6 w-6', {
          'rotate-180': direction === 'left',
        })}
      />
    </button>
  );
};

const FeaturedProductCard = () => {
  return (
    <div className="group relative flex flex-col items-center gap-2 pb-2">
      <div className="bg-norway-200 relative aspect-[1.26] h-[400px] overflow-hidden">
        <Image
          alt="product"
          src="/placeholder-product.png"
          fill
          className="object-contain object-center"
        />
      </div>
      <span className="text-pampas-100 text-sm">Tag 1 - Tag 2</span>
      <span className="text-pampas-100 relative px-4 py-2">
        Product Title
        <div className="bg-pampas-100 absolute bottom-2 left-4 right-4 h-0.5 origin-center translate-y-full scale-x-0 transition-all duration-300 group-hover:scale-x-100" />
      </span>
      <div className="text-pampas-100 overflow-hidden px-4 py-1">
        <span className="flex -translate-y-full py-1 transition-all duration-300 group-hover:translate-y-0">
          £23.99
        </span>
      </div>
    </div>
  );
};
