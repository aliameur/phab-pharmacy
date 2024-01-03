import { MedusaProductByHandleOperation, TRequestFn } from '../types';

export const getProductByHandle =
  (requestFn: TRequestFn) => async (handle: string) => {
    const res = await requestFn<MedusaProductByHandleOperation>({
      path: '/products',
      query: { handle },
    });
    return res.body.products[0];
  };
