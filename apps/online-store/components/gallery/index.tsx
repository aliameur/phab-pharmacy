'use client';

import { Image as ImageType } from '@medusajs/medusa';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { cn, createUrl } from '../../lib/utils';
import { TopRight } from './top-right';

type TGallery = {
  className?: string;
  images: ImageType[];
};
export const Gallery = ({ className = '', images }: TGallery) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const imageSearchParam = searchParams.get('image');
  const imageIndex = imageSearchParam ? parseInt(imageSearchParam) : 0;

  return (
    <div
      className={cn(
        'flex h-full flex-col-reverse gap-5 xl:flex-row',
        className,
      )}
    >
      <div className="flex justify-center gap-5 xl:flex-col xl:justify-start">
        {images.map((image, i) => {
          const newSearchParams = new URLSearchParams(searchParams.toString());
          newSearchParams.set('image', (i + 1).toString());
          const url = createUrl(pathname, newSearchParams);
          const isActive = i === imageIndex - 1;
          return (
            <Link
              href={url}
              key={image.id}
              className={cn(
                'relative h-24 w-24 overflow-hidden rounded-xl border-2 border-norway-300 bg-mineral-green-600',
                {
                  'border-norway-400': isActive,
                },
              )}
            >
              <Image src={image.url} alt="" fill sizes="96w" />
            </Link>
          );
        })}
      </div>
      <div className="relative min-h-[60vh] w-full bg-mineral-green-600 ">
        <TopRight
          preserveAspectRatio="xMaxYMin meet"
          className="absolute -right-4 -top-4 z-10 w-4/5 sm:-right-12 sm:-top-12 xl:w-auto"
        />
        {/* Safeguard against manipulating url */}
        <Image
          src={images[imageIndex - 1]?.url || images[0].url}
          alt="Placeholder Product"
          className="aspect-auto object-contain object-center"
          fill
        />
      </div>
    </div>
  );
};
