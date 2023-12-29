import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="sidebar bg-base-100 flex h-screen w-0 flex-col justify-between overflow-x-hidden shadow-2xl transition-all duration-300 ease-in-out">
      <ul
        className="menu bg-base-200 text-base-content invisible h-screen p-4 transition-opacity duration-300"
        style={{ minWidth: '20rem' }}
      >
        <li key="products">
          <Link href="/products">Products</Link>
        </li>
        <li key="orders">
          <Link href="/orders">Orders</Link>
        </li>
        <li key="stock">
          <Link href="/stock">Stock</Link>
        </li>
        <li key="sales">
          <Link href="/sales">Sales Data</Link>
        </li>
      </ul>
    </div>
  );
}
