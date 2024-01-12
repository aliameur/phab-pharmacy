import { LineItem } from '@medusajs/medusa';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';

import { Price } from '../price';
import { DeleteItemButton } from './delete-item-button';
import { EditItemQuantityButton } from './edit-item-quantity-button';

type TCartLine = ComponentProps<typeof Image> & {
  item: LineItem;
  quantity: number;
  id: string;
  title: string;
  src: string;
  alt: string;
  currencyCode: string;
  onClick: () => void;
};

export const CartLine = ({
  quantity,
  id,
  src,
  alt,
  item,
  currencyCode,
  onClick,
}: TCartLine) => {
  return (
    <div className="flex w-full flex-col border-b border-pampas-100">
      <div className="relative flex w-full flex-row justify-between px-1 py-4">
        <Link
          href={`/products/${item.variant.product.handle}`}
          onClick={onClick}
          className="flex"
        >
          <div className="relative">
            <Image
              alt={item.title}
              src={item.thumbnail || ''}
              height={80}
              width={80}
              className="square h-20 w-20 rounded-xl border-2 border-norway-300 object-cover"
            />
            <DeleteItemButton
              item={item}
              className="absolute -right-2 -top-2"
            />
            {/*<button*/}
            {/*  aria-label="Remove cart item"*/}
            {/*  className="absolute -right-2 -top-2"*/}
            {/*>*/}
            {/*  <X className="text-pampas-100" />*/}
            {/*</button>*/}
          </div>
          <div className="px-4">
            <p className="mb-2 text-pampas-100">{item.title}</p>
            {item.variant.title && (
              <p className="text-sm text-pampas-100">{item.variant.title}</p>
            )}
          </div>
        </Link>
        <div className="ml-auto flex flex-col items-end gap-4">
          <Price
            amount={item.total! / 100}
            currencyCode={currencyCode}
            className="text-pampas-100"
          />
          <div className="flex h-9 flex-row items-center rounded-xl border border-pampas-100">
            <EditItemQuantityButton item={item} type="minus" />
            <p className="w-6 text-center">
              <span className="w-full text-sm text-pampas-100">
                {item.quantity}
              </span>
            </p>
            <EditItemQuantityButton item={item} type="plus" />
          </div>
        </div>
      </div>
    </div>
  );
};
