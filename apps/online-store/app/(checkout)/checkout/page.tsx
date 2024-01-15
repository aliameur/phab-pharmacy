import { ChevronLeft } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

import { Logo } from '@phab/ui/core';

import CheckoutForm from '../../../components/checkout/checkout-form';
import { CheckoutHeading } from '../../../components/checkout/checkout-heading';
import { CheckoutLoader } from '../../../components/checkout/checkout-loader';
import { CheckoutProvider } from '../../../lib/checkout-provider';

export const metadata: Metadata = {
  title: 'Checkout',
};

export default function CheckoutPage() {
  return (
    <CheckoutProvider>
      <div className="relative px-4 pb-16 md:px-16 h-[200vh]">
        <CheckoutHeading />
        <div className="h-24 py-4">
          <nav className="flex h-full items-center justify-between">
            <Link
              href="/"
              className="flex flex-1 basis-0 items-center gap-x-2 text-sm uppercase"
            >
              <ChevronLeft className="text-mineral-green-600" size={32} />
              <span className="hidden text-mineral-green-600 sm:block">
                Back Home
              </span>
            </Link>
            <Link href="/" className="w-20">
              <Logo />
            </Link>
            <div className="flex-1 basis-0" />
          </nav>
        </div>
        <div className="relative">
          <CheckoutLoader />
          <div className="content-container grid grid-cols-1 gap-x-40 py-12 sm:grid-cols-[1fr_416px]">
            <CheckoutForm />
            {/*<CheckoutSummary />*/}
          </div>
        </div>
        <div className="flex w-full items-center justify-center py-4"></div>
      </div>
    </CheckoutProvider>
  );
}
