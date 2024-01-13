import React from 'react';

import InventoryTable from './InventoryTable';

export default function ProductsPage() {
  // fetch locations
  const storeLocations = ['Location 1', 'Location 2', 'Location 3']; // Add more locations as needed
  const products = [
    { id: 1, name: 'Product A', quantity: 50, max_quantity: 100 },
    { id: 2, name: 'Product B', quantity: 20, max_quantity: 50 },
    { id: 3, name: 'Product C', quantity: 5, max_quantity: 100 },
    // Add more products as needed
  ];

  return (
    <div className="container mx-auto px-4 py-4">
      <InventoryTable products={products} storeLocations={storeLocations} />
    </div>
  );
}
