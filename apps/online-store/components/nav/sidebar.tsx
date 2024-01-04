'use client';

import { clsx } from 'clsx';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import { Logo } from '../logo';
import { NavLink } from './link';

type TSidebar = {
  className?: string;
};

export const Sidebar = ({ className }: TSidebar) => {
  const [isOpen, setIsOpen] = useState(false);
  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openSidebar}
        aria-label="Open navigation sidebar"
        className={clsx('p-2', className)}
      >
        <Menu className="h-6 w-6 text-mineral-green-600" />
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-10 bg-mineral-green-600 px-4 py-5">
          <button
            onClick={closeSidebar}
            aria-label="Close navigation sidebar"
            className="p-2"
          >
            <X className="h-6 w-6 text-pampas-100" />
          </button>
          <div className="flex flex-col items-center gap-8">
            <Logo />
            <NavLink
              onClick={closeSidebar}
              className="text-pampas-100 *:bg-pampas-100"
              href="/"
            >
              Cold and Flu
            </NavLink>
            <NavLink
              onClick={closeSidebar}
              className="text-pampas-100 *:bg-pampas-100"
              href="/"
            >
              Skin Care
            </NavLink>
            <NavLink
              onClick={closeSidebar}
              className="text-pampas-100 *:bg-pampas-100"
              href="/"
            >
              Headaches and Pain Relief
            </NavLink>
            <NavLink
              onClick={closeSidebar}
              className="text-pampas-100 *:bg-pampas-100"
              href="/"
            >
              All Products
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};
