import { ProductCategory as MedusaProductCategory } from '@medusajs/medusa';
import { LineItem } from '@medusajs/medusa';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { CartDTO } from '@medusajs/types/dist/cart/common';

export type TRequestFn = <T>(options: {
  cache?: RequestCache;
  method?: 'GET' | 'POST';
  headers?: HeadersInit;
  body?: Record<string, string | number>;
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

export type ProductCategory = Omit<
  MedusaProductCategory,
  'products' | 'metadata' | 'is_active' | 'is_internal'
> & {
  // may need to add recursive type for nested categories
  metadata: MedusaProductCategory['metadata'] | null;
};

export type MedusaCategoryOperation = {
  product_categories: ProductCategory[];
  count: number;
  offset: number;
  limit: number;
};

export type MedusaCart = CartDTO & {
  items: LineItem[];
};

export type MedusaCartOperation = {
  cart: MedusaCart;
};

export type MedusaError = {
  type: string;
  message: string;
};
