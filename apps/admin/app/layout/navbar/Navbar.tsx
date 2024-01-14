import Image from 'next/image';

import SidebarToggle from './SidebarToggle';
import SignOut from './SignOut';

export default function Navbar() {
  return (
    <div className="navbar bg-base-200 ml-0 h-16 w-full justify-between transition-all duration-300 ease-in-out">
      <div className="flex items-center">
        <div className="navbar-logo px-4">
          <Image
            src="logo.svg"
            alt="PhabPharmacy Logo"
            width={32}
            height={32}
            className="z-50"
          />
        </div>
        <SidebarToggle />
      </div>
      <div className="flex items-center">
        <p className="px-2 text-sm">Admin Dashboard</p>
        <SignOut />
      </div>
    </div>
  );
}
