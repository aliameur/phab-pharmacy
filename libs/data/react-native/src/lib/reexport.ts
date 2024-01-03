import * as Core from '@phab/data-core';

import { medusaFetch } from './medusa-fetch';

export const getProducts = Core.getProducts(medusaFetch);
export const getProductByHandle = Core.getProductByHandle(medusaFetch);
export const getCategoriesList = Core.getCategoriesList(medusaFetch);
