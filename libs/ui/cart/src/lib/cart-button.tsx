import { ShoppingCart } from 'lucide-react';
import React from 'react';

type TCartButton = {
  total?: number;
  onClick?: () => void;
};

export const CartButton = ({ total, onClick }: TCartButton) => {
  return (
    <button
      onClick={onClick}
      aria-label="Open cart sidebar"
      className="relative p-2"
    >
      {total ? (
        <div className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-mineral-green-600 text-xs font-medium text-pampas-100">
          {total}
        </div>
      ) : null}
      <ShoppingCart className="h-6 w-6 text-mineral-green-600" />
    </button>
  );
};
