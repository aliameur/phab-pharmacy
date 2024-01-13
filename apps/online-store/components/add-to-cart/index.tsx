'use client';

import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { Ban, Minus, MoreHorizontal, Plus } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

import { addItem } from '../../lib/cart/actions';
import { Button } from '../button';

type TAddToCart = {
  product: PricedProduct;
};

export const AddToCart = ({ product }: TAddToCart) => {
  const [count, setCount] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const defaultVariantId =
    product.variants.length === 1 ? product.variants[0]?.id : undefined;
  const variant = product.variants.find(
    (variant) =>
      variant.options?.every(
        (option) =>
          option.value ===
          searchParams.get(
            product.options
              ?.find((opt) => opt.values.some((v) => v.id === option.id))
              ?.title.toLowerCase() || '',
          ),
      ),
  );
  const selectedVariantId = variant?.id || defaultVariantId;
  const title = !variant?.purchasable
    ? 'Out of stock'
    : !selectedVariantId
      ? 'Please select options'
      : undefined;

  // TODO set the max to ATC at once
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => {
    if (count === 1) return;
    setCount((prev) => prev - 1);
  };
  return (
    <div className="flex gap-4">
      <div className="flex items-center justify-between rounded-2xl bg-mineral-green-600 px-0.5 py-2.5 text-pampas-100">
        <button
          aria-label="Decrease count by one"
          onClick={decrement}
          className="px-3"
        >
          <Minus />
        </button>
        <div className="h-full w-px bg-white/20" />
        <span className="w-8 text-center" aria-label={`Count is ${count}`}>
          {count}
        </span>
        <div className="h-full w-px bg-white/20" />
        <button
          aria-label="Increase count by one"
          onClick={increment}
          className="px-3"
        >
          <Plus />
        </button>
      </div>
      <Button
        aria-label="Add item to cart"
        title={title}
        disabled={isPending || !variant?.purchasable || !selectedVariantId}
        onClick={() => {
          // Safeguard in case someone messes with `disabled` in devtools.
          if (!variant?.purchasable || !selectedVariantId) return;

          startTransition(async () => {
            await addItem({
              variantId: variant.id || defaultVariantId,
              quantity: count,
            });

            router.refresh();
          });
        }}
        className="w-96 font-bold uppercase tracking-wider"
        icon={
          variant?.purchasable ? (
            isPending ? (
              <MoreHorizontal className="h-6 w-6 text-pampas-100" />
            ) : (
              <Plus className="h-6 w-6 text-pampas-100" />
            )
          ) : (
            <Ban className="h-6 w-6 text-pampas-100" />
          )
        }
      >
        {variant?.purchasable
          ? selectedVariantId
            ? 'Add to Cart'
            : 'Select a size'
          : 'Out Of Stock'}
      </Button>
    </div>
  );
};
