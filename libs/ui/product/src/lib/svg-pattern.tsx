import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react';

export const SVGPattern = forwardRef<
  ComponentRef<'svg'>,
  ComponentPropsWithoutRef<'svg'>
>((props, ref) => {
  return (
    <svg
      ref={ref}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 276 351"
    >
      <path
        fill="#BFD0CC"
        d="M203.361 39.361 230.444 0h45.778v351H.777L203.361 39.361Z"
      />
    </svg>
  );
});
