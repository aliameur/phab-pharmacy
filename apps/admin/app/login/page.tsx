'use client';

import { useAdminLogin } from 'medusa-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | string>(null);
  const adminLogin = useAdminLogin();
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('apiToken')) {
      router.push('/products');
    }
  });

  const handleLogin = () => {
    adminLogin.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: ({ user }) => {
          console.log(user);
          localStorage.setItem('apiToken', user.api_token);
          router.push('/products');
        },
        onError: (err) => {
          setError('Login failed. Please check your credentials.');
          console.error(err);
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="mx-auto max-w-md rounded-lg bg-white p-6 dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Login
          </h2>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <form className="space-y-4">
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
              value={email}
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <input
              type="password"
              placeholder="Password"
              value={password}
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </form>
        <button
          onClick={handleLogin}
          type="button"
          className="mt-4 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:border-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          Login
        </button>
      </div>
    </div>
  );
}
