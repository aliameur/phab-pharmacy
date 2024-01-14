import { TProduct } from '@phab/types';

import NewProduct from './NewProduct';
import ProductItem from './ProductItem';

interface Props {
  products: TProduct[];
  category: {
    id: string;
    handle: string;
  };
  allCategories: string[];
}

export default function CategoryPanel({
  products,
  category,
  allCategories,
}: Props) {
  return (
    <div className="items-left mb-8 flex w-full flex-col bg-white p-4 dark:bg-gray-800 dark:text-white">
      <h1 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
        {category.handle}
      </h1>
      <div className="carousel carousel-center rounded-box space-x-4 p-4">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            category={category}
            allCategories={allCategories}
          />
        ))}
        <NewProduct />
      </div>
    </div>
  );
}
