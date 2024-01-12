'use client';

import { ShoppingCart, X } from 'lucide-react';
import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { MedusaCart } from '@phab/data-core';

import { Sidebar } from '../sidebar';

type TCartSidebar = {
  cart: MedusaCart | undefined;
};

export const CartSidebar = ({ cart }: TCartSidebar) => {
  const lineItems = cart?.items || [];
  const cartTotal = lineItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  const quantityRef = useRef<number>(0);
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
        <>
          <button
            onClick={openSidebar}
            aria-label="Open cart sidebar"
            className="relative p-2"
          >
            {cartTotal ? (
              <div className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-mineral-green-600 text-xs font-medium text-pampas-100">
                {cartTotal}
              </div>
            ) : null}
            <ShoppingCart className="h-6 w-6 text-mineral-green-600" />
          </button>
        </>
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
          {cart?.items.map((item) => <div key={item.id}>{item.title}</div>)}
        </>
      )}
    </Sidebar>
  );
};
