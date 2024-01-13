import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="fixed left-0 top-0 z-20 h-full">
        <Sidebar />
      </div>
      <div className="middlecontent ml-0 grid h-full w-full grid-cols-1 transition-all duration-300 ease-in-out">
        <div className="col-span-1">
          <Navbar />
        </div>
        <div className="col-span-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
