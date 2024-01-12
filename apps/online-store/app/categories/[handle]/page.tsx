import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  getCategoryByHandle,
  getProductsByCategoryHandle,
} from '@phab/data-next';

import { ProductGrid } from '../../../components/product-grid';

type Props = {
  params: { handle: string };
};

export async function generateMetadata({
  params: { handle },
}: Props): Promise<Metadata> {
  const { name, description } = await getCategoryByHandle(handle);
  return {
    title: name,
    description: description,
  };
}

export default async function Page({ params: { handle } }: Props) {
  const [category, products] = await Promise.all([
    getCategoryByHandle(handle),
    getProductsByCategoryHandle(handle),
  ]).catch((err) => {
    notFound();
  });
  return (
    <div>
      <div className="bg-pattern flex h-72 w-full items-center justify-center text-pampas-100">
        <h2 className="font-merriweather text-4xl">{category.name}</h2>
      </div>
      <div className="px-4 py-4 lg:px-16">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
