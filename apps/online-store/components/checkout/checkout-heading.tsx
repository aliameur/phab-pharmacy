'use client';

import { Loader2 } from 'lucide-react';
import { useCart } from 'medusa-react';
import React, { useEffect } from 'react';

export const CheckoutHeading = () => {
  const {
    completeCheckout: { isLoading },
  } = useCart();

  useEffect(() => {
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'hidden';
    };
  }, []);

  if (isLoading) {
    return (
      <div className="text-mineral-600 fixed z-[9999] flex h-full w-full flex-col items-center justify-center ">
        <div className="flex flex-col items-center justify-center gap-y-6">
          <div className="flex items-center gap-x-3">
            <Loader2 className="h-10 w-10 animate-spin text-mineral-green-600" />
            <h2 className="text-3xl font-medium">Please wait...</h2>
          </div>
          <p>
            Your order is processing. Do not press back or refresh until your
            order is complete.
          </p>
        </div>
      </div>
    );
  }

  return null;
};
