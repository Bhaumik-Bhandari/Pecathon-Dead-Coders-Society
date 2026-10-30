
import {
  ArrowDownRight,
  ArrowUpRight,
  Bookmark,
  CalendarDays,
  Check,
  Clock3,
  MoonStar,
  Sparkles,
  Telescope,
} from "lucide-react";

function formatDate(value) {
  if (!value || typeof value !== "string") return "Date to be confirmed";

  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) return value;

  const [, year, month, day] = match;

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    12
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDateRange(start, end) {
  if (!start && !end) return "Date to be confirmed";
  if (!start) return formatDate(end);
  if (!end || start === end) return formatDate(start);

  const startDate = formatDate(start);
  const endDate = formatDate(end);

  const startYear = start.slice(0, 4);
  const endYear = end.slice(0, 4);

  if (startYear === endYear) {
    return `${startDate.replace(`, ${startYear}`, "")} – ${endDate}`;
  }

  return `${startDate} – ${endDate}`;
}

function formatValue(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (Array.isArray(value)) {
    return value.filter(Boolean).join(", ");
  }

  if (typeof value === "object") {
    return null;
  }

  return String(value);
}

function DetailRow({ label, value }) {
  const formatted = formatValue(value);

  if (!formatted) return null;

  return (
    <div className="flex flex-col gap-1 border-b border-white/[0.06] py-3 last:border-b-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <span className="shrink-0 text-[11px] text-[#858C98]">
        {label}
      </span>

      <span className="text-left text-xs leading-5 text-[#D6CCBA] sm:max-w-[65%] sm:text-right">
        {formatted}
      </span>
    </div>
  );
}

export default function EventCard({
  event,
  index = 0,
  saved = false,
  expanded = false,
  onToggleSave,
  onToggleDetails,
  onPlanNight,
}) {
  if (!event) return null;

  const {
    id,
    name,
    description,
    peakStart,
    peakEnd,
    intensity,
    moonlight,
  } = event;

  const category =
    event.category ||
    event.type ||
    event.kind ||
    "Celestial event";

  const bestViewingTime =
    event.bestViewingTime ||
    event.bestTime ||
    event.viewingTime;

  const viewingTips =
    event.viewingTips ||
    event.observingTips ||
    event.notes;

  const extraNotes = Array.isArray(viewingTips)
    ? viewingTips.filter(Boolean)
    : typeof viewingTips === "string"
      ? [viewingTips]
      : [];

  const detailItems = [
    { label: "Best viewing time", value: bestViewingTime },
    { label: "Moonlight", value: moonlight },
    { label: "Intensity", value: intensity },
    {
      label: "Constellation",
      value: event.constellation,
    },
    {
      label: "Peak rate",
      value: event.peakRate || event.zhr,
    },
    {
      label: "Direction",
      value: event.direction,
    },
    {
      label: "Duration",
      value: event.duration,
    },
    {
      label: "Visibility",
      value: event.visibility,
    },
  ];

  const hasExtraDetails =
    detailItems.some((item) => formatValue(item.value)) ||
    extraNotes.length > 0;

  const cardDelay = `${Math.min(index, 8) * 65}ms`;

  return (
    <article
      className="celestial-event-card group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/[0.085] bg-[linear-gradient(145deg,rgba(23,30,42,0.94),rgba(12,17,26,0.98))] p-5 sm:p-5"
      style={{ "--card-delay": cardDelay }}
    >
      {/* Card atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-40 w-40 translate-x-[22%] -translate-y-[28%] rounded-full bg-[#C8A76A]/[0.045] blur-3xl transition duration-500 group-hover:bg-[#C8A76A]/[0.09]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-5 h-16 w-16 rounded-full border border-[#C8A76A]/[0.07] transition-transform duration-700 group-hover:rotate-45 group-hover:scale-110"
      />

      {/* Category and bookmark */}
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-[#C8A76A]/20 bg-[#C8A76A]/[0.07] text-[#D9BC7A] transition duration-300 group-hover:border-[#C8A76A]/35 group-hover:bg-[#C8A76A]/[0.12]">
            <MoonStar size={19} strokeWidth={1.45} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-[9px] font-semibold uppercase tracking-[0.17em] text-[#BDA16D]">
              {category}
            </p>

            <p className="mt-1 text-[10px] text-[#777F8B]">
              Field entry {(index + 1).toString().padStart(2, "0")}
            </p>
          </div>
        </div>

        <button
          type="button"
          className={`celestial-icon-button ${
            saved ? "celestial-icon-button-active" : ""
          }`}
          onClick={() => onToggleSave?.(id)}
          aria-label={
            saved
              ? `Remove ${name} from watchlist`
              : `Save ${name} to watchlist`
          }
          aria-pressed={saved}
          title={saved ? "Remove from watchlist" : "Save to watchlist"}
        >
          {saved ? (
            <Bookmark size={16} fill="currentColor" />
          ) : (
            <Bookmark size={16} />
          )}
        </button>
      </div>

      {/* Event information */}
      <div className="relative mt-6">
        <h3 className="max-w-[90%] font-serif text-[23px] leading-[1.16] tracking-[-0.025em] text-[#F0E5D3] transition-colors duration-300 group-hover:text-[#F7E7C2]">
          {name || "Unnamed celestial event"}
        </h3>

        {description && (
          <p className="mt-3 line-clamp-3 text-[12px] leading-[1.8] text-[#9CA1AC]">
            {description}
          </p>
        )}
      </div>

      {/* Date range */}
      <div className="relative mt-5 flex items-start gap-3 rounded-xl border border-white/[0.055] bg-black/[0.12] px-3.5 py-3">
        <CalendarDays
          size={15}
          className="mt-0.5 shrink-0 text-[#C8A76A]"
        />

        <div className="min-w-0">
          <p className="text-[9px] uppercase tracking-[0.15em] text-[#808794]">
            Peak window
          </p>

          <p className="mt-1 text-xs font-medium leading-5 text-[#E0D2B9]">
            {formatDateRange(peakStart, peakEnd)}
          </p>
        </div>
      </div>

      {/* Event indicators */}
      <div className="relative mt-4 flex flex-wrap gap-2">
        {intensity && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C8A76A]/20 bg-[#C8A76A]/[0.055] px-2.5 py-1.5 text-[10px] text-[#D7C294]">
            <Sparkles size={11} />
            {intensity}
          </span>
        )}

        {moonlight && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.075] bg-white/[0.025] px-2.5 py-1.5 text-[10px] text-[#A9AFB9]">
            <MoonStar size={11} />
            {moonlight}
          </span>
        )}
      </div>

      {/* Expandable field notes */}
      {expanded && (
        <div className="celestial-details-panel relative mt-5 rounded-xl border border-[#C8A76A]/15 bg-[#080D14]/70 px-3.5 py-1">
          <div className="flex items-center gap-2 border-b border-white/[0.06] py-3">
            <Telescope size={14} className="text-[#D5B875]" />

            <h4 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D8C59E]">
              Observer&apos;s field notes
            </h4>
          </div>

          {detailItems.map((item) => (
            <DetailRow
              key={item.label}
              label={item.label}
              value={item.value}
            />
          ))}

          {extraNotes.length > 0 && (
            <div className="border-t border-white/[0.06] py-3">
              <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-[#858C98]">
                Observing notes
              </p>

              <ul className="space-y-2">
                {extraNotes.map((note, noteIndex) => (
                  <li
                    key={`${String(note)}-${noteIndex}`}
                    className="flex items-start gap-2 text-xs leading-5 text-[#C3B9A8]"
                  >
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#C8A76A]" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!hasExtraDetails && (
            <p className="py-3 text-xs leading-5 text-[#9298A3]">
              Additional observing information has not been provided for
              this event yet.
            </p>
          )}

          {event.source && (
            <a
              href={event.source}
              target="_blank"
              rel="noreferrer"
              className="celestial-source-link mb-3 mt-2"
            >
              View source
              <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="relative mt-auto flex items-center justify-between gap-3 border-t border-white/[0.07] pt-5 mt-5">
        <button
          type="button"
          onClick={() => onToggleDetails?.(id)}
          aria-expanded={expanded}
          className="celestial-text-button"
        >
          {expanded ? "Close field notes" : "Field notes"}

          {expanded ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}
        </button>

        <button
          type="button"
          onClick={() => onPlanNight?.(event)}
          className="celestial-primary-button shrink-0"
        >
          Plan this night
          <ArrowDownRight size={14} />
        </button>
      </div>

      {saved && (
        <div className="pointer-events-none absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#C8A76A]/80 to-transparent" />
      )}

      {saved && (
        <span className="sr-only">
          <Check />
          Saved to your watchlist
        </span>
      )}
    </article>
  );
}
