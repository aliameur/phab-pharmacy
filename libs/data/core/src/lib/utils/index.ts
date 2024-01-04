import { ProductCategory } from '../../types';

export const parseCategoryDateFields = (
  category: ProductCategory,
): ProductCategory => {
  return {
    ...category,
    created_at: new Date(category.created_at),
    updated_at: new Date(category.updated_at),
  };
};
