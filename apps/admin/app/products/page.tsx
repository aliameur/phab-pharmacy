import React from 'react';

import Layout from '../components/layout/Layout';
import ProductsViewer from '../components/products/ProductsViewer';
import { getCategories, getProductsByCategoryHandle } from '@phab/data-next';

export default async function ProductsPage() {

  const categories = await getCategories();
  const productsPromises = categories.map(category => 
    getProductsByCategoryHandle(category.handle)
  );
  const products = await Promise.all(productsPromises);

  return (
    <Layout>
      <ProductsViewer products={products} categories={categories} />
    </Layout>
  );
}
