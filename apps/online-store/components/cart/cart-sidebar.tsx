'use client';

import { LineItem } from '@medusajs/medusa';
import { ShoppingCart, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { TCart } from '@phab/data-core';

import { Button } from '../button';
import { Price } from '../price';
import { Sidebar } from '../sidebar';
import { CartButton } from './cart-button';
import { CartLine } from './cart-line';

type TCartSidebar = {
  cart: TCart | undefined;
};

export const CartSidebar = ({ cart }: TCartSidebar) => {
  const lineItems = cart?.items || [];
  const cartTotal = lineItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  const quantityRef = useRef<number>(cartTotal);
  const [isOpen, setIsOpen] = useState(false); // controlled sidebar to respond to quantityRef

  useEffect(() => {
    // Open cart modal when quantity changes.
    if (cartTotal !== quantityRef.current) {
      // But only if it's not already open (quantity also changes when editing items in cart).
      if (!isOpen) {
        setIsOpen(true);
      }

      // Always update the quantity reference
      quantityRef.current = cartTotal;
    }
  }, [quantityRef, cartTotal, isOpen]);

  return (
    <Sidebar
      controlState={isOpen}
      controlSetter={setIsOpen}
      side="right"
      className="flex flex-col gap-4 bg-mineral-green-600 px-4 py-5 sm:max-w-md"
      outerIcon={({ openSidebar }) => (
        <CartButton total={cartTotal} onClick={openSidebar} />
      )}
    >
      {({ closeSidebar }) => (
        <>
          <button
            onClick={closeSidebar}
            aria-label="Close cart sidebar"
            className="ml-auto p-2 "
          >
            <X className="h-6 w-6 text-pampas-100" />
          </button>
          <h3 className="font-merriweather text-3xl text-pampas-100">Cart</h3>
          {cart?.items.map((item: LineItem) => (
            <CartLine
              onClick={closeSidebar}
              currencyCode={cart.region.currency_code}
              item={item}
              key={item.id}
              quantity={item.quantity}
              id={item.variant_id || item.product_id || ''}
              title={item.title}
              src={item.thumbnail || ''}
              alt={item.title}
            />
          ))}
          {!cart || !cart?.items || cart?.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-8 py-16 text-pampas-100">
              <ShoppingCart className="h-12 w-12" />
              <h4 className="font-merriweather text-2xl">Your Cart is Empty</h4>
            </div>
          ) : null}

          {cart?.total ? (
            <div className="mt-auto">
              <div className="flex items-center justify-between py-4 text-pampas-100">
                <p className="text-pampas-100">Total</p>
                <Price
                  amount={cart.total / 100}
                  currencyCode={cart.region.currency_code}
                  className="text-xl"
                />
              </div>
              <Button className="w-full" variant="light">
                Proceed to Checkout
              </Button>
            </div>
          ) : null}
        </>
      )}
    </Sidebar>
  );
};
