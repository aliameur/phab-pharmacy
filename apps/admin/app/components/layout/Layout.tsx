import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed h-screen w-screen">
      <div className="flex h-full overflow-hidden">
        <div className="relative z-20 h-full">
          <Sidebar />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="fixed right-0 top-0 z-10">
            <Navbar />
          </div>
          <div className="mt-16 flex-1 overflow-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
