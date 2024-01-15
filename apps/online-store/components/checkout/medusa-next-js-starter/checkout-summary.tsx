'use client';

import { Heading } from '@medusajs/ui';
import ItemsPreviewTemplate from '@modules/cart/templates/preview';
import { useCart } from 'medusa-react';

import { Divider } from '@phab/ui/core';

import CartTotals from './cart-totals';
import DiscountCode from './discount-code';

const CheckoutSummary = () => {
  const { cart } = useCart();

  if (!cart?.id) {
    return null;
  }

  return (
    <div className="small:flex-col small:py-0 small:pr-8 sticky top-0 flex flex-col-reverse gap-y-8 px-4 py-8 ">
      <div className="flex w-full flex-col bg-white">
        <Divider className="small:hidden my-6" />
        <Heading
          level="h2"
          className="text-3xl-regular flex flex-row items-baseline"
        >
          In your Cart
        </Heading>
        <Divider className="my-6" />
        <CartTotals data={cart} />
        <ItemsPreviewTemplate region={cart?.region} items={cart?.items} />
        <div className="my-6">
          <DiscountCode cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
