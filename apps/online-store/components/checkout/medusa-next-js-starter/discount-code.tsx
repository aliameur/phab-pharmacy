import { InformationCircleSolid } from '@medusajs/icons';
import { Cart } from '@medusajs/medusa';
import { Button, Heading, Label, Text, Tooltip } from '@medusajs/ui';
import { useMutation } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { formatAmount, useCart, useUpdateCart } from 'medusa-react';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@phab/ui/core';

import { medusaClient } from '../../../lib/medusa';

type DiscountFormValues = {
  discount_code: string;
};

type DiscountCodeProps = {
  cart: Omit<Cart, 'refundable_amount' | 'refunded_total'>;
};

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const { id, discounts, gift_cards, region } = cart;
  const { mutate, isLoading } = useUpdateCart(id);
  const { setCart } = useCart();

  const { mutate: removeDiscount } = useMutation(
    (payload: { cartId: string; code: string }) => {
      return medusaClient.carts.deleteDiscount(payload.cartId, payload.code);
    },
  );

  const appliedDiscount = useMemo(() => {
    if (!discounts || !discounts.length) {
      return undefined;
    }

    switch (discounts[0].rule.type) {
      case 'percentage':
        return `${discounts[0].rule.value}%`;
      case 'fixed':
        return `- ${formatAmount({
          amount: discounts[0].rule.value,
          region: region,
        })}`;

      default:
        return 'Free shipping';
    }
  }, [discounts, region]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<DiscountFormValues>({
    mode: 'onSubmit',
  });

  const onApply = (data: DiscountFormValues) => {
    mutate(
      {
        discounts: [{ code: data.discount_code }],
      },
      {
        onSuccess: ({ cart }) => setCart(cart),
        onError: () => {
          checkGiftCard(data.discount_code);
        },
      },
    );
  };

  const checkGiftCard = (code: string) => {
    mutate(
      {
        gift_cards: [
          { code: code },
          ...gift_cards.map((gc) => ({ code: gc.code })),
        ],
      },
      {
        onSuccess: ({ cart }) => setCart(cart),
        onError: () => {
          setError(
            'discount_code',
            {
              message: 'Code is invalid',
            },
            {
              shouldFocus: true,
            },
          );
        },
      },
    );
  };

  const removeGiftCard = (code: string) => {
    mutate(
      {
        gift_cards: [...gift_cards]
          .filter((gc) => gc.code !== code)
          .map((gc) => ({ code: gc.code })),
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart);
        },
      },
    );
  };

  const onRemove = () => {
    removeDiscount(
      { cartId: id, code: discounts[0].code },
      {
        onSuccess: ({ cart }) => {
          setCart(cart);
        },
      },
    );
  };

  return (
    <div className="flex w-full flex-col bg-white">
      <div className="txt-medium">
        {gift_cards.length > 0 && (
          <div className="mb-4 flex flex-col">
            <Heading className="txt-medium">Gift card(s) applied:</Heading>
            {gift_cards?.map((gc) => (
              <div
                className="txt-small-plus flex items-center justify-between"
                key={gc.id}
              >
                <Text className="flex items-baseline gap-x-1">
                  <span>Code: </span>
                  <span className="truncate">{gc.code}</span>
                </Text>
                <Text className="font-semibold">
                  {formatAmount({ region: region, amount: gc.balance })}
                </Text>
                <button
                  className="!background-transparent flex items-center gap-x-2 !border-none"
                  onClick={() => removeGiftCard(gc.code)}
                  disabled={isLoading}
                >
                  <Trash2 size={14} />
                  <span className="sr-only">Remove gift card from order</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {appliedDiscount ? (
          <div className="flex w-full items-center">
            <div className="flex w-full flex-col">
              <Heading className="txt-medium">Discount applied:</Heading>
              <div className="flex w-full max-w-full items-center justify-between">
                <Text className="txt-small-plus flex w-4/5 items-baseline gap-x-1 pr-1">
                  <span>Code:</span>
                  <span className="truncate">{discounts[0].code}</span>
                  <span className="min-w-fit">({appliedDiscount})</span>
                </Text>
                <button
                  className="flex items-center"
                  onClick={onRemove}
                  disabled={isLoading}
                >
                  <Trash2 size={14} />
                  <span className="sr-only">
                    Remove discount code from order
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onApply)} className="w-full">
            <Label className="mb-2 flex gap-x-1">
              Gift card or discount code?
              <Tooltip content="You can add multiple gift cards, but only one discount code.">
                <InformationCircleSolid color="var(--fg-muted)" />
              </Tooltip>
            </Label>
            <div className="flex w-full items-center gap-x-2">
              <Input
                label="Please enter code"
                {...register('discount_code', {
                  required: 'Code is required',
                })}
                // @ts-ignore
                errors={errors}
              />

              <Button
                type="submit"
                variant="secondary"
                className="h-10 !min-h-[0]"
                isLoading={isLoading}
              >
                Apply
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default DiscountCode;
