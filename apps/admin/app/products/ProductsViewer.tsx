import React from 'react';

import CategoryPanel from './CategoryPanel';
import { Category } from './types';

interface Props {
  categories: Category[];
}

export default function ProductsViewer({ categories }: Props) {
  return (
    <div>
      {categories.map((category) => (
        <CategoryPanel key={category.id} category={category} />
      ))}
    </div>
  );
}
