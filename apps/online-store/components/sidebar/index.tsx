'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';

import { cn } from '../../lib/utils';

type TSidebar = {
  side: 'left' | 'right';
  children: (args: { closeSidebar: () => void }) => ReactNode;
  outerIcon: (args: { openSidebar: () => void }) => ReactNode;
  className?: string;
  controlState?: boolean;
  controlSetter?: Dispatch<SetStateAction<boolean>>;
};

export const Sidebar = forwardRef<HTMLDivElement, TSidebar>(
  (
    { side, children, className, outerIcon, controlSetter, controlState },
    ref,
  ) => {
    const x = side === 'left' ? '-100%' : '100%';
    const sidebarRef = useRef<HTMLDivElement>(null);

    const [internalState, internalSetter] = useState(false);
    const controlled =
      controlState !== undefined && controlSetter !== undefined;
    const [isOpen, setIsOpen] = controlled
      ? [controlState, controlSetter]
      : [internalState, internalSetter];

    const openSidebar = () => setIsOpen(true);
    const closeSidebar = () => setIsOpen(false);

    useEffect(() => {
      function handleOutsideClick(event: globalThis.MouseEvent) {
        if (
          isOpen &&
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target as HTMLElement)
        )
          setIsOpen(false);
      }

      if (isOpen) {
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      } else {
        document.body.style.overflow = 'auto'; // Allow scrolling
      }

      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, [isOpen, setIsOpen]);

    return (
      <>
        {outerIcon({ openSidebar })}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={sidebarRef}
              initial={{ x }}
              animate={{ x: 0, transition: { duration: 0.3 } }}
              exit={{ x, transition: { duration: 0.2 } }}
              className={cn(
                'fixed z-10',
                {
                  'bottom-0 left-0 top-0 w-full': side === 'left',
                  'bottom-0 right-0 top-0 w-screen': side === 'right',
                },
                className,
              )}
            >
              {children({ closeSidebar })}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  },
);

Sidebar.displayName = 'Sidebar';
