import { MedusaProductOperation, TRequestFn } from '../../types';
import { getCategoryByHandle } from '../category/get-category-by-handle';

export const getProductsByCategoryHandle =
  (requestFn: TRequestFn) => async (categoryHandle: string) => {
    const { id } = await getCategoryByHandle(requestFn)(categoryHandle);

    const res = await requestFn<MedusaProductOperation>({
      path: `/products`,
      query: {
        'category_id[]': id,
      },
    });
    return res.body.products;
  };
