'use client';

import React, { useState } from 'react';

import EditOrderForm from './EditOrderForm';

interface Order {
  id: number;
  name: string;
  quantity: number;
  address: string;
  status: string;
}

interface OrdersProps {
  orders: Order[];
}

export default function OrdersTable({ orders }: OrdersProps) {
  const [editOrder, setEditOrder] = useState<Order | null>(null);

  const handleEdit = (order: Order) => {
    setEditOrder(order);
  };

  const handleSave = (updatedOrder: Order) => {
    // Update the order in your state or backend here
  };

  return (
    <div className="mx-8">
      <h2 className="mb-4 text-2xl font-semibold">Customer Orders</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Name</th>
            <th>Quantity</th>
            <th>Address</th>
            <th>Status</th>
            <th></th> {/* Header for the ellipsis column */}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="group">
              {' '}
              {/* Added group class for hover */}
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.quantity}</td>
              <td>{order.address}</td>
              <td>
                <span
                  className={`tag ${
                    order.status === 'Pending' ? 'tag-yellow' : 'tag-green'
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="text-right">
                <button
                  className="opacity-0 group-hover:opacity-100"
                  onClick={() => handleEdit(order)}
                >
                  &#8942; {/* HTML code for vertical ellipsis */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editOrder && (
        <EditOrderForm
          order={editOrder}
          onSave={handleSave}
          onClose={() => setEditOrder(null)}
        />
      )}
    </div>
  );
}
