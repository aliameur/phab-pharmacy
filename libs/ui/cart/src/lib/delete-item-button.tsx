import { LineItem } from '@medusajs/medusa';
import { MoreHorizontal, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { removeCartLineItem } from '@phab/data-next';
import { cn } from '@phab/ui/core';

type DeleteItemButton = {
  item: LineItem;
  className?: string;
};

export const DeleteItemButton = ({ item, className }: DeleteItemButton) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      aria-label="Remove cart item"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        startTransition(async () => {
          await removeCartLineItem({
            cartId: item.cart_id,
            lineId: item.id || '',
          });
          router.refresh();
        });
      }}
      disabled={isPending}
      className={cn(
        'flex h-5 w-5 items-center justify-center rounded-full bg-norway-300 p-0.5',
        {
          'cursor-not-allowed': isPending,
        },
        className,
      )}
    >
      {isPending ? (
        <MoreHorizontal className="text-pampas-100" />
      ) : (
        <X className="h-4 w-4 text-pampas-100" />
      )}
    </button>
  );
};
