import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

import ProductItem from './ProductItem';

interface Props {
  products: PricedProduct[];
  category: {
    id: string;
    handle: string;
  };
}

export default function CategoryPanel({ products, category }: Props) {
  return (
    <div className="items-left my-4 flex w-full flex-col bg-white p-4 dark:bg-gray-800 dark:text-white">
      <h1 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
        {category.handle}
      </h1>
      <div className="carousel carousel-center rounded-box space-x-4 p-4">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
