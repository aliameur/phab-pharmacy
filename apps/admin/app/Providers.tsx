'use client';

import { QueryClient } from '@tanstack/react-query';
import { MedusaProvider } from 'medusa-react';
import React, { useEffect, useState } from 'react';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  const [apiToken, setApiToken] = useState<undefined | string>(undefined);

  useEffect(() => {
    const token = localStorage.getItem('apiToken');

    if (token) {
      setApiToken(token);
      console.log('set api token to: ', token);
    }
  }, []);

  return (
    <MedusaProvider
      queryClientProviderProps={{ client: queryClient }}
      baseUrl="https://phab-pharmacy-backend-ab775283aa48.herokuapp.com"
      apiKey={apiToken}
    >
      {children}
    </MedusaProvider>
  );
}
