import React from 'react';

import { getCategories, getProductsByCategoryHandle } from '@phab/data-next';

import Layout from '../components/layout/Layout';
import ProductsViewer from '../components/products/ProductsViewer';

export default async function ProductsPage() {
  const categories = await getCategories();
  const productsPromises = categories.map((category) =>
    getProductsByCategoryHandle(category.handle),
  );
  const productsByCategory = await Promise.all(productsPromises);

  return (
    <Layout>
      <ProductsViewer
        productsByCategory={productsByCategory}
        categories={categories}
      />
    </Layout>
  );
}
