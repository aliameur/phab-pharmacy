import { MedusaProductByHandleOperation, TRequestFn } from '../types';

export const getProducts =
  (requestFn: TRequestFn) => async () => {
    const res = await requestFn<MedusaProductByHandleOperation>({
      path: '/products',
    });
    return res.body.products;
  };
