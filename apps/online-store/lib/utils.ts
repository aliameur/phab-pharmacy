import { MoneyAmount } from '@medusajs/medusa';
import { PricedVariant } from '@medusajs/medusa/dist/types/pricing';

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
