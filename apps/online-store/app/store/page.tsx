import { notFound } from 'next/navigation';

import { getProducts } from '@phab/data-next';

import { ProductCard } from '../../components/product-card';
import { getCheapestVariantPriceInCurrency } from '../../lib/utils';

export default async function Page() {
  const products = await getProducts().catch((err) => {
    notFound();
  });

  return (
    <div>
      <div className="bg-pattern flex h-72 w-full items-center justify-center text-pampas-100">
        <h2 className="font-merriweather text-4xl">All Products</h2>
      </div>
      <div className="px-4 py-4 lg:px-16">
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
      </div>
    </div>
  );
}
