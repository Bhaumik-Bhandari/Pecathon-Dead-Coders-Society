
import {
  Bookmark,
  CalendarDays,
  Check,
  Filter,
  Sparkles,
} from "lucide-react";

const FILTERS = [
  {
    id: "all",
    label: "All events",
    icon: Sparkles,
  },
  {
    id: "upcoming",
    label: "Upcoming",
    icon: CalendarDays,
  },
  {
    id: "favourable",
    label: "Favourable nights",
    icon: Check,
  },
  {
    id: "saved",
    label: "My watchlist",
    icon: Bookmark,
  },
];

export default function EventFilters({
  activeFilter = "all",
  onChange,
  savedCount = 0,
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-[#858C98]">
        <Filter size={13} />
        <span className="text-[9px] font-semibold uppercase tracking-[0.2em]">
          Refine your observations
        </span>
      </div>

      <div
        className="flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filter celestial events"
      >
        {FILTERS.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.id;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onChange?.(filter.id)}
              aria-pressed={isActive}
              className={`celestial-filter inline-flex min-h-[38px] items-center gap-2 rounded-xl px-3 py-2 text-[11px] font-medium ${
                isActive ? "celestial-filter-active" : ""
              }`}
            >
              <Icon
                size={13}
                strokeWidth={isActive ? 2 : 1.7}
                className={
                  isActive
                    ? "text-[#DCC184]"
                    : "text-[#858C98]"
                }
              />

              <span>{filter.label}</span>

              {filter.id === "saved" && savedCount > 0 && (
                <span
                  className={`inline-flex min-w-[19px] items-center justify-center rounded-full px-1.5 py-0.5 text-[9px] ${
                    isActive
                      ? "bg-[#C8A76A]/20 text-[#F0D69A]"
                      : "bg-white/[0.07] text-[#B5B8BF]"
                  }`}
                >
                  {savedCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
