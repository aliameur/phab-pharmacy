import { MedusaCartOperation, TRequestFn } from '../../types';

export const getCart = (requestFn: TRequestFn) => async (cartId: string) => {
  const res = await requestFn<MedusaCartOperation>({
    path: `/carts/${cartId}`,
    cache: 'no-cache',
  });

  return res.body.cart;
};
