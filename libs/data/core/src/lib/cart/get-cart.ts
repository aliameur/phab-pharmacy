import { MedusaCartOperation, TRequestFn } from '../../types';
import { isNotFoundError } from '../utils';

export const getCart = (requestFn: TRequestFn) => async (cartId: string) => {
  const res = await requestFn<MedusaCartOperation>({
    path: `/carts/${cartId}`,
    cache: 'no-store',
  });

  if (isNotFoundError(res)) return undefined;

  return res.body.cart;
};
