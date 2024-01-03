import { MedusaCategoryOperation, TRequestFn } from '../types';

export const getCategoriesList = (requestFn: TRequestFn) => async () => {
  const res = await requestFn<MedusaCategoryOperation>({ method: 'GET', path: '/product-categories' });
  return res.body.product_categories;
};
