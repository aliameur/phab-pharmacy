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

export type MedusaProductByHandleOperation = {
  products: PricedProduct[];
  count: number;
  offset: number;
  limit: number;
};
