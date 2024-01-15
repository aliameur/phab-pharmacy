import { ReactNode } from 'react';

import { Footer } from '../../components/footer';
import { Nav } from '../../components/nav';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
