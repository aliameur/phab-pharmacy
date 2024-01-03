import { ProductCategory } from '@medusajs/medusa';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

export type TRequestFn = <T>(options: {
  cache?: RequestCache;
  method?: 'GET' | 'POST';
  headers?: HeadersInit;
  body?: string;
  path?: string;
  query?: { [key: string]: string };
  tags?: string[];
  revalidate?: number;
}) => Promise<{
  status: number;
  body: T;
}>;

export type MedusaProductOperation = {
  products: PricedProduct[];
  count: number;
  offset: number;
  limit: number;
};

export type MedusaCategoryOperation = {
  product_categories: ProductCategory[]; // may need to add recursive type for nested categories
  count: number;
  offset: number;
  limit: number;
};
