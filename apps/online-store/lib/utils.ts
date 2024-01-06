import { MoneyAmount } from '@medusajs/medusa';
import { PricedVariant } from '@medusajs/medusa/dist/types/pricing';
import { type ClassValue, clsx } from 'clsx';
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
  })
  return getPriceIn(cheapestVariant.prices, currencyCode)
};
