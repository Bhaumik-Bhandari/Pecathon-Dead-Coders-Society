
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const pageNames = {
  "/": "Overview",
  "/modules": "Modules",
  "/activity": "Activity",
  "/team": "Team",
  "/settings": "Settings",
  "/help": "Help & support",
};

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const activePage = pageNames[pathname] ?? "Overview";

  return (
    <div className="workspace-shell min-h-screen text-[#F2E9DB]">
      {/* Sidebar retains its own solid navy background */}
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main area stays transparent so the shared gradient shows through */}
      <main className="min-h-screen md:pl-[252px]">
        <Topbar
          activePage={activePage}
          onMenuClick={() => setMobileOpen(true)}
        />

        {/* Keep the spacing, but don't add a solid background here */}
        <div className="mx-auto w-full max-w-[1500px] px-4 py-7 sm:px-7 sm:py-9 lg:px-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
