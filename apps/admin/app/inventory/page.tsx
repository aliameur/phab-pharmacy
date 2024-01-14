'use client';

import { useAdminStockLocations } from 'medusa-react';
import React from 'react';

import RedirectLogin from '../login/Redirect';
import SelectLocation from './SelectLocation';

export default function ProductsPage() {
  const { stock_locations } = useAdminStockLocations();

  return (
    <div className="container mx-auto px-4 py-4">
      <RedirectLogin />
      {stock_locations ? (
        <SelectLocation stock_locations={stock_locations} />
      ) : (
        <div className="text-2xl font-semibold">Loading Locations...</div>
      )}
    </div>
  );
}
