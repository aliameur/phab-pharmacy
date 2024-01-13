'use client';

import React, { useState } from 'react';

import StockStatusTag from './StockStatusTag';

interface Product {
  id: number;
  name: string;
  quantity: number;
  max_quantity: number;
}

interface Props {
  products: Product[];
  storeLocations: string[];
}

export default function InventoryTable({ products, storeLocations }: Props) {
  const [selectedItems, setSelectedItems] = useState([] as number[]);
  const [location, setLocation] = useState(storeLocations[0]);

  const calculateLevel = (product: Product) => {
    const percentage = (product.quantity / product.max_quantity) * 100;
    if (percentage < 15) return 'Low';
    if (percentage < 20) return 'Medium';
    return 'Normal';
  };

  const selectLowAndMedium = () => {
    const lowAndMediumItems = products
      .filter((product) => {
        const level = calculateLevel(product);
        return level === 'Low' || level === 'Medium';
      })
      .map((product) => product.id);
    setSelectedItems(lowAndMediumItems);
  };

  const placeOrder = () => {
    console.log('Order placed for items:', selectedItems);
  };

  const handleCheckboxChange = (productId: number) => {
    if (selectedItems.includes(productId)) {
      setSelectedItems(selectedItems.filter((id) => id !== productId));
    } else {
      setSelectedItems([...selectedItems, productId]);
    }
  };

  return (
    <div className="mx-8">
      <div className="flex w-48 flex-col">
        <label className="text-gray-700 dark:text-gray-300">
          Select Location
        </label>
        <select
          className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          {storeLocations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedItems.includes(product.id)}
                  onChange={() => handleCheckboxChange(product.id)}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>
                <StockStatusTag level={calculateLevel(product)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-end">
        <button className="btn btn-secondary m-2" onClick={selectLowAndMedium}>
          Select Low & Medium Items
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={placeOrder}
          disabled={selectedItems.length === 0}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
