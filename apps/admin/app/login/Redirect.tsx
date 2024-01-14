'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function RedirectLogin() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem('apiToken')) {
      router.push('/login');
    }
  });
  return <div></div>;
}
