'use server';

import { cookies } from 'next/headers';

import {
  addCartLineItem,
  createCart,
  getCart,
  updateCartLineItem,
} from '@phab/data-next';

export const addItem = async (
  variantId: string | undefined,
): Promise<{
  message?: string;
  cartId: string;
}> => {
  let cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart();
    cartId = cart.id || '';
    cookies().set('cartId', cartId);
  }

  if (!variantId) {
    return { message: 'Missing product variant ID', cartId: cartId };
  }

  try {
    const lineItem = cart.items.find((line) => line.variant_id === variantId);
    if (lineItem) {
      cart = await updateCartLineItem(
        cartId,
        lineItem.id,
        lineItem.quantity + 1,
      );
    } else {
      cart = await addCartLineItem({ cartId, variantId, quantity: 1 });
    }
    return { cartId: cart.id || '' };
  } catch (e) {
    return { message: 'Error adding item to cart', cartId: cartId };
  }
};
