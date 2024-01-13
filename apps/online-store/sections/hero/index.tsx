import { getProductsByCategoryHandle } from '@phab/data-next';

import { splitArrayInHalf } from '../../lib/utils';
import { Carousel } from './carousel';
import { Search } from './search';

export const Hero = async () => {
  const products = await getProductsByCategoryHandle(
    'hidden-homepage-featured-items',
  );
  const [firstHalf, secondHalf] = splitArrayInHalf(products);
  return (
    <header className="flex h-[calc(100svh-80px)] flex-col-reverse justify-center gap-4 sm:h-[calc(100svh-96px)] lg:flex-row lg:gap-0">
      <div className="flex flex-col justify-center gap-8 px-4 pb-16 text-mineral-green-600 sm:px-16 sm:pb-[72px] lg:w-1/2">
        <h1 className="text-center font-merriweather text-4xl/[45px] md:text-5xl/[60px] lg:text-left">
          Your One-Stop Online Wellness Shop
        </h1>
        <p className="text-center text-xl lg:text-left">
          Find all your healthcare needs with ease. Just type and search below.
        </p>
        <Search />
      </div>
      <div className="hidden flex-col sm:flex lg:h-full lg:w-1/2">
        <div className="flex grow gap-4 lg:h-[calc(100%-72px)]">
          <Carousel
            products={firstHalf}
            direction="up"
            offset={-50}
            className="hidden lg:flex"
          />
          <Carousel
            products={secondHalf}
            direction="down"
            className="hidden lg:flex"
          />
          <Carousel
            products={products}
            direction="left"
            className="lg:hidden"
          />
        </div>
        <div className="hidden h-[72px] shrink-0 bg-mineral-green-600 lg:block" />
      </div>
    </header>
  );
};
