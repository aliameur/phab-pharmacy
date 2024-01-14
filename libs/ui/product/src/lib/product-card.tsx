import getSymbolFromCurrency from 'currency-symbol-map';
import Image from 'next/image';
import Link from 'next/link';

import { SVGPattern } from './svg-pattern';
import {cn} from "@phab/utils";

type TProductCard = {
  href: string;
  src: string;
  alt: string;
  title: string;
  price?: { amount?: number; currencyCode?: string };
  variant?: 'small' | 'default';
};

export const ProductCard = ({
  href,
  src,
  alt,
  title,
  price,
  variant = 'default',
}: TProductCard) => {
  return (
    <Link href={href} className="relative transition-opacity">
      <div className="absolute left-0 top-0 z-0 aspect-square w-full bg-mineral-green-600" />
      <SVGPattern preserveAspectRatio='none' className="absolute right-0 top-0 z-0 block h-full w-[95%]" />
      <div className="relative z-0 aspect-square overflow-hidden">
        <Image className="object-contain" fill src={src} alt={alt} />
      </div>
      <div className={cn("relative z-30 h-16 text-center", {
        "h-16": variant === "default",
        "h-8 pt-1": variant === "small",
      })}>
        <h4 className={cn("text-mineral-green-600", {
          "text-lg font-bold": variant === "default",
          "text-base font-semibold": variant === "small",
        })}>{title}</h4>
        {price?.amount && price.currencyCode ? (
          <p className="text-mineral-green-600">
            {getSymbolFromCurrency(price.currencyCode)} {price.amount / 100}
            {/*  TODO use price component here */}
          </p>
        ) : null}
      </div>
    </Link>
  );
};
