import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    MEDUSA_API_KEY: z.string().min(1),
    REVALIDATE_WINDOW: z.coerce.number()
  },
  client: {
    NEXT_PUBLIC_MEDUSA_BACKEND_URL: z.string().url()
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NEXT_PUBLIC_MEDUSA_BACKEND_URL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
  }
});
