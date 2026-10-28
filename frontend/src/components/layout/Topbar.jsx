
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Bell, ChevronDown, Settings2 } from "lucide-react";

export default function Topbar({ activePage, onMenuClick }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    if (!profileOpen) return;

    function handlePointerDown(event) {
      if (!profileRef.current?.contains(event.target)) {
        setProfileOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setProfileOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [profileOpen]);

  return (
    <header
      className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#d9cfc0]/15 px-4 shadow-[0_8px_24px_rgba(0,0,0,0.18)] sm:px-7 lg:px-10"
      style={{
        backgroundColor: "var(--dashboard-background-color)",
        backgroundImage: "var(--dashboard-background-image)",
      }}
    >
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation"
          onClick={onMenuClick}
          className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-[#B9B2A7] transition hover:bg-white/10 hover:text-[#F2E9DB] md:hidden"
        >
          <Menu size={18} />
        </button>

        <div className="min-w-0">
          <p className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C9A570] sm:block">
            PECATHON / WORKSPACE
          </p>

          <p className="truncate text-sm font-semibold text-[#F2E9DB] sm:mt-1">
            {activePage}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 sm:flex">
          <span className="h-2 w-2 rounded-full bg-[#D9A34B]" />

          <span className="text-xs font-medium text-[#D4CCC0]">
            Problem statement pending
          </span>
        </div>

        <button
          type="button"
          aria-label="Notification status"
          title="No new notifications"
          className="relative rounded-xl p-2.5 text-[#B9B2A7] transition hover:bg-white/10 hover:text-[#F2E9DB]"
        >
          <Bell size={19} strokeWidth={1.8} />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#D94C42]" />
        </button>

        <div ref={profileRef} className="relative">
          <button
            type="button"
            aria-label="Open team profile"
            aria-haspopup="true"
            aria-expanded={profileOpen}
            aria-controls="team-profile-menu"
            onClick={() => setProfileOpen((open) => !open)}
            className="flex items-center gap-1 rounded-full p-1 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9B15D]"
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5D3B3] bg-[#F2E5CE] text-xs font-bold text-[#75542B]"
              title="Team workspace"
            >
              DCS
            </span>

            <ChevronDown
              size={15}
              className={`mr-1 text-[#E9D4B1] transition-transform duration-200 ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div
              id="team-profile-menu"
              className="absolute right-0 top-full z-50 mt-2 w-60 rounded-2xl border border-[#d9cfc0]/15 bg-[#191a1a] p-2 shadow-[0_14px_40px_rgba(0,0,0,0.35)]"
            >
              <div className="px-3 py-2.5">
                <p className="text-sm font-semibold text-[#F2E9DB]">
                  Dead Coders Society
                </p>

                <p className="mt-0.5 text-xs text-[#B9B2A7]">
                  PECathon team workspace
                </p>
              </div>

              <div className="my-1 h-px bg-white/10" />

              <Link
                to="/settings"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-[#D4CCC0] transition hover:bg-white/10 hover:text-[#F2E9DB]"
              >
                <Settings2 size={16} />
                Workspace settings
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

