import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import React from 'react';

import CategoryPanel from './CategoryPanel';

interface Props {
    products: PricedProduct[][];
    categories: any[];
}

export default function ProductsViewer({ products, categories } : Props) {

  console.log(products[0]);

  return (
    <div>
        {
            products.map((product, index) => (
                <CategoryPanel products={product} category={categories[index]} />
            ))
        }
    </div>
  );
}
