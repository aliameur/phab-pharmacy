'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import FetchProducts from './FetchProducts';

export default function ProductsPage() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem('apiToken')) {
      router.push('/login');
    }
  });

  return <FetchProducts />;
}
