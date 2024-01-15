'use client';

import { useAdminProductCategories } from 'medusa-react';
import React from 'react';

import RedirectLogin from '../login/Redirect';
import ProductsViewer from './ProductsViewer';
import { Category } from './types';

export default function ProductsPage() {
  const { product_categories } = useAdminProductCategories();

  return (
    <div>
      <RedirectLogin />
      {product_categories && (
        <ProductsViewer categories={product_categories as Category[]} />
      )}
    </div>
  );
}
