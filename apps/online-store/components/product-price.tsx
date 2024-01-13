'use client';

import { ProductOption } from '@medusajs/medusa';
import { PricedVariant } from '@medusajs/medusa/dist/types/pricing';
import { useSearchParams } from 'next/navigation';

import { Price } from '@phab/ui/core';

type TProductPrice = {
  variants: PricedVariant[];
  options?: ProductOption[];
};
export const ProductPrice = ({ variants, options }: TProductPrice) => {
  const searchParams = useSearchParams();

  const hasNoOptionsOrJustOneOption =
    !options?.length ||
    (options?.length === 1 && options[0]?.values.length === 1);

  const activeOptions = Object.fromEntries(searchParams.entries());

  const selectedVariant = variants.find(
    (variant) =>
      variant.options?.every(
        (option) =>
          activeOptions[
            getOptionTitle(options || [], option.option_id)?.toLowerCase() || ''
          ] === option.value,
      ),
  );

  const selectedPrice = selectedVariant?.prices[0] || variants[0]?.prices[0];

  return (
    <div className="flex gap-2">
      {!selectedVariant && !hasNoOptionsOrJustOneOption ? (
        <span>From</span>
      ) : null}
      <Price
        className="text-lg font-medium"
        amount={selectedPrice.amount / 100}
        currencyCode={selectedPrice.currency_code}
      />
    </div>
  );
};

const getOptionTitle = (options: ProductOption[], optionId: string) => {
  return options.find((opt) => opt.id === optionId)?.title;
};
