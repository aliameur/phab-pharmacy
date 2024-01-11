import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
