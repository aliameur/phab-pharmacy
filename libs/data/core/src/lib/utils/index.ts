import { MedusaError, ProductCategory } from '../../types';

export const parseCategoryDateFields = (
  category: ProductCategory,
): ProductCategory => {
  return {
    ...category,
    created_at: new Date(category.created_at),
    updated_at: new Date(category.updated_at),
  };
};

export const isMedusaError = (body: object): body is { type: string } => {
  return typeof body === 'object' && body !== null && 'type' in body;
};

export const isNotFoundError = (res: {
  status: number;
  body: object;
}): res is { status: number; body: MedusaError } => {
  return res?.status === 404 && isMedusaError(res.body);
};
