import { MedusaCartOperation, TRequestFn } from '../../types';

export const createCart = (requestFn: TRequestFn) => async () => {
  const res = await requestFn<MedusaCartOperation>({
    path: '/carts',
    method: 'POST',
    cache: 'no-cache',
  });

  return res.body.cart;
};
