import React from 'react';

import SidebarTransition from '../sidebar/SidebarTransition';

export default function SidebarToggle() {
  return (
    <label className="btn btn-square btn-ghost swap swap-rotate">
      <input type="checkbox" onClick={SidebarTransition} />
      <svg
        className="swap-off h-7 w-7 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
      </svg>
      <svg
        className="swap-on h-7 w-7 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
      </svg>
    </label>
  );
}
