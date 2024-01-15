import { InformationCircleSolid } from '@medusajs/icons';
import { Cart, Order } from '@medusajs/medusa';
import { Tooltip } from '@medusajs/ui';
import { formatAmount } from 'medusa-react';
import React from 'react';

type CartTotalsProps = {
  data: Omit<Cart, 'refundable_amount' | 'refunded_total'> | Order;
};

const CartTotals: React.FC<CartTotalsProps> = ({ data }) => {
  const {
    subtotal,
    discount_total,
    gift_card_total,
    tax_total,
    shipping_total,
    total,
  } = data;

  const getAmount = (amount: number | null | undefined) => {
    return formatAmount({
      amount: amount || 0,
      region: data.region,
      includeTaxes: false,
    });
  };

  return (
    <div>
      <div className="txt-medium text-ui-fg-subtle flex flex-col gap-y-2 ">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-x-1">
            Subtotal
            <Tooltip content="Cart total excluding shipping and taxes.">
              <InformationCircleSolid color="var(--fg-muted)" />
            </Tooltip>
          </span>
          <span>{getAmount(subtotal)}</span>
        </div>
        {!!discount_total && (
          <div className="flex items-center justify-between">
            <span>Discount</span>
            <span className="text-ui-fg-interactive">
              - {getAmount(discount_total)}
            </span>
          </div>
        )}
        {!!gift_card_total && (
          <div className="flex items-center justify-between">
            <span>Gift card</span>
            <span className="text-ui-fg-interactive">
              - {getAmount(gift_card_total)}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span>{getAmount(shipping_total)}</span>
        </div>
        <div className="flex justify-between">
          <span className="flex items-center gap-x-1 ">Taxes</span>
          <span>{getAmount(tax_total)}</span>
        </div>
      </div>
      <div className="my-4 h-px w-full border-b border-gray-200" />
      <div className="text-ui-fg-base txt-medium mb-2 flex items-center justify-between ">
        <span>Total</span>
        <span className="txt-xlarge-plus">{getAmount(total)}</span>
      </div>
      <div className="mt-4 h-px w-full border-b border-gray-200" />
    </div>
  );
};

export default CartTotals;
