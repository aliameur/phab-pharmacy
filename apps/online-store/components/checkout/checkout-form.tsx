'use client';

import { useCart } from 'medusa-react';

import Addresses from './form/addresses';
import Payment from './medusa-next-js-starter/payment';
import Review from './medusa-next-js-starter/review';
import Shipping from './medusa-next-js-starter/shipping';

const CheckoutForm = () => {
  const { cart } = useCart();

  if (!cart?.id) {
    return null;
  }

  return (
    <div>
      <div className="grid w-full grid-cols-1 gap-y-8">
        <div>
          <Addresses />
        </div>

        <div>
          <Shipping cart={cart} />
        </div>

        <div>
          <Payment />
        </div>

        <div>
          <Review />
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
