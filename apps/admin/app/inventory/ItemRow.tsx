'use client';

import StockStatusTag from './StockStatusTag';
import { Item } from './types';

interface Props {
  item: Item | null;
  handleCheckboxChange: (item: Item) => void;
  selectedItems: string[];
  handleEdit: (item: Item) => void;
}

export default function ItemRow({
  item,
  handleCheckboxChange,
  selectedItems,
  handleEdit,
}: Props) {
  if (!item) {
    return null;
  }

  const inventory_quantity = item.stocked_quantity;
  const max_quantity = item.variants[0].metadata.MaxStock || 1;
  const pending_quantity = 0; // TODO: Add pending quantity from active orders
  const calculateLevel = (item: Item) => {
    const percentage = (inventory_quantity / max_quantity) * 100;
    if (percentage < 15) return 'Low';
    if (percentage < 20) return 'Medium';
    return 'Normal';
  };

  return (
    <tr key={item.id}>
      <td>
        <input
          type="checkbox"
          className="checkbox"
          checked={selectedItems.includes(item.variants[0].title)}
          onChange={() => handleCheckboxChange(item)}
        />
      </td>
      <td>{item.variants[0].title}</td>
      <td>{inventory_quantity}</td>

      <td>
        <StockStatusTag level={calculateLevel(item)} />
      </td>
      <td>{pending_quantity}</td>
      <td>
        <button className="text-xl font-bold" onClick={() => handleEdit(item)}>
          &#8942;
        </button>
      </td>
    </tr>
  );
}
