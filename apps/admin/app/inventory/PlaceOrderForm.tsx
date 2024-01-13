'use client';

import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  quantity: number;
  max_quantity: number;
}

interface PlaceOrderFormProps {
  selectedItems: number[];
  products: Product[];
  onClose: () => void;
}

export default function PlaceOrderForm({
  selectedItems,
  products,
  onClose,
}: PlaceOrderFormProps) {
  const selectedProducts = products.filter((product) =>
    selectedItems.includes(product.id),
  );
  const [orderQuantities, setOrderQuantities] = useState(
    selectedProducts.map((product) => product.max_quantity - product.quantity),
  );
  const [bankNumber, setBankNumber] = useState('');

  const handleConfirm = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => e.currentTarget === e.target && onClose()}
    >
      <div
        className="mx-auto max-w-md rounded-lg bg-white p-6 dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Edit Order Details
          </h2>
        </div>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700 dark:text-gray-300">
              Bank Account Number:
            </label>
            <input
              type="text"
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              value={bankNumber}
              onChange={(e) => setBankNumber(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 dark:text-gray-300">
              Order Quantities:
            </label>
            {selectedProducts.map((product, index) => (
              <div className="flex items-center" key={product.id}>
                <div className="w-1/2">{product.name}</div>
                <div className="w-1/2">
                  <input
                    type="number"
                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    value={orderQuantities[index]}
                    onChange={(e) => {
                      const newOrderQuantities = [...orderQuantities];
                      newOrderQuantities[index] = Number(e.target.value);
                      setOrderQuantities(newOrderQuantities);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </form>
        <button
          type="button"
          className="mt-4 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:border-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          onClick={handleConfirm}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}
