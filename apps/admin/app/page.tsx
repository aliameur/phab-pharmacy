'use client';

import { useRouter } from 'next/navigation';

export default function Index() {
  const router = useRouter();

  if (localStorage.getItem('apiToken')) {
    router.push('/products');
  } else {
    router.push('/login');
  }
}
