import React from 'react';

import { getCategories, getProductsByCategoryHandle } from '@phab/data-next';

import ProductsViewer from './ProductsViewer';

export default async function ProductsPage() {
  const categories = await getCategories();
  const productsPromises = categories.map((category) =>
    getProductsByCategoryHandle(category.handle),
  );
  const productsByCategory = await Promise.all(productsPromises);

  return (
    <ProductsViewer
      productsByCategory={productsByCategory}
      categories={categories}
    />
  );
}
