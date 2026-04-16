import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import AppSidebar from "./AppSidebar";
import AppBottomNav from "./AppBottomNav";

const AppShell = ({ children }) => {
  const { pathname } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="h-[100dvh] overflow-hidden bg-[var(--app-bg)]">
      <div className="mx-auto flex h-full max-w-7xl justify-center">
        <div className="relative flex h-full w-full overflow-hidden bg-[var(--bg-main)] shadow-[0_28px_60px_rgba(15,23,42,0.16)]">
          <AppSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          <div className="relative z-10 flex min-h-0 w-full flex-col">
            <div className="shrink-0">
              <Navbar onMenuOpen={() => setIsSidebarOpen(true)} />
            </div>

            <main className="min-h-0 flex-1 overflow-y-auto px-3 pb-20 pt-4 sm:px-5 md:px-6 md:pb-24 lg:px-8">
              {children}
            </main>
          </div>

          <AppBottomNav />
        </div>
      </div>
    </div>
  );
};

export default AppShell;
