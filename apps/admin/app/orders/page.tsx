import React from 'react';

import OrdersTable from './OrdersTable';

export default function ProductsPage() {
  // fetch orders
  const orders = [
    {
      id: 1,
      name: 'Order A',
      quantity: 2,
      address: '123 Main St.',
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Order B',
      quantity: 1,
      address: '456 Main St.',
      status: 'Sent',
    },
  ];

  return (
    <div className="container mx-auto my-8">
      <OrdersTable orders={orders} />
    </div>
  );
}
