import { ProductCategory as MedusaProductCategory } from '@medusajs/medusa';
import { LineItem } from '@medusajs/medusa';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { CartDTO } from '@medusajs/types/dist/cart/common';
import {TTestimonial} from "@phab/types";

export type TRequestFn = <T>(options: {
  cache?: RequestCache;
  method?: 'GET' | 'POST' | 'DELETE';
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

export type TCart = CartDTO & {
  items: LineItem[];
  region: {
    id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    name: string;
    currency_code: string;
  };
};

export type MedusaCartOperation = {
  cart: TCart;
};

export type MedusaError = {
  type: string;
  message: string;
};

export type MedusaTestimonialOperation = {
  testimonials: TTestimonial[];
};
