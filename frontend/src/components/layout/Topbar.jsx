import { Menu, Bell } from "lucide-react";

export default function Topbar({ activePage, onMenuClick }) {
  return (
    <header className="topbar-blend sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#E7E6E1] bg-[#F7F7F5]/90 px-4 backdrop-blur-xl sm:px-7 lg:px-10">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation"
          onClick={onMenuClick}
          className="rounded-xl border border-[#E7E6E1] bg-white p-2.5 text-[#526171] transition hover:bg-[#F2EFE8] md:hidden"
        >
          <Menu size={18} />
        </button>

        <div className="min-w-0">
          <p className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9A8A73] sm:block">
            PECATHON / WORKSPACE
          </p>

          <p className="truncate text-sm font-semibold text-[#263342] sm:mt-1">
            {activePage}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden items-center gap-2 rounded-full border border-[#E7E6E1] bg-white px-3 py-2 sm:flex">
          <span className="h-2 w-2 rounded-full bg-[#D9A34B]" />
          <span className="text-xs font-medium text-[#6E7782]">
            Problem statement pending
          </span>
        </div>

        <button
          type="button"
          aria-label="Notification status"
          title="No new notifications"
          className="relative rounded-xl p-2.5 text-[#7A8490] transition hover:bg-white hover:text-[#263342]"
        >
          <Bell size={19} strokeWidth={1.8} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#D94C42]" />
        </button>

        <div
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5D3B3] bg-[#F2E5CE] text-xs font-bold text-[#75542B]"
          title="Team workspace"
        >
          DCS
        </div>
      </div>
    </header>
  );
}