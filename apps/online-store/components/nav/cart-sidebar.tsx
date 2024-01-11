'use client';

import { ShoppingCart, X } from 'lucide-react';

import { Sidebar } from '../sidebar';

type TCartSidebar = {
  cart: number;
};

export const CartSidebar = ({ cart }: TCartSidebar) => {
  return (
    <Sidebar
      side="right"
      className="flex flex-col gap-4 bg-mineral-green-600 px-4 py-5 sm:max-w-md"
      outerIcon={({ openSidebar }) => (
        <button
          onClick={openSidebar}
          aria-label="Open cart sidebar"
          className="relative p-2"
        >
          {cart && (
            <div className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-mineral-green-600 text-xs font-medium text-pampas-100">
              {cart}
            </div>
          )}
          <ShoppingCart className="h-6 w-6 text-mineral-green-600" />
        </button>
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
          cart
        </>
      )}
    </Sidebar>
  );
};
