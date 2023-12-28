import Image from 'next/image';

import { TopRight } from './top-right';

type TGallery = {
  className?: string;
};
export const Gallery = ({ className = '' }: TGallery) => {
  return (
    <div className={`flex h-full w-1/2 gap-5 pr-8 ${className}`}>
      <div className="flex flex-col gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 w-24 bg-mineral-green-600" />
        ))}
      </div>
      <div className="relative w-full bg-mineral-green-600 ">
        <TopRight className="absolute -right-12 -top-12" />
        <Image
          src="/placeholder-product.png"
          alt="Placeholder Product"
          className="aspect-auto object-contain object-center"
          fill
        />
      </div>
    </div>
  );
};
