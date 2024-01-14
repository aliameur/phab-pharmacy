import { MedusaCategoryOperation, TRequestFn } from '../../types';
import { parseCategoryDateFields } from '../utils';

export const getCategories = (requestFn: TRequestFn) => async () => {
  const res = await requestFn<MedusaCategoryOperation>({
    path: '/product-categories',
  });

  return res.body.product_categories.map((category) =>
    parseCategoryDateFields(category),
  );
};
