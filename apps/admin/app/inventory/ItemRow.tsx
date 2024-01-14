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
      <td></td>
      <td></td>
      <td></td>
      <td>
        <StockStatusTag level="Normal" />
      </td>
    </tr>
  );
}
