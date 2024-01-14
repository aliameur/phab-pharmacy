import Image from 'next/image';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="sidebar bg-base-200 flex h-screen w-0 flex-col justify-between overflow-x-hidden transition-all duration-300 ease-in-out">
      <div
        id="sidebarLogo"
        className="logo sidebar-logo flex h-48 w-full items-center justify-center pt-8"
      >
        <Image
          src="logo.svg"
          alt="PhabPharmacy Logo"
          width={64}
          height={64}
          className="z-50"
          style={{ width: '64px', height: 'auto' }}
        />
      </div>
      <ul
        className="menu text-base-content invisible mt-8 h-screen p-4 transition-opacity duration-300"
        style={{ minWidth: '20rem' }}
      >
        <li key="products">
          <Link href="/products">Products</Link>
        </li>
        <li key="orders">
          <Link href="/orders">Orders</Link>
        </li>
        <li key="inventory">
          <Link href="/inventory">Inventory</Link>
        </li>
        <li key="sales">
          <Link href="/sales">Sales Data</Link>
        </li>
      </ul>
    </div>
  );
}
