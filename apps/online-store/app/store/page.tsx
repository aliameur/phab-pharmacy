import { notFound } from 'next/navigation';

import { getProducts } from '@phab/data-next';
import { ProductGrid } from '@phab/ui/product';

export const metadata = {
  title: 'Store',
};

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
        <div className="flex justify-between pb-8 pt-4"></div>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
