import { MedusaProductOperation, TRequestFn } from '../../types';

export const getProducts = (requestFn: TRequestFn) => async () => {
  const res = await requestFn<MedusaProductOperation>({
    path: '/products',
  });
  return res.body.products;
};
