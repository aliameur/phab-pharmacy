import { cookies } from 'next/headers';

import { getCart } from '@phab/data-next';

import { CartSidebar } from './cart-sidebar';

export const Cart = async () => {
  const cartId = cookies().get('cartId')?.value;

  let cart;
  if (cartId) {
    cart = await getCart(cartId);
  }

  return <CartSidebar cart={cart} />;
};
