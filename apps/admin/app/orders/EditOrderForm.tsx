'use client';

import {
  useAdminArchiveOrder,
  useAdminCancelOrder,
  useAdminCompleteOrder,
  useAdminOrder,
} from 'medusa-react';
import React, { useEffect, useState } from 'react';

import CapturePayment from './CapturePayment';
import { AddressData, Item, Order } from './types';

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
  const archiveOrder = useAdminArchiveOrder(orderId);
  const cancelOrder = useAdminCancelOrder(orderId);
  const completeOrder = useAdminCompleteOrder(orderId);

  useEffect(() => {
    setStatus(order?.status || 'pending');
  }, [order]);

  if (!order) {
    return null;
  }

  const handleSave = () => {
    if (status === 'pending') {
      onClose();
      return;
    }

    if (status === 'archived') {
      archiveOrder.mutate(void 0, {
        onSuccess: ({ order }) => {
          onClose();
        },
        onError: (err) => {
          console.error(err);
        },
      });
    }
    if (status === 'cancelled') {
      cancelOrder.mutate(void 0, {
        onSuccess: ({ order }) => {
          onClose();
        },
        onError: (err) => {
          console.error(err);
        },
      });
    }
    if (status === 'completed') {
      completeOrder.mutate(void 0, {
        onSuccess: ({ order }) => {
          onClose();
        },
        onError: (err) => {
          console.error(err);
        },
      });
    }
  };

  const formatDateTime = (datetime: Date | undefined) => {
    if (!datetime) return '';

    const date = new Date(datetime);
    return date.toLocaleString();
  };

  const renderAddress = (address: AddressData | undefined) => {
    if (!address) return <span>Not provided</span>;

    return (
      <div className="p-4">
        {address.first_name} {address.last_name}
        <br />
        {address.address_1}
        <br />
        {address.address_2 && (
          <>
            {address.address_2}
            <br />
          </>
        )}
        {address.city}, {address.province} {address.postal_code}
        <br />
        {address.country_code}
        <br />
        {address.phone && (
          <>
            {address.phone}
            <br />
          </>
        )}
      </div>
    );
  };

  const renderItems = (items: Item[] | undefined) => {
    if (!items || items.length === 0) return <span>No items</span>;

    return (
      <table className="table w-full">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: Item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => e.currentTarget === e.target && onClose()}
    >
      <div
        className="mx-auto max-w-md rounded-lg bg-gray-800 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Edit Order Status
          </h2>
        </div>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-300">Order ID:</label>
            <span className="mt-1">{order?.id}</span>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-300">Created At:</label>
            <span className="mt-1">{formatDateTime(order?.created_at)}</span>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-300">Customer Email:</label>
            <span className="mt-1">{order?.email}</span>
          </div>

          <div className="flex flex-col">
            <label className=" text-gray-300">Items:</label>
            {renderItems(order?.items)}
          </div>

          <div className="flex flex-col">
            <label className=" text-gray-300">Delivery Address:</label>
            {renderAddress(orderBase?.shipping_address)}
          </div>

          <div className="flex flex-col">
            <label className=" text-gray-300">
              Payment Status: <span>{order?.payment_status}</span>
            </label>
          </div>

          <div className="flex flex-col">
            {order?.payment_status === 'awaiting' && (
              <CapturePayment orderId={order?.id} />
            )}
          </div>

          <div className="flex flex-col">
            <label className=" text-gray-300">Status:</label>
            <select
              className="form-select mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">pending</option>
              <option value="completed">completed</option>
              <option value="archived">archived</option>
              <option value="cancelled">cancelled</option>
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
