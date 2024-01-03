import { MedusaCategoryOperation, TRequestFn } from '../types';

export const getCategories = (requestFn: TRequestFn) => async () => {
  const res = await requestFn<MedusaCategoryOperation>({
    path: '/product-categories',
  });

  return res.body.product_categories.map((category) => ({
    ...category,
    // ensure date fields are parsed
    created_at: new Date(category.created_at),
    updated_at: new Date(category.updated_at),
  }));
};
