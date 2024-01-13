import Medusa from '@medusajs/medusa-js';
import { QueryClient } from '@tanstack/react-query';
import algoliasearch from 'algoliasearch/lite';

import { env } from '../env.mjs';

const searchClient = algoliasearch(
  env.NEXT_PUBLIC_SEARCH_APP_ID,
  env.NEXT_PUBLIC_SEARCH_API_KEY,
);
const SEARCH_INDEX_NAME = env.NEXT_PUBLIC_INDEX_NAME;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24, // 1 day
      retry: 1,
    },
  },
});

// TODO to replace with backend url when deployed
const medusaClient = new Medusa({
  baseUrl: 'http://localhost:9000',
  maxRetries: 3,
});

export { queryClient, medusaClient, searchClient, SEARCH_INDEX_NAME };
