import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  getCategoryByHandle,
  getProductsByCategoryHandle,
} from '@phab/data-next';

type Props = {
  params: { handle: string };
};

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
      <div className="px-4 py-4 md:px-16">
        <div className="grid grid-flow-row grid-cols-3 gap-4">
          {products.map((product) => (
            <Link href={`/products/${product.handle}`} key={product.id} className="relative transition-opacity">
              <div className="absolute left-0 top-0 z-0 aspect-square w-full bg-mineral-green-600" />
              <svg
                className="absolute inset-0 z-10 translate-x-4"
                xmlns="http://www.w3.org/2000/svg"
                width="276"
                height="100%"
                viewBox="0 0 276 351"
                fill="none"
              >
                <path
                  d="M203.361 39.3611L230.444 0H275.222V351H0.777344L203.361 39.3611Z"
                  fill="#BFD0CC"
                />
              </svg>
              <div className="relative z-20 aspect-square overflow-hidden">
                <Image
                  className="object-contain"
                  fill
                  // src={product.thumbnail || ''}
                  src={'/placeholder-product.png'}
                  alt={product.title || ''}
                />
              </div>
              <div className="relative z-30 pb-4 text-center">
                <h4 className="text-lg font-bold text-mineral-green-600">
                  {product.title}
                </h4>
                <p className="text-mineral-green-600">
                  £{' '}
                  {product.variants.reduce((cheapest, variant) =>
                    cheapest.prices[0].amount < variant.prices[0].amount
                      ? cheapest
                      : variant,
                  ).prices[0].amount / 100}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
