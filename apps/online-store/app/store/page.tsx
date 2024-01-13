import { notFound } from 'next/navigation';

import { getProducts } from '@phab/data-next';
import { ProductGrid } from '@phab/ui/product';

import { Search } from '../../sections/hero/search';

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
        <Search className="w-1/2" />
      </div>
      <div className="px-4 py-4 lg:px-16">
        <div className="flex justify-between pb-8 pt-4">
          <div className="text-mineral-green-600">
            <p className="text-xl">
              Search results for &quot;search term&quot;
            </p>
            <p className="text-sm">
              Found 3 results for &quot;search term&quot;
            </p>
          </div>
          <div className="flex gap-4 ">
            <button className="cursor-not-allowed bg-mineral-green-600 px-4 py-2 text-pampas-100">
              Low to High
            </button>
            <button className="cursor-not-allowed bg-mineral-green-600 px-4 py-2 text-pampas-100">
              High to Low
            </button>
            <button className="cursor-not-allowed bg-mineral-green-600 px-4 py-2 text-pampas-100">
              Rating
            </button>
          </div>
        </div>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
