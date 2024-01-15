'use client';

import StockStatusTag from './StockStatusTag';
import { Item } from './types';

interface Props {
  item: Item | null;
  handleCheckboxChange: (productId: string) => void;
  selectedItems: string[];
}

export default function ItemRow({
  item,
  handleCheckboxChange,
  selectedItems,
}: Props) {
  if (!item) {
    return null;
  }

  const inventory_quantity = item.variants[0].inventory_quantity;
  const max_quantity = item.variants[0].metadata.MaxStock || 1;
  const pending_quantity = 0; // TODO: Add pending quantity
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
          checked={selectedItems.includes(item.id)}
          onChange={() => handleCheckboxChange(item.id)}
        />
      </td>
      <td>{item.variants[0].title}</td>
      <td>{inventory_quantity}</td>
      <td>{pending_quantity}</td>
      <td>
        <StockStatusTag level={calculateLevel(item)} />
      </td>
    </tr>
  );
}
