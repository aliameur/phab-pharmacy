import Medusa from '@medusajs/medusa-js';
import { QueryClient } from '@tanstack/react-query';

const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';
// const MEDUSA_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_API_KEY || '';
// const REVALIDATE_WINDOW =
//   parseInt(process.env.REVALIDATE_WINDOW || '') || 60 * 30; // 30 minutes

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24, // 1 day
      retry: 1,
    },
  },
});

const medusaClient = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 });

export { MEDUSA_BACKEND_URL, queryClient, medusaClient };
