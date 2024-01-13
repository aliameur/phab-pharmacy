'use client';

import { clsx } from 'clsx';
import { Variants, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

import { Logo, Sidebar } from '@phab/ui/core';

import { NavLink } from './link';

type TMenubar = {
  className?: string;
  links: { name: string; href: string }[];
};

const listVariants: Variants = {
  hidden: {
    opacity: 0,
    y: '-50%',
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

export const Menubar = ({ className, links }: TMenubar) => {
  return (
    <Sidebar
      side="left"
      className="flex flex-col gap-4 bg-mineral-green-600 px-4 py-5"
      outerIcon={({ openSidebar }) => (
        <button
          onClick={openSidebar}
          aria-label="Open navigation sidebar"
          className={clsx('mr-auto p-2', className)}
        >
          <Menu className="h-6 w-6 text-mineral-green-600" />
        </button>
      )}
    >
      {({ closeSidebar }) => (
        <>
          <button
            onClick={closeSidebar}
            aria-label="Close navigation sidebar"
            className="p-2"
          >
            <X className="h-6 w-6 text-pampas-100" />
          </button>
          <motion.div
            initial="hidden"
            animate="show"
            transition={{
              staggerChildren: 0.2,
              delayChildren: 0.2,
            }}
            className="flex flex-col items-center gap-8"
          >
            <motion.div variants={listVariants}>
              <Link
                onClick={closeSidebar}
                href="/"
                aria-label="Go to home page"
              >
                <Logo />
              </Link>
            </motion.div>
            {links.map(({ name, href }) => (
              <motion.div variants={listVariants} key={name}>
                <NavLink
                  onClick={closeSidebar}
                  className="text-pampas-100 *:bg-pampas-100"
                  href={href}
                >
                  {name}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </Sidebar>
  );
};
