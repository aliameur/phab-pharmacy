import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react';

export const Logo = forwardRef<
  ComponentRef<'svg'>,
  ComponentPropsWithoutRef<'svg'>
>((props, ref) => {
  return (
    <svg
      ref={ref}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={44}
      height={64}
      fill="none"
    >
      <path fill="#AAC3A4" d="M0 17.194h9.507V64H0z" />
      <path
        fill="#557A51"
        d="M17.113 17.194h9.507V64h-9.507zM0 17.194h9.507v15.761H0z"
      />
      <path
        fill="#AAC3A4"
        d="M23.293 32.956v9.552H0v-9.552zM23.293 0v9.552H0V0z"
      />
      <path
        fill="#AAC3A4"
        fillRule="evenodd"
        d="M23.293 42.484c11.352-.378 20.44-9.744 20.44-21.242C43.733 9.744 34.645.378 23.293 0v9.562c6.1.37 10.933 5.458 10.933 11.68 0 6.222-4.833 11.31-10.933 11.68v9.562Z"
        clipRule="evenodd"
      />
    </svg>
  );
});

Logo.displayName = 'Logo';
