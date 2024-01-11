import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import React from 'react';

import CategoryPanel from './CategoryPanel';

interface CategoryTemporary {
  id: string;
  handle: string;
}

interface Props {
  productsByCategory: PricedProduct[][];
  categories: CategoryTemporary[];
}

export default function ProductsViewer({
  productsByCategory,
  categories,
}: Props) {
  return (
    <div>
      {productsByCategory.map((products, index) =>
        products.length > 0 && !categories[index].handle.includes('hidden') ? (
          <CategoryPanel
            key={categories[index].id}
            products={products}
            category={categories[index]}
          />
        ) : null,
      )}
    </div>
  );
}
