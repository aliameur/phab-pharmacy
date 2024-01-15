import { useAdminUpdateLocationLevel } from 'medusa-react';
import { useState } from 'react';

import { Item } from './types';

interface Props {
  item: Item | null;
  onClose: () => void;
}

export default function EditItemForm({ item, onClose }: Props) {
  const [quantity, setQuantity] = useState(item?.stocked_quantity || 0);
  const locationitemId = item?.location_levels[0].inventory_item_id || '';
  const stockLocationId = item?.location_levels[0].location_id || '';
  const updateLocationLevel = useAdminUpdateLocationLevel(locationitemId);

  const handleSave = () => {
    updateLocationLevel.mutate(
      {
        stockLocationId,
        stocked_quantity: quantity,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => e.currentTarget === e.target && onClose()}
    >
      <div
        className="max-h-128 mx-auto overflow-y-auto rounded-lg bg-gray-800 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Edit Item Quantity
          </h2>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-200"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className="block w-1/2 rounded-md border-gray-300 px-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
          />
        </div>

        <form className="space-y-4">
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
