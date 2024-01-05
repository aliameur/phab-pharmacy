'use client';

import { clsx } from 'clsx';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Logo } from '../logo';
import { NavLink } from './link';
import { SidebarWrapper } from './sidebar-wrapper';

type TSidebar = {
  className?: string;
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

export const Sidebar = ({ className }: TSidebar) => {
  const [isOpen, setIsOpen] = useState(false);
  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = 'auto'; // Allow scrolling
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={openSidebar}
        aria-label="Open navigation sidebar"
        className={clsx('p-2', className)}
      >
        <Menu className="h-6 w-6 text-mineral-green-600" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <SidebarWrapper
            side="left"
            className="flex flex-col gap-4 bg-mineral-green-600 px-4 py-5"
          >
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
              <motion.div variants={listVariants}>
                <NavLink
                  onClick={closeSidebar}
                  className="text-pampas-100 *:bg-pampas-100"
                  href="/"
                >
                  Cold and Flu
                </NavLink>
              </motion.div>
              <motion.div variants={listVariants}>
                <NavLink
                  onClick={closeSidebar}
                  className="text-pampas-100 *:bg-pampas-100"
                  href="/"
                >
                  Skin Care
                </NavLink>
              </motion.div>
              <motion.div variants={listVariants}>
                <NavLink
                  onClick={closeSidebar}
                  className="text-pampas-100 *:bg-pampas-100"
                  href="/"
                >
                  Headaches and Pain Relief
                </NavLink>
              </motion.div>
              <motion.div variants={listVariants}>
                <NavLink
                  onClick={closeSidebar}
                  className="text-pampas-100 *:bg-pampas-100"
                  href="/"
                >
                  All Products
                </NavLink>
              </motion.div>
            </motion.div>
          </SidebarWrapper>
        )}
      </AnimatePresence>
    </>
  );
};
