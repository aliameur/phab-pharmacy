'use client';

import Image from 'next/image';
import React from 'react';
import { useState } from 'react';

import EditProductForm from './EditProductForm';
import { Product } from './types';

interface Props {
  product: Product;
}

export default function ProductItem({ product }: Props) {
  const [isFormOpen, setFormOpen] = useState(false);

  const toggleForm = () => {
    setFormOpen(!isFormOpen);
  };

  return (
    <div>
      <div className="carousel-item" onClick={toggleForm}>
        <div className="rounded-lg px-4 pb-8 pt-4 hover:bg-slate-700 hover:shadow-lg">
          <div className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-lg">
            {typeof product.thumbnail === 'string' ? (
              <Image
                src={product.thumbnail}
                alt={typeof product.handle === 'string' ? product.handle : ''}
                width={192}
                height={192}
                className="h-48 w-48 object-contain"
              />
            ) : (
              <div className="skeleton h-48 w-48"></div>
            )}
          </div>
          <div className="flex w-48 items-center space-x-2 p-4">
            <span className="truncate">{product.title}</span>
          </div>
        </div>
      </div>
      {isFormOpen && <EditProductForm product={product} onClose={toggleForm} />}
    </div>
  );
}
