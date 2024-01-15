import { useStore} from "../../../lib/store-provider";
import { LineItem, Region } from '@medusajs/medusa';
import { Table, Text, clx } from '@medusajs/ui';
import CartItemSelect from "./cart-item-select";
import LineItemOptions from "./line-item-options";
import LineItemPrice from './line-item-price';
import LineItemUnitPrice from '@modules/common/components/line-item-unit-price';
import Trash from '@modules/common/icons/trash';
import Thumbnail from '@modules/products/components/thumbnail';
import Link from 'next/link';

type ItemProps = {
  item: Omit<LineItem, 'beforeInsert'>;
  region: Region;
  type?: 'full' | 'preview';
};

const Item = ({ item, region, type = 'full' }: ItemProps) => {
  const { updateItem, deleteItem } = useStore();
  const { handle } = item.variant.product;

  return (
    <Table.Row className="w-full">
      <Table.Cell className="w-24 p-4 !pl-0">
        <Link
          href={`/products/${handle}`}
          className={clx('flex', {
            'w-16': type === 'preview',
            'small:w-24 w-12': type === 'full',
          })}
        >
          <Thumbnail thumbnail={item.thumbnail} size="square" />
        </Link>
      </Table.Cell>

      <Table.Cell className="text-left">
        <Text className="txt-medium-plus text-ui-fg-base">{item.title}</Text>
        <LineItemOptions variant={item.variant} />
      </Table.Cell>

      {type === 'full' && (
        <Table.Cell>
          <div className="flex gap-2">
            <button
              className="gap-x- flex items-center"
              onClick={() => deleteItem(item.id)}
            >
              <Trash size={18} />
            </button>
            <CartItemSelect
              value={item.quantity}
              onChange={(value) =>
                updateItem({
                  lineId: item.id,
                  quantity: parseInt(value.target.value),
                })
              }
              className="h-10 w-14 p-4"
            >
              {Array.from(
                [
                  ...Array(
                    item.variant.inventory_quantity > 0
                      ? item.variant.inventory_quantity
                      : 10,
                  ),
                ].keys(),
              )
                .slice(0, 10)
                .map((i) => {
                  const value = i + 1;
                  return (
                    <option value={value} key={i}>
                      {value}
                    </option>
                  );
                })}
            </CartItemSelect>
          </div>
        </Table.Cell>
      )}

      {type === 'full' && (
        <Table.Cell className="small:table-cell hidden">
          <LineItemUnitPrice item={item} region={region} style="tight" />
        </Table.Cell>
      )}

      <Table.Cell className="!pr-0">
        <span
          className={clx('!pr-0', {
            'flex h-full flex-col items-end justify-center': type === 'preview',
          })}
        >
          {type === 'preview' && (
            <span className="flex gap-x-1 ">
              <Text className="text-ui-fg-muted">{item.quantity}x </Text>
              <LineItemUnitPrice item={item} region={region} style="tight" />
            </span>
          )}
          <LineItemPrice item={item} region={region} style="tight" />
        </span>
      </Table.Cell>
    </Table.Row>
  );
};

export default Item;
