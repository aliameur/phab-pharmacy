'use client';

import React, { useState } from 'react';

import { Item, Location } from './types';

interface Props {
  selectedItems: string[];
  items: Item[];
  location: Location;
  onClose: () => void;
}

export default function PlaceOrderForm({
  selectedItems,
  items,
  location,
  onClose,
}: Props) {
  const selectedProducts = items.filter((item) =>
    selectedItems.includes(item.variants[0].title),
  );
  const [orderQuantities, setOrderQuantities] = useState(
    selectedProducts.map(
      (item) =>
        item.variants[0].metadata.MaxStock -
        item.variants[0].inventory_quantity,
    ),
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
        className="mx-auto max-w-md rounded-lg bg-gray-800 px-4 py-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Edit Order Details
          </h2>
        </div>

        <form className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-300">Bank Account Number:</label>
            <input
              type="text"
              className="form-input mt-1 block w-full rounded-md border-gray-600 bg-gray-700 px-2 text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={bankNumber}
              onChange={(e) => setBankNumber(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-300">Delivery Location:</label>
            <input
              type="text"
              className="form-input mt-1 block w-full rounded-md border-gray-600 bg-gray-700 px-2 text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={location.name ? location.name : 'N/A'}
              readOnly
            />
          </div>

          <div className="flex flex-col ">
            <label className="text-gray-300">Order Quantities:</label>
            <div className="max-h-64 overflow-y-auto">
              {selectedProducts.map((item, index) => (
                <div className="flex items-center" key={item.variants[0].id}>
                  <div className="w-1/2">{item.variants[0].title}</div>
                  <div className="w-1/2">
                    <input
                      type="number"
                      className="form-input mt-1 block w-full rounded-md border-gray-600 bg-gray-700 px-2 text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
