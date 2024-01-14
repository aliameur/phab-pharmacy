'use client';

import { useAdminOrders } from 'medusa-react';
import React, { useState } from 'react';

import EditOrderForm from './EditOrderForm';
import OrderRow from './OrderRow';
import { Order } from './types';

export default function ProductsPage() {
  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const { orders, isLoading } = useAdminOrders({
    expand: 'shipping_address',
    offset: 0,
    limit: 50,
  });

  return (
    <div className="flex items-center justify-center">
      {isLoading ? (
        <div className="">
          <h2 className="fixed text-2xl font-semibold">Customer Orders</h2>
          <div className="">
            <table className="mt-8 table w-full px-8 py-16">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Creation Date</th>
                  <th>Postcode</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto">
                {orders?.map((order) => (
                  <OrderRow
                    key={order.id}
                    order={order}
                    setEditOrder={setEditOrder}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {editOrder && (
            <EditOrderForm
              orderBase={editOrder}
              onClose={() => setEditOrder(null)}
            />
          )}
        </div>
      ) : (
        <div className="text-2xl font-semibold">Loading orders...</div>
      )}
    </div>
  );
}
