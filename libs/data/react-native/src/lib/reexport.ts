import * as Core from '@phab/data-core';

import { medusaFetch } from './medusa-fetch';

export const getProducts = Core.getProducts(medusaFetch);
export const getProductByHandle = Core.getProductByHandle(medusaFetch);
export const getCategories = Core.getCategories(medusaFetch);
export const getCategoryByHandle = Core.getCategoryByHandle(medusaFetch);
export const getProductsByCategoryHandle =
  Core.getProductsByCategoryHandle(medusaFetch);
