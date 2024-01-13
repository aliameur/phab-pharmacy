import { MedusaProductOperation, TRequestFn } from '../../types';

export const getProductByHandle =
  (requestFn: TRequestFn) => async (handle: string) => {
    const res = await requestFn<MedusaProductOperation>({
      path: '/products',
      query: { handle },
    });
    if (res.body.count === 0 || res.body.products.length === 0)
      throw new Error('No products found');
    return res.body.products[0];
  };
