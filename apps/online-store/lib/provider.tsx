'use client';

import {CartProvider, MedusaProvider} from 'medusa-react';
import {ReactNode} from 'react';

import {env} from '../env.mjs';
import {AccountProvider} from './account-provider';
import {QueryClient} from "@tanstack/react-query";
import {StoreProvider} from './store-provider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24, // 1 day
      retry: 1,
    },
  },
});

export const Provider = ({children}: { children: ReactNode }) => {
  return (
    <MedusaProvider
      baseUrl={env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}
      queryClientProviderProps={{
        client: queryClient,
      }}
    >
      <CartProvider>
        <StoreProvider>
          <AccountProvider>{children}</AccountProvider>
        </StoreProvider>
      </CartProvider>
    </MedusaProvider>
  );
};
