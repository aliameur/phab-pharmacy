import Link from 'next/link';
import { Suspense } from 'react';

import { getCategories } from '@phab/data-next';

import { Cart } from '../cart';
import { CartButton } from '../cart/cart-button';
import { Logo } from '../logo';
import { SearchModal } from '../search';
import { NavLink } from './link';
import { Menubar } from './menubar';

const featuredLinks = [
  { name: 'Cold and Flu', href: '/categories/cold-and-flu' },
  { name: 'Skin Care', href: '/categories/skin-care' },
  { name: 'Headaches and Pain Relief', href: '/categories/cold-and-flu' },
  { name: 'All Products', href: '/store' },
];

export const Nav = async () => {
  const categories = await getCategories().catch(() => []);
  const categoryLinks = categories
    .map((category) => ({
      name: category.name,
      href: `/categories/${category.handle}`,
    }))
    .concat({ name: 'All Products', href: '/store' });
  return (
    <nav className="relative flex h-20 w-full items-center justify-between px-4 sm:h-24 md:px-16">
      <Menubar className="sm:hidden" links={categoryLinks} />
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-8 sm:static sm:translate-x-0 sm:translate-y-0">
        <Link href="/">
          <Logo />
        </Link>
        {featuredLinks.map((link, i) => (
          <NavLink
            key={link.name}
            href={link.href}
            className={`
              ${i === featuredLinks.length - 1 ? 'sm:block' : 'lg:block'} hidden
            `}
          >
            {link.name}
          </NavLink>
        ))}
      </div>
      <div className="flex items-center gap-8">
        <SearchModal />
        <Suspense fallback={<CartButton />}>
          <Cart />
        </Suspense>
      </div>
    </nav>
  );
};
