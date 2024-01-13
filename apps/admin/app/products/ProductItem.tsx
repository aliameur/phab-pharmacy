'use client';

import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import Image from 'next/image';
import React from 'react';
import { useState } from 'react';

import EditProductForm from './EditProductForm';

interface Props {
  product: PricedProduct;
  category: {
    id: string;
    handle: string;
  };
  allCategories: string[];
}

export default function ProductsViewer({
  product,
  category,
  allCategories,
}: Props) {
  const [isFormOpen, setFormOpen] = useState(false);

  const toggleForm = () => {
    setFormOpen(!isFormOpen);
  };

  return (
    <>
      <div className="carousel-item" onClick={toggleForm}>
        <div className="rounded-lg px-4 pb-8 pt-4 hover:bg-slate-700 hover:shadow-lg">
          {typeof product.thumbnail === 'string' ? (
            <Image
              src={product.thumbnail}
              alt={typeof product.title === 'string' ? product.title : ''}
              width={192}
              height={192}
              className="h-48 w-48 rounded-lg"
            />
          ) : (
            <div className="skeleton h-48 w-48"></div>
          )}
          <div className="flex items-center space-x-2 p-4">
            <span className="truncate">{product.title}</span>
          </div>
        </div>
      </div>
      {isFormOpen && (
        <EditProductForm
          product={product}
          currentCategory={category.handle}
          allCategories={allCategories}
          onClose={toggleForm}
        />
      )}
    </>
  );
}
