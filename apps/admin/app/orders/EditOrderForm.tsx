'use client';

import { useAdminOrder } from 'medusa-react';
import React, { useState } from 'react';

import { Order } from './types';

interface Props {
  orderBase: Order | null;
  onClose: () => void;
}

export default function EditOrderForm({ orderBase, onClose }: Props) {
  const defaultStatus = orderBase ? orderBase.status || 'pending' : 'pending';
  const orderId = orderBase ? orderBase.id : '';

  const [status, setStatus] = useState(defaultStatus);
  const { order } = useAdminOrder(orderId, {
    expand: 'items',
  });

  console.log(order);

  const handleSave = () => {
    console.log(status); // medusa post to update status
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
            Edit Order Status
          </h2>
        </div>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700 dark:text-gray-300">Status:</label>
            <select
              className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">pending</option>
              <option value="Completed">completed</option>
              <option value="Cancelled">cancelled</option>
            </select>
          </div>

          <button
            type="button"
            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:border-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onClick={handleSave}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
