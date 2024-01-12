import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

import { getCheapestVariantPriceInCurrency } from '../lib/utils';
import { ProductCard } from './product-card';

type TProductGrid = {
  products: PricedProduct[];
};

export const ProductGrid = ({ products }: TProductGrid) => {
  return (
    <div className="grid grid-flow-row grid-cols-1 gap-4 min-[488px]:grid-cols-2 md:gap-8 lg:grid-cols-3">
      {products.map((product) => {
        const cheapestPrice = getCheapestVariantPriceInCurrency(
          product.variants,
          'EUR',
        );
        return (
          <ProductCard
            key={product.id}
            href={`/products/${product.handle}`}
            alt={product.title || ''}
            // src={product.thumbnail || ''}
            src="/placeholder-product.png"
            title={product.title || ''}
            price={{
              amount: cheapestPrice?.amount,
              currencyCode: cheapestPrice?.currency_code,
            }}
          />
        );
      })}
    </div>
  );
};
