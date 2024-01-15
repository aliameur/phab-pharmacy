import { useAdminProducts } from 'medusa-react';

import ProductItem from './ProductItem';
import { Category, Product } from './types';

interface Props {
  category: Category;
}

export default function CategoryPanel({ category }: Props) {
  const { products } = useAdminProducts({ category_id: [category.id] });

  return (
    <div className="items-left mb-8 flex w-full flex-col bg-gray-800 p-4 text-white">
      <h1 className="mb-4 text-4xl font-extrabold text-white">
        {category.name}
      </h1>
      <div className="carousel carousel-center rounded-box space-x-4 p-4">
        {products?.map((product) => (
          <ProductItem
            key={product.id}
            product={product as unknown as Product}
          />
        ))}
      </div>
    </div>
  );
}
