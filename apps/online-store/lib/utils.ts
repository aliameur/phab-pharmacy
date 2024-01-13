import { MoneyAmount } from '@medusajs/medusa';
import { PricedVariant } from '@medusajs/medusa/dist/types/pricing';
import { type ClassValue, clsx } from 'clsx';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getPriceIn = (prices: MoneyAmount[], currencyCode: string) => {
  return prices.find(
    (p) => p.currency_code.toLowerCase() === currencyCode.toLowerCase(),
  );
};

export const getCheapestVariantPriceInCurrency = (
  variants: PricedVariant[],
  currencyCode: string,
) => {
  const cheapestVariant = variants.reduce((cheapest, variant) => {
    const cheapestCurrency = getPriceIn(cheapest.prices, currencyCode);
    const variantCurrency = getPriceIn(variant.prices, currencyCode);

    return cheapestCurrency && variantCurrency
      ? cheapestCurrency.amount < variantCurrency.amount
        ? cheapest
        : variant
      : cheapest;
  });
  return getPriceIn(cheapestVariant.prices, currencyCode);
};

export const splitArrayInHalf = <T>(array: T[]) => {
  const half = Math.ceil(array.length / 2);

  const firstHalf = array.slice(0, half);
  const secondHalf = array.slice(half);

  return [firstHalf, secondHalf];
};

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};
