import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { useAdminUpdateProduct } from 'medusa-react';
import Image from 'next/image';
import React, { useState } from 'react';

interface Props {
  product: PricedProduct;
  onClose: () => void;
}

export default function EditProductForm({ product, onClose }: Props) {
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(
    product.description ? product.description : '',
  );
  const [price, setPrice] = useState(product.variants[0].prices[0].amount);
  const [image, setImage] = useState(
    product.thumbnail ? product.thumbnail : '',
  );

  const updateProduct = useAdminUpdateProduct(product.id ? product.id : '');

  const handleSave = () => {
    updateProduct.mutate(
      {
        title: title,
        description: description,
        thumbnail: image,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );

    onClose();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // check image here

    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => e.currentTarget === e.target && onClose()}
    >
      <div
        className="mx-auto max-w-md rounded-lg bg-gray-800 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Edit Product</h2>
        </div>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-300">Name:</label>
            <input
              type="text"
              className="form-input mt-1 block w-full rounded-md border-gray-600 bg-gray-700 px-2 text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-300">Description:</label>
            <textarea
              className="form-textarea mt-1 block w-full rounded-md border-gray-600 bg-gray-700 px-2 text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={description?.toString()}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-300">Price:</label>
            <input
              type="number"
              className="form-input mt-1 block w-full rounded-md border-gray-600 bg-gray-700 px-2 text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={price / 100}
              onChange={(e) => setPrice(parseFloat(e.target.value) * 100)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-300">Image:</label>
            <div>
              {image && (
                <Image src={image} alt="Product" width={100} height={100} />
              )}
              <input
                type="file"
                className="form-input mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <button
            type="button"
            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:border-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onClick={handleSave}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
