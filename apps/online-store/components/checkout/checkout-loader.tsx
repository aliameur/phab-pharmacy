'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

import { useCheckout } from '../../lib/checkout-provider';

export const CheckoutLoader = () => {
  const { isLoading } = useCheckout();

  return (
    <Dialog.Root open={isLoading}>
      <AnimatePresence>
        {isLoading && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 cursor-pointer bg-mineral-green-950/20 backdrop-blur-[10px]"
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
                className="fixed inset-0 z-50 mx-auto flex items-center justify-center"
              >
                <Loader2 className="h-10 w-10 animate-spin text-mineral-green-600" />
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
