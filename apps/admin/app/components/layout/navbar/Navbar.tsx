import SidebarToggle from './SidebarToggle';
import ThemeButton from './ThemeButton';

export default function Navbar() {
  return (
    <div className={`navbar bg-base-100 h-16 w-full`}>
      <div className="flex-1">
        <div className="px-4">
          <img src="logo.svg" alt="PhabPharmacy Logo" className="h-8 w-8" />
        </div>
        <SidebarToggle />
      </div>

      <div className="flex-none">
        <p className="px-2 text-sm">Admin Dashboard</p>
        <ThemeButton />
      </div>
    </div>
  );
}
