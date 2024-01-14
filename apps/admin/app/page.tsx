'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('apiToken')) {
      router.push('/products');
    } else {
      router.push('/login');
    }
  });
}
