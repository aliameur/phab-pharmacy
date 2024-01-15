import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react';

import { cn } from '@phab/utils';

export const SearchInputField = forwardRef<
  ComponentRef<'input'>,
  ComponentPropsWithoutRef<'input'>
>(({ className, placeholder, ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      placeholder="What are you looking for?"
      className={cn(
        'h-full w-full bg-[#F8F6F4] px-6 py-6 text-xl text-mineral-green-600 caret-mineral-green-600 placeholder:text-mineral-green-400 focus:outline-none',
        className,
      )}
    />
  );
});

SearchInputField.displayName = 'SearchInputField';
