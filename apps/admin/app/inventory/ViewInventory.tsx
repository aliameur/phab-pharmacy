'use client';

import { useAdminInventoryItems } from 'medusa-react';
import React, { useState } from 'react';

import EditItemForm from './EditItemForm';
import ItemRow from './ItemRow';
import PlaceOrderForm from './PlaceOrderForm';
import { Item, Location } from './types';

interface Props {
  location: Location;
}

export default function ViewInventory({ location }: Props) {
  const { inventory_items, refetch } = useAdminInventoryItems({
    location_id: location.id,
  });

  const [selectedItems, setSelectedItems] = useState([] as string[]);
  const [isOrderFormVisible, setOrderFormVisible] = useState(false);
  const [isEditFormVisible, setEditFormVisible] = useState(false);
  const [editItem, setEditItem] = useState(null as Item | null);

  const handleCheckboxChange = (product: Item) => {
    const productId = product.variants[0].title;
    if (selectedItems.includes(productId)) {
      setSelectedItems(selectedItems.filter((id) => id !== productId));
    } else {
      setSelectedItems([...selectedItems, productId]);
    }
  };

  const handleEdit = (item: Item) => {
    setEditItem(item);
    setEditFormVisible(true);
  };

  const placeOrder = () => {
    setOrderFormVisible(true);
  };

  return (
    <div>
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Level</th>
            <th>Pending Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {inventory_items?.map((item) => (
            <ItemRow
              key={item.id}
              item={item as unknown as Item}
              handleCheckboxChange={handleCheckboxChange}
              selectedItems={selectedItems}
              handleEdit={handleEdit}
            />
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end">
        <button
          className="btn m-2 bg-amber-900 text-white"
          onClick={placeOrder}
          disabled={selectedItems.length === 0}
        >
          Place Order
        </button>
      </div>

      {isOrderFormVisible && (
        <PlaceOrderForm
          selectedItems={selectedItems}
          items={inventory_items as unknown as Item[]}
          location={location as Location}
          onClose={() => setOrderFormVisible(false)}
        />
      )}
      {isEditFormVisible && (
        <EditItemForm
          item={editItem}
          onClose={() => {
            setEditFormVisible(false);
            setEditItem(null);
            refetch({});
          }}
        />
      )}
    </div>
  );
}
