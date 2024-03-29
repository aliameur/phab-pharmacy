'use server';

import Medusa from '@medusajs/medusa-js';
import { QueryClient } from '@tanstack/react-query';

import { env } from '../env.mjs';

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
  baseUrl: env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
  maxRetries: 3,
});

export { queryClient, medusaClient };
