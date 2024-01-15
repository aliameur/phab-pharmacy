import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    MEDUSA_API_KEY: z.string().min(1),
    REVALIDATE_WINDOW: z.coerce.number(),
  },
  client: {
    NEXT_PUBLIC_MEDUSA_BACKEND_URL: z.string().url(),
    NEXT_PUBLIC_SEARCH_APP_ID: z.string().min(1),
    NEXT_PUBLIC_SEARCH_API_KEY: z.string().min(1),
    NEXT_PUBLIC_INDEX_NAME: z.string().min(1),
    NEXT_PUBLIC_STRIPE_KEY: z.string().min(1),
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NEXT_PUBLIC_MEDUSA_BACKEND_URL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
    NEXT_PUBLIC_SEARCH_APP_ID: process.env.NEXT_PUBLIC_SEARCH_APP_ID,
    NEXT_PUBLIC_SEARCH_API_KEY: process.env.NEXT_PUBLIC_SEARCH_API_KEY,
    NEXT_PUBLIC_INDEX_NAME: process.env.NEXT_PUBLIC_INDEX_NAME,
    NEXT_PUBLIC_STRIPE_KEY: process.env.NEXT_PUBLIC_STRIPE_KEY,
  },
});
