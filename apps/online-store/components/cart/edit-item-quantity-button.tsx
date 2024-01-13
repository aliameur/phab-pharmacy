import { LineItem } from '@medusajs/medusa';
import clsx from 'clsx';
import { Minus, MoreHorizontal, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { removeCartLineItem, updateCartLineItem } from '@phab/data-next';

export const EditItemQuantityButton = ({
  item,
  type,
}: {
  item: LineItem;
  type: 'plus' | 'minus';
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      aria-label={
        type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'
      }
      onClick={() => {
        startTransition(async () => {
          if (type === 'minus' && item.quantity - 1 === 0) {
            await removeCartLineItem({
              cartId: item.cart_id,
              lineId: item.id || '',
            });
          } else {
            await updateCartLineItem({
              cartId: item.cart_id,
              lineId: item.id || '',
              quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1,
            });
          }
          router.refresh();
        });
      }}
      disabled={isPending}
      className={clsx(
        'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
        {
          'cursor-not-allowed': isPending,
          'ml-auto': type === 'minus',
        },
      )}
    >
      {isPending ? (
        <MoreHorizontal className="text-pampas-100" />
      ) : type === 'plus' ? (
        <Plus className="h-4 w-4 text-pampas-100" />
      ) : (
        <Minus className="h-4 w-4 text-pampas-100" />
      )}
    </button>
  );
};
