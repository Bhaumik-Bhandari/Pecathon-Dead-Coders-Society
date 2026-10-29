import { NavLink } from "react-router-dom";
import {
  Activity,
  Blocks,
  LayoutDashboard,
  Settings2,
  X,
  CircleHelp,
  Users,
} from "lucide-react";

const navigationGroups = [
  {
    heading: "Workspace",
    links: [
      { label: "Overview", to: "/", icon: LayoutDashboard, end: true },
      { label: "Modules", to: "/modules", icon: Blocks },
      { label: "Activity", to: "/activity", icon: Activity },
    ],
  },
  {
    heading: "Manage",
    links: [
      { label: "Team", to: "/team", icon: Users },
      { label: "Settings", to: "/settings", icon: Settings2 },
      { label: "Help & support", to: "/help", icon: CircleHelp },
    ],
  },
];

export default function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[#101923]/65 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`sidebar-gradient-bg fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-[#d9cfc0]/15 text-white transition-transform duration-300 ease-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Brand */}
        <div className="flex h-[88px] shrink-0 items-center justify-between border-b border-white/10 px-5">
          <div className="flex min-w-0 items-center gap-3.5">
            {/* Team logo */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#D4AE6A]/35 bg-[#F4EBDD] p-1.5 shadow-[0_8px_22px_rgba(0,0,0,0.30)]">
              <img
                src="/images/Logo.jpeg"
                alt="PECATHON team logo"
                className="h-full w-full rounded-xl object-contain"
              />
            </div>

            {/* Team branding */}
            <div className="min-w-0">
              <p className="font-display text-base font-extrabold leading-tight tracking-[0.11em] text-white">
                PECATHON
              </p>

              <p className="mt-1 text-sm font-medium tracking-wide text-slate-400">
                Team Workspace
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Grouped navigation */}
        <nav aria-label="Main navigation" className="sidebar-nav-scroll flex-1 overflow-y-auto px-5 pt-8">
          {navigationGroups.map((group) => (
            <section key={group.heading} className="mb-7">
              <h2 className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.18em] text-[#C7AD91]">
                {group.heading}
              </h2>

              <div className="space-y-1.5">
                {group.links.map(({ label, to, icon: Icon, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `sakura-link group flex w-full items-center gap-3.5 rounded-xl border px-4 py-3.5 text-[15px] font-semibold ${
                        isActive
                          ? "nav-link-active border-[#916344]/70 bg-gradient-to-r from-[#643A39] via-[#45323A] to-[#29313A] text-[#FFF0D7] shadow-[0_5px_20px_rgba(217,76,66,0.14)]"
                          : "border-transparent text-slate-400 hover:border-[#98674F]/70 hover:bg-gradient-to-r hover:from-[#663C3A]/90 hover:via-[#49313B]/75 hover:to-[#303641] hover:text-[#FFF0D7] hover:shadow-[0_5px_18px_rgba(217,76,66,0.12)]"
                      }`
                    }
                  >
                    <span className="nav-link-glint" aria-hidden="true" />

                    <span className="sakura-sweep" aria-hidden="true">
                      {Array.from({ length: 25 }, (_, i) => (
                        <span
                          key={i}
                          className="nav-petal"
                          style={{
                            "--petal-top": `${8 + ((i * 17) % 84)}%`,
                            "--petal-delay": `${i * 35}ms`,
                            "--petal-size": `${6 + (i % 4) * 1.5}px`,
                            "--petal-drift": `${
                              (i % 2 === 0 ? -1 : 1) * (4 + (i % 5) * 2)
                            }px`,
                            "--petal-rotation": `${180 + i * 37}deg`,
                          }}
                        />
                      ))}
                    </span>

                    <Icon
                      size={20}
                      strokeWidth={1.9}
                      className="nav-link-content shrink-0 transition-all duration-200 group-hover:scale-110 group-hover:text-[#F3BF76]"
                    />

                    <span className="nav-link-content flex-1">{label}</span>

                    <span
                      className="nav-link-active-bar"
                      aria-hidden="true"
                    />
                  </NavLink>
                ))}
              </div>
            </section>
          ))}
        </nav>

        {/* Minimal footer */}
        <div className="mt-auto border-t border-white/10 px-5 py-4">
          <p className="text-xs font-semibold tracking-[0.14em] text-slate-500">
            PECATHON <span className="text-[#C7AD91]">·</span> V0.3
          </p>
          <p className="mt-1 text-xs text-slate-500">Crafted for the team.</p>
        </div>
      </aside>
    </>
  );
}
