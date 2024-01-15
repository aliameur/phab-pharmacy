import { MoneyAmount } from '@medusajs/medusa';

export const getPriceIn = (prices: MoneyAmount[], currencyCode: string) => {
  return prices.find(
    (p) => p.currency_code.toLowerCase() === currencyCode.toLowerCase(),
  );
};
