'use client';

import React, { useState } from 'react';

export default function NewProduct() {
  const [showForm, setShowForm] = useState(false);

  const handleAddProductClick = () => {
    setShowForm(true);
    console.log(showForm);
  };

  return (
    <div className="carousel-item" onClick={handleAddProductClick}>
      <div className="rounded-lg border-2 border-dotted border-slate-700 p-0 hover:bg-slate-700 hover:shadow-lg">
        <div className="flex h-52 w-56 items-center justify-center text-gray-600">
          <p className="text-center hover:text-gray-600">New Product</p>
        </div>
      </div>
    </div>
  );
}
