'use client';

import React, { useState } from 'react';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    console.log(sidebarOpen);
  };

  return (
    <div className="flex">
      <Sidebar isVisible={sidebarOpen} />
      <div className="flex flex-1 flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
