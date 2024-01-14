'use client';

import React from 'react';

import { AddressData, Order } from './types';

interface Props {
  order: Order | null;
  setEditOrder: React.Dispatch<React.SetStateAction<Order | null>>;
}

export default function OrderRow({ order, setEditOrder }: Props) {
  if (!order) {
    return null;
  }

  const handleEdit = (order: Order) => {
    setEditOrder(order);
  };

  const get_postcode = (address: AddressData | null) => {
    return address?.postal_code ?? '';
  };

  const parse_date = (datetime: Date | null) => {
    if (datetime) {
      return datetime ? datetime.toString().split('T')[0] : '';
    }
    return '';
  };

  return (
    <tr key={order.id} className="group">
      <td>{order.email ?? ''}</td>
      <td>{parse_date(order.created_at)}</td>
      <td>{get_postcode(order.shipping_address)}</td>
      <td>
        <span
          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
            order.status === 'completed'
              ? 'bg-blue-100 text-blue-800'
              : order.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          }`}
        >
          {order.status ?? ''}
        </span>
      </td>
      <td className="text-right">
        <button
          className="text-xl font-bold opacity-0 group-hover:opacity-100"
          onClick={() => handleEdit(order)}
        >
          &#8942;
        </button>
      </td>
    </tr>
  );
}
