import { MedusaCartOperation, TRequestFn } from '../../types';
import { isNotFoundError } from '../utils';

type TCheckoutCart = {
  cartId: string;
};

export const checkoutCart =
  (requestFn: TRequestFn) =>
  async ({ cartId }: TCheckoutCart) => {
    const res = await requestFn<MedusaCartOperation>({
      path: `/carts/${cartId}/payment-sessions`,
      method: 'POST',
      cache: 'no-store',
    });

    if (isNotFoundError(res)) throw new Error('Cart not found');

    const res2 = await requestFn<MedusaCartOperation>({
      path: `/carts/${cartId}/payment-session`,
      method: 'POST',
      cache: 'no-store',
      body: {
        provider_id: 'stripe',
      },
    });
    console.log(res2.body);

    return res.body.cart;
  };
