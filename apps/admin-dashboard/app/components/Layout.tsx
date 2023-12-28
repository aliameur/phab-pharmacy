import React from 'react';

import Navbar from './Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="container mx-10">{children}</div>
    </div>
  );
}
