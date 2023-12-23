import { ReactNode } from 'react';

import { Logo } from './logo';

export const Nav = () => {
  return (
    <nav className="flex h-24 w-full items-center justify-between px-16">
      <div className="flex items-center gap-8">
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
    <div className="text-mineral-green-600 group relative px-4 py-2">
      {children}
      <div className="bg-mineral-green-600 absolute bottom-2 left-4 right-4 h-0.5 origin-center translate-y-full scale-x-0 transition-all duration-300 group-hover:scale-x-100" />
    </div>
  );
};
