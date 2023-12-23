import { ReactNode } from 'react';

import { Logo } from './logo';

export const Nav = () => {
  return (
    <nav className="h-24 px-16 w-full flex justify-between items-center">
      <div className="items-center gap-8 flex">
        <Logo />
        <NavLink>Cold and Flu</NavLink>
        <NavLink>Skin Care</NavLink>
        <NavLink>Headaches and Pain Relief</NavLink>
        <NavLink>All Products</NavLink>
      </div>
      <div></div>
    </nav>
  );
};

type TNavLink = {
  children: ReactNode;
};
const NavLink = ({ children }: TNavLink) => {
  return (
    <div className="relative px-4 py-2 group text-mineral-green-600">
      {children}
      <div className="transition-all duration-300 origin-center scale-x-0 group-hover:scale-x-100 absolute left-4 right-4 h-0.5 bottom-2 translate-y-full bg-mineral-green-600" />
    </div>
  );
};
