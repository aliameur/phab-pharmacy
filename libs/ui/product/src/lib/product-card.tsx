import getSymbolFromCurrency from 'currency-symbol-map';
import Image from 'next/image';
import Link from 'next/link';

import { SVGPattern } from './svg-pattern';

type TProductCard = {
  href: string;
  src: string;
  alt: string;
  title: string;
  price: { amount?: number; currencyCode?: string };
};

export const ProductCard = ({ href, src, alt, title, price }: TProductCard) => {
  return (
    <Link href={href} className="relative transition-opacity">
      <div className="absolute left-0 top-0 z-0 aspect-square w-full bg-mineral-green-600" />
      <SVGPattern className="absolute -right-0 top-0 z-0 block h-full w-full" />
      <div className="relative z-0 aspect-square overflow-hidden">
        <Image className="object-contain" fill src={src} alt={alt} />
      </div>
      <div className="relative z-30 h-16 text-center">
        <h4 className="text-lg font-bold text-mineral-green-600">{title}</h4>
        {price.amount && price.currencyCode ? (
          <p className="text-mineral-green-600">
            {getSymbolFromCurrency(price.currencyCode)} {price.amount / 100}
          {/*  TODO use price component here */}
          </p>
        ) : null}
      </div>
    </Link>
  );
};
