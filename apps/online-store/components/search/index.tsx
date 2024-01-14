'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { Search as SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { InstantSearch } from 'react-instantsearch';

import { SEARCH_INDEX_NAME, searchClient } from '../../lib/medusa';
import { ControlledSearchBox } from './controlled-search-box';
import SearchBoxWrapper from './search-box-wrapper';
import Hits from "./hits";

export const SearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false)
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger aria-label="Open Search Modal" className="p-2">
        <SearchIcon className="h-6 w-6 text-mineral-green-600" />
      </Dialog.Trigger>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 cursor-pointer bg-mineral-green-950/50 backdrop-blur-[10px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="fixed inset-x-0 top-16 z-50 mx-auto"
              >
                <InstantSearch
                  searchClient={searchClient}
                  indexName={SEARCH_INDEX_NAME}
                >
                  <SearchBoxWrapper>
                    {(props) => (
                      <ControlledSearchBox
                        close={close}
                        {...props}
                      />
                    )}
                  </SearchBoxWrapper>
                  <div className="mx-auto w-[50vw] mt-6 min-h-full flex-1">
                    <Hits close={close} />
                  </div>
                </InstantSearch>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
