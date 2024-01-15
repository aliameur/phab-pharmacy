import { Metadata } from 'next';
import Link from 'next/link';

import './global.css';

export const metadata: Metadata = {
  title: '404',
  description: 'Something went wrong',
};

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-10 text-mineral-green-600">
      <h1 className="font-merriweather text-3xl">Page not found</h1>
      <p className="">The page you tried to access does not exist.</p>
      <Link href="/" className="underline">
        Go to homepage
      </Link>
    </div>
  );
}
