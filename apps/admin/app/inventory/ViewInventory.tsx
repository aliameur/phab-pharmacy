'use client';

import { useAdminInventoryItems } from 'medusa-react';
import React, { useState } from 'react';

import ItemRow from './ItemRow';
import PlaceOrderForm from './PlaceOrderForm';
import { Item, Location } from './types';

interface Props {
  location: Location;
}

export default function ViewInventory({ location }: Props) {
  const { inventory_items } = useAdminInventoryItems({
    location_id: location.id,
  });

  const [selectedItems, setSelectedItems] = useState([] as string[]);
  const [isOrderFormVisible, setOrderFormVisible] = useState(false);

  const handleCheckboxChange = (productId: string) => {
    if (selectedItems.includes(productId)) {
      setSelectedItems(selectedItems.filter((id) => id !== productId));
    } else {
      setSelectedItems([...selectedItems, productId]);
    }
  };

  console.log(inventory_items);

  return (
    <div>
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Pending Quantity</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {inventory_items?.map((item) => (
            <ItemRow
              key={item.id}
              item={item as Item}
              handleCheckboxChange={handleCheckboxChange}
              selectedItems={selectedItems}
            />
          ))}
        </tbody>
      </table>
      {isOrderFormVisible && (
        <PlaceOrderForm
          selectedItems={selectedItems}
          items={inventory_items as Item[]}
          location={location as Location}
          onClose={() => setOrderFormVisible(false)}
        />
      )}
    </div>
  );
}
