import { PricedVariant } from '@medusajs/medusa/dist/types/pricing';

import { getPriceIn } from './get-price-in';

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
