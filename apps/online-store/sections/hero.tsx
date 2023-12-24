import { Search } from '../components/search';
import { Carousel } from '../components/carousel';

export const Hero = () => {
  return (
    <header className="flex h-[calc(100svh-96px)]">
      <div className="text-mineral-green-600 flex w-1/2 flex-col justify-center gap-8 px-16 pb-[72px]">
        <h1 className="font-merriweather text-5xl">
          Your One-Stop Online Wellness Shop
        </h1>
        <p className="text-xl">
          Find all your healthcare needs with ease. Just type and search
          below.
        </p>
        <Search />
      </div>
      <div className="h-full flex w-1/2 flex-col">
        <div className="flex h-[calc(100%-72px)] grow gap-4 bg-red-500">
          <Carousel direction="up" offset={-50} />
          <Carousel direction="down" />
        </div>
        <div className="bg-mineral-green-600 shrink-0 h-[72px]" />
      </div>
    </header>
  );
};
