'use client';

import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../button';

export const AddToCart = () => {
  const [count, setCount] = useState(1);

  // TODO set the max to ATC at once
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => {
    if (count === 1) return;
    setCount((prev) => prev - 1);
  };
  return (
    <div className="flex gap-4">
      <div className="flex w-28 items-center justify-between rounded-2xl bg-mineral-green-600 px-2 py-2.5 text-pampas-100">
        <button aria-label="Decrease count by one" onClick={decrement}>
          <Minus />
        </button>
        <div className="h-full w-px bg-white/20" />
        <span aria-label={`Count is ${count}`}>{count}</span>
        <div className="h-full w-px bg-white/20" />
        <button aria-label="Increase count by one" onClick={increment}>
          <Plus />
        </button>
      </div>
      <Button className="w-96 font-bold uppercase tracking-wider">
        Add to Cart
      </Button>
    </div>
  );
};
