import Link from 'next/link';
import { Suspense } from 'react';

import { getCategories } from '@phab/data-next';
import { CartButton } from '@phab/ui/cart';
import { Cart } from '@phab/ui/cart/server';
import { Logo } from '@phab/ui/core';
import { SearchModal } from '@phab/ui/search';
import { filterHiddenCategories } from '@phab/utils';

import { SEARCH_INDEX_NAME, searchClient } from '../../lib/client';
import { NavLink } from './link';
import { Menubar } from './menubar';

const featuredLinks = [
  { name: 'Cold and Flu', href: '/categories/pcat_cold_flu' },
  { name: 'Skin Care', href: '/categories/pcat_skincare' },
  { name: 'Headaches and Pain Relief', href: '/categories/pcat_headaches_pain_relief' },
  { name: 'All Products', href: '/store' },
];

export const Nav = async () => {
  const categories = await getCategories().catch(() => []);
  const categoryLinks = filterHiddenCategories(categories)
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
        <SearchModal
          searchIndex={SEARCH_INDEX_NAME}
          searchClient={searchClient}
        />
        <Suspense fallback={<CartButton />}>
          <Cart />
        </Suspense>
      </div>
    </nav>
  );
};
