import Link from 'next/link';
import React from 'react';

import SidebarToggle from './SidebarToggle';

export default function Navbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  return (
    <div className="navbar bg-base-100 w-full">
      <div className="flex-none pr-2">
        <SidebarToggle onToggle={toggleSidebar} />
      </div>
      <div className="flex-1">
        <div className="btn btn-ghost">
          <img src="logo.svg" alt="PhabPharmacy Logo" className="h-8 w-8" />
          <h1 className="text-2xl font-black">PhabPharmacy</h1>
        </div>
      </div>
      <div className="flex-none">
        <p className="px-8 text-sm">Admin Dashboard</p>
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
