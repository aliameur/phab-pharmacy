import { Menu, Search, ShoppingCart } from 'lucide-react';

import { Logo } from '../logo';
import { NavLink } from './link';

export const Nav = () => {
  return (
    <nav className="relative flex h-20 w-full items-center justify-between px-4 sm:h-24 md:px-16">
      <button aria-label="Open navigation sidebar" className="p-2 sm:hidden">
        <Menu className="h-6 w-6 text-mineral-green-600" />
      </button>
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-8 sm:static sm:translate-x-0 sm:translate-y-0">
        <Logo />
        <NavLink className="hidden lg:block" href="/">
          Cold and Flu
        </NavLink>
        <NavLink className="hidden lg:block" href="/">
          Skin Care
        </NavLink>
        <NavLink className="hidden lg:block" href="/">
          Headaches and Pain Relief
        </NavLink>
        <NavLink className="hidden sm:block" href="/">
          All Products
        </NavLink>
      </div>
      <div className="flex items-center gap-8">
        <button aria-label="Search" className="p-2">
          <Search className="h-6 w-6 text-mineral-green-600" />
        </button>
        <button aria-label="Open cart sidebar" className="p-2">
          <ShoppingCart className="h-6 w-6 text-mineral-green-600" />
        </button>
      </div>
    </nav>
  );
};
