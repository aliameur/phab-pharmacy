import { MedusaCategoryOperation, TRequestFn } from '../types';

export const getCategoryByHandle =
  (requestFn: TRequestFn) => async (handle: string) => {
    const res = await requestFn<MedusaCategoryOperation>({
      path: '/product-categories',
      query: {
        handle,
      },
    });
    if (res.body.count === 0 || res.body.product_categories.length === 0)
      throw new Error('No categories found');
    return res.body.product_categories[0];
  };
