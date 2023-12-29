import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Sidebar({ isVisible }: { isVisible: boolean }) {
  const [isPartiallyVisible, setIsPartiallyVisible] = useState(false);
  useEffect(() => {
    if (isVisible) {
      setIsPartiallyVisible(true);
    } else {
      setTimeout(() => setIsPartiallyVisible(false), 300);
    }
  }, [isVisible]);

  return (
    <div
      className={`bg-base-100 flex h-screen flex-col justify-between overflow-x-hidden shadow-2xl transition-all duration-300 ease-in-out
          ${isVisible ? 'w-80' : 'w-0'}
        `}
    >
      <ul
        className={`menu bg-base-200 text-base-content h-screen p-4 transition-opacity duration-300
            ${isPartiallyVisible ? 'visible' : 'invisible'}
          `}
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
