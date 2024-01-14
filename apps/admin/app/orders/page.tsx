'use client';

import { useAdminOrders } from 'medusa-react';
import React, { useState } from 'react';

import RedirectLogin from '../login/Redirect';
import EditOrderForm from './EditOrderForm';
import OrderRow from './OrderRow';
import { Order } from './types';

export default function ProductsPage() {
  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const { orders } = useAdminOrders({
    expand: 'shipping_address',
    offset: 0,
    limit: 50,
  });

  return (
    <div>
      <RedirectLogin />
      <div className="w-full p-16">
        {orders ? (
          <div className="my-8">
            <h2 className="text-2xl font-semibold">Customer Orders</h2>
            <div className="my-20">
              <table className="mb-64 table w-full">
                <thead>
                  <tr>
                    <th className="pr-32">Email</th>
                    <th className="pr-16">Creation Date</th>
                    <th className="pr-16">Postcode</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="overflow-y-auto">
                  {orders?.map((order: Order) => (
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
    </div>
  );
}
