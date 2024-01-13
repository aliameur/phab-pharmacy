import { cookies } from 'next/headers';

import { getCart } from '@phab/data-next';

import { CartSidebar } from './cart-sidebar';

export const Cart = async () => {
  const cartId = cookies().get('cartId')?.value;

  let cart;
  if (cartId) {
    cart = await getCart(cartId);
  }
  const res = await fetch('http://localhost:9000/store/carts/cart_0HKWWW41TC3MYTFYVQ7XR9Q17/line-items/asdf', {
    method: "DELETE"
  })
  console.log(await res.json())

  return <CartSidebar cart={cart} />;
};
