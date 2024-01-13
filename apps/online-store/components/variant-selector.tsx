'use client';

import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { cn, createUrl } from '../lib/utils';

type Combination = {
  id: string;
  purchasable: boolean;
  [key: string]: string | boolean; // ie. { color: 'Red', size: 'Large', ... }
};

type TVariantSelector = {
  product: PricedProduct;
};

// inspired from vercel shopify integration
export const VariantSelector = ({ product }: TVariantSelector) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const hasNoOptionsOrJustOneOption =
    !product.options?.length ||
    (product.options?.length === 1 && product.options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) return null;

  const combinations: Combination[] = product.variants.map((variant) => ({
    id: variant.id || '',
    purchasable: variant.purchasable || false,
    // Adds key / value pairs for each variant (ie. "color": "Black" and "size": 'M").
    ...(variant.options || []).reduce(
      (accumulator, option, a, v) => ({
        ...accumulator,
        [product.options
          ?.find((o) => o.values.some((v) => v.id === option.id))
          ?.title.toLowerCase() || '']: option.value,
      }),
      {},
    ),
  }));

  return (
    <div className="flex flex-col gap-4">
      {product.variants.length > 1 &&
        (product.options || []).map((option, i) => (
          <div key={option.id}>
            <h4 className='mb-2 text-mineral-green-600 font-merriweather text-lg'>{option.title}</h4>
            <div className="flex gap-5">
              {option.values.map((value, i) => {
                const optionTitle = option.title.toLowerCase();

                // Base option params on current params. so we can preserve any other param state in the url.
                const optionSearchParams = new URLSearchParams(
                  searchParams.toString(),
                );

                optionSearchParams.set(optionTitle, value.value);
                const optionUrl = createUrl(pathname, optionSearchParams);

                // In order to determine if an option is available for sale, we need to:
                //
                // 1. Filter out all other param state
                // 2. Filter out invalid options
                // 3. Check if the option combination is available for sale
                //
                // This is the "magic" that will cross-check possible variant combinations and preemptively
                // disable combinations that are not available. For example, if the color gray is only available in size medium,
                // then all other sizes should be disabled.
                // https://github.com/vercel/commerce/blob/main/components/product/variant-selector.tsx#L14

                const filtered = Array.from(
                  optionSearchParams.entries(),
                ).filter(
                  ([key, val]) =>
                    product.options?.find(
                      (opt) =>
                        opt.title.toLowerCase() === key &&
                        opt.values.map((v) => v.value).includes(val),
                    ),
                );
                const purchasable = combinations.find((combination) =>
                  filtered.every(
                    ([key, val]) =>
                      combination[key] === val && combination.purchasable,
                  ),
                );
                // The option is active if it's in the url params.
                const isActive = searchParams.get(optionTitle) === value.value;
                return (
                  <button
                    key={value.id}
                    aria-disabled={!purchasable}
                    disabled={!purchasable}
                    onClick={() => {
                      if (!purchasable) return;
                      router.replace(optionUrl);
                    }}
                    className={cn(
                      'rounded-xl border-2 border-norway-200 bg-mineral-green-600 px-4 py-2 text-pampas-100',
                      {
                        'relative z-10 cursor-not-allowed overflow-hidden border-opacity-80 bg-opacity-80 before:absolute before:-inset-x-1.5 before:top-1/2 before:-z-10 before:h-0.5 before:origin-center before:-translate-y-1/2 before:-rotate-45 before:bg-norway-300/80 before:transition-transform':
                          !purchasable,
                        'border-2 border-norway-400 ': isActive,
                      },
                    )}
                    title={`${option.title} ${value}${
                      !purchasable ? ' (Out of Stock)' : ''
                    }`}
                  >
                    {value.value}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
    </div>
  );
};
