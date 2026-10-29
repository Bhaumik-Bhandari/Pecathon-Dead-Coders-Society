import MoonPhaseCard from "./MoonPhaseCard.jsx";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bookmark,
  BookmarkCheck,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  ExternalLink,
  Flame,
  MoonStar,
  Search,
  Sparkles,
  Star,
  Telescope,
} from "lucide-react";

const SOURCE_URL = "https://www.imo.net/calendar/";
const WATCHLIST_KEY = "pecathon-celestial-watchlist";

const EVENTS = [
  {
    id: "southern-taurids-2026",
    name: "Southern Taurids",
    category: "Meteor shower",
    peakStart: "2026-11-04",
    peakEnd: "2026-11-05",
    activeStart: "2026-09-20",
    activeEnd: "2026-11-20",
    moonlight: "Favourable",
    moonlightDetail: "Limited lunar interference is expected around the peak.",
    intensity: "Fireball-rich",
    description:
      "A patient observer's shower, known for occasional spectacular fireballs rather than a constant stream of meteors.",
    viewingTip:
      "Choose a dark, open location and let your eyes adapt to the darkness. Watch a broad area of sky instead of staring at one point.",
    source: SOURCE_URL,
  },
  {
    id: "northern-taurids-2026",
    name: "Northern Taurids",
    category: "Meteor shower",
    peakStart: "2026-11-11",
    peakEnd: "2026-11-12",
    activeStart: "2026-10-20",
    activeEnd: "2026-12-10",
    moonlight: "Very favourable",
    moonlightDetail: "Little moonlight interference is expected around the peak.",
    intensity: "Fireball-rich",
    description:
      "The Northern Taurids overlap with the Southern Taurids for part of the season, creating a longer window for patient skywatchers.",
    viewingTip:
      "Give yourself plenty of time. Meteor activity can be quiet for stretches before a bright meteor suddenly crosses the sky.",
    source: SOURCE_URL,
  },
  {
    id: "leonids-2026",
    name: "Leonids",
    category: "Meteor shower",
    peakStart: "2026-11-16",
    peakEnd: "2026-11-17",
    activeStart: "2026-11-06",
    activeEnd: "2026-11-30",
    moonlight: "Mixed",
    moonlightDetail: "Some moonlight may hide the fainter meteors.",
    intensity: "Fast meteors",
    description:
      "Famous for spectacular meteor storms in certain years, the Leonids are associated with debris from comet 55P/Tempel-Tuttle.",
    viewingTip:
      "Plan a comfortable session away from direct lights. Look across the sky rather than only toward the constellation Leo.",
    source: SOURCE_URL,
  },
  {
    id: "geminids-2026",
    name: "Geminids",
    category: "Meteor shower",
    peakStart: "2026-12-13",
    peakEnd: "2026-12-14",
    activeStart: "2026-12-04",
    activeEnd: "2026-12-17",
    moonlight: "Favourable",
    moonlightDetail: "Lunar conditions are generally favourable around the peak.",
    intensity: "Major shower",
    description:
      "One of the year's most dependable major meteor showers, known for bright meteors and a strong display under dark skies.",
    viewingTip:
      "Dress for the cold, bring a reclining chair, and allow a long observing window rather than checking the sky for only a few minutes.",
    source: SOURCE_URL,
  },
  {
    id: "ursids-2026",
    name: "Ursids",
    category: "Meteor shower",
    peakStart: "2026-12-21",
    peakEnd: "2026-12-22",
    activeStart: "2026-12-17",
    activeEnd: "2026-12-26",
    moonlight: "Challenging",
    moonlightDetail: "Bright moonlight may obscure many of the fainter meteors.",
    intensity: "Subtle display",
    description:
      "A smaller northern-sky shower that arrives near the end of December. It rewards observers willing to wait patiently.",
    viewingTip:
      "Seek the darkest practical site and avoid looking directly at the Moon. Check your local forecast before travelling.",
    source: SOURCE_URL,
  },
  {
    id: "quadrantids-2027",
    name: "Quadrantids",
    category: "Meteor shower",
    peakStart: "2027-01-03",
    peakEnd: "2027-01-04",
    activeStart: "2026-12-28",
    activeEnd: "2027-01-12",
    moonlight: "Favourable",
    moonlightDetail: "Lunar conditions are expected to be favourable for the peak.",
    intensity: "Short peak window",
    description:
      "A potentially strong shower with a relatively brief maximum. Timing and local viewing conditions make a real difference.",
    viewingTip:
      "Be ready before the expected peak, choose a location with a clear view of the sky, and keep an eye on the local weather.",
    source: SOURCE_URL,
  },
];

const FILTERS = [
  { id: "all", label: "All sightings" },
  { id: "upcoming", label: "Upcoming" },
  { id: "favourable", label: "Favourable moonlight" },
  { id: "saved", label: "My watchlist" },
];

const STARS = [
  { x: "5%", y: "13%", s: 2, d: "0s" },
  { x: "12%", y: "32%", s: 3, d: "1.4s" },
  { x: "19%", y: "9%", s: 2, d: "2.1s" },
  { x: "27%", y: "22%", s: 2, d: "0.8s" },
  { x: "34%", y: "7%", s: 3, d: "2.8s" },
  { x: "43%", y: "28%", s: 2, d: "1.8s" },
  { x: "52%", y: "11%", s: 3, d: "0.4s" },
  { x: "61%", y: "24%", s: 2, d: "2.4s" },
  { x: "73%", y: "10%", s: 2, d: "1.2s" },
  { x: "84%", y: "19%", s: 3, d: "2.6s" },
  { x: "93%", y: "8%", s: 2, d: "0.6s" },
  { x: "90%", y: "38%", s: 2, d: "1.9s" },
  { x: "69%", y: "44%", s: 2, d: "0.9s" },
  { x: "38%", y: "43%", s: 2, d: "2.3s" },
  { x: "9%", y: "46%", s: 2, d: "1.7s" },
  { x: "96%", y: "56%", s: 2, d: "1.1s" },
];

function parseLocalDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0);
}

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
}

function daysUntil(dateString) {
  const today = startOfToday();
  const target = parseLocalDate(dateString);
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

function formatShortDate(value) {
  return parseLocalDate(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

function formatDateRange(start, end) {
  const first = parseLocalDate(start);
  const last = parseLocalDate(end);

  if (
    first.getMonth() === last.getMonth() &&
    first.getFullYear() === last.getFullYear()
  ) {
    return `${first.getDate()}–${last.getDate()} ${last.toLocaleDateString(
      "en-IN",
      { month: "short", year: "numeric" }
    )}`;
  }

  return `${formatShortDate(start)} – ${last.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}`;
}

function getPeakStatus(event) {
  const start = daysUntil(event.peakStart);
  const end = daysUntil(event.peakEnd);

  if (start <= 0 && end >= 0) {
    return { label: "Peak window", detail: "Happening now", live: true };
  }

  if (start === 1) {
    return { label: "Peak begins", detail: "Tomorrow", live: false };
  }

  if (start > 1) {
    return { label: "Countdown", detail: `${start} days to peak`, live: false };
  }

  return { label: "Peak passed", detail: "See source for updates", live: false };
}

function readWatchlist() {
  try {
    const value = JSON.parse(localStorage.getItem(WATCHLIST_KEY) || "[]");
    return Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function EventStatus({ event }) {
  const status = getPeakStatus(event);

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${
        status.live
          ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-200"
          : "border-[#C8A76A]/20 bg-[#C8A76A]/[0.07] text-[#D8BD87]"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status.live ? "animate-pulse bg-emerald-300" : "bg-[#D8BD87]"
        }`}
      />
      {status.detail}
    </span>
  );
}

function EventCard({ event, index, saved, expanded, onToggleSave, onToggleDetails, onPlanNight }) {
  const status = getPeakStatus(event);

  return (
    <article
      className="celestial-event-card group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/[0.09] bg-[#101722]/90 p-5 sm:p-6"
      style={{ "--card-delay": `${index * 75}ms` }}
    >
      <div className="pointer-events-none absolute -right-16 -top-20 h-44 w-44 rounded-full bg-[#BE9959]/[0.06] blur-3xl transition-all duration-700 group-hover:bg-[#BE9959]/[0.14]" />

      <div className="relative flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#C8A76A]/20 bg-[#C8A76A]/[0.06] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-[#D8BD87]">
          <Flame size={12} />
          {event.intensity}
        </span>

        <button
          type="button"
          onClick={() => onToggleSave(event.id)}
          aria-label={saved ? `Remove ${event.name} from watchlist` : `Save ${event.name}`}
          title={saved ? "Remove from watchlist" : "Save to watchlist"}
          className={`celestial-icon-button ${
            saved ? "celestial-icon-button-active" : ""
          }`}
        >
          {saved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}
        </button>
      </div>

      <div className="relative mt-7 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#D6B36E]/20 bg-gradient-to-br from-[#D6B36E]/15 to-transparent text-[#E5C98B]">
          <Star size={21} strokeWidth={1.5} />
        </div>

        <div className="min-w-0">
          <h3 className="font-serif text-xl tracking-tight text-[#F5ECD9] sm:text-[22px]">
            {event.name}
          </h3>
          <p className="mt-1 text-xs text-[#918F91]">{event.category}</p>
        </div>
      </div>

      <p className="relative mt-4 flex-1 text-[13px] leading-6 text-[#B8BBC2]">
        {event.description}
      </p>

      <div className="relative mt-5 space-y-3 border-t border-white/[0.07] pt-4">
        <div className="flex items-center gap-3 text-xs">
          <CalendarDays size={15} className="shrink-0 text-[#D5B16A]" />
          <span className="text-[#8F96A2]">Peak window</span>
          <span className="ml-auto text-right font-medium text-[#E8DCC1]">
            {formatDateRange(event.peakStart, event.peakEnd)}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <MoonStar size={15} className="shrink-0 text-[#D5B16A]" />
          <span className="text-[#8F96A2]">Moonlight</span>
          <span className="ml-auto text-right font-medium text-[#E8DCC1]">
            {event.moonlight}
          </span>
        </div>
      </div>

      <div className="relative mt-5 flex items-center justify-between gap-2">
        <span
          className={`text-[11px] ${
            status.live ? "text-emerald-200" : "text-[#9297A0]"
          }`}
        >
          {status.label}
        </span>

        <button
          type="button"
          onClick={() => onToggleDetails(event.id)}
          className="celestial-text-button group/link"
        >
          {expanded ? "Close notes" : "Field notes"}
          {expanded ? (
            <ChevronDown size={14} className="rotate-180 transition-transform" />
          ) : (
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          )}
        </button>
      </div>

      {expanded && (
        <div className="celestial-details-panel relative mt-5 rounded-2xl border border-[#C8A76A]/20 bg-[#080D15]/80 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D8BD87]">
            Observer's notes
          </p>
          <p className="mt-2 text-sm leading-6 text-[#C6C7CC]">
            {event.viewingTip}
          </p>

          <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
            <p className="text-[10px] uppercase tracking-[0.14em] text-[#9297A0]">
              Lunar conditions
            </p>
            <p className="mt-1 text-xs leading-5 text-[#D8D5CE]">
              {event.moonlightDetail}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onPlanNight(event)}
              className="celestial-primary-button"
            >
              <Telescope size={15} />
              Plan this night
            </button>

            <a
              href={event.source}
              target="_blank"
              rel="noreferrer"
              className="celestial-source-link"
            >
              Source <ExternalLink size={12} />
            </a>
          </div>
        </div>
      )}
    </article>
  );
}

export default function CelestialScroll({ onPlanNight }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [savedIds, setSavedIds] = useState(readWatchlist);
  const [expandedId, setExpandedId] = useState(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(savedIds));
    } catch {
      // The Scroll remains usable if browser storage is unavailable.
    }
  }, [savedIds]);

  const upcomingEvents = useMemo(
    () =>
      EVENTS.filter((event) => daysUntil(event.peakEnd) >= 0).sort(
        (a, b) => a.peakStart.localeCompare(b.peakStart)
      ),
    []
  );

  const featuredEvent = upcomingEvents[0] || EVENTS[0];

  const filteredEvents = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return upcomingEvents.filter((event) => {
      const matchesQuery =
        !needle ||
        `${event.name} ${event.description} ${event.intensity}`
          .toLowerCase()
          .includes(needle);

      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "upcoming" && daysUntil(event.peakStart) >= 0) ||
        (activeFilter === "favourable" &&
          ["favourable", "very favourable"].includes(
            event.moonlight.toLowerCase()
          )) ||
        (activeFilter === "saved" && savedIds.includes(event.id));

      return matchesQuery && matchesFilter;
    });
  }, [query, activeFilter, savedIds, upcomingEvents]);

  function toggleSave(id) {
    const isSaved = savedIds.includes(id);

    setSavedIds((current) =>
      isSaved ? current.filter((item) => item !== id) : [...current, id]
    );

    setNotice(isSaved ? "Removed from your scroll" : "Added to your scroll");
    window.setTimeout(() => setNotice(""), 2200);
  }

  function toggleDetails(id) {
    setExpandedId((current) => (current === id ? null : id));
  }

  function planNight(event) {
    if (typeof onPlanNight === "function") {
      onPlanNight(event);
      return;
    }

    setNotice(`${event.name} selected for night planning`);
    window.setTimeout(() => setNotice(""), 2600);
  }

  return (
    <section className="celestial-scroll relative isolate w-full overflow-hidden rounded-[28px] border border-[#C8A76A]/20 bg-[#080C14] text-[#F5ECD9] shadow-[0_28px_90px_rgba(0,0,0,0.32)] sm:rounded-[34px]">
      <style>{`
        @keyframes celestial-enter {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes celestial-twinkle {
          0%, 100% { opacity: .24; transform: scale(.8); }
          50% { opacity: .95; transform: scale(1.25); }
        }

        @keyframes celestial-float {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -10px, 0); }
        }

        @keyframes celestial-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes celestial-glow {
          0%, 100% { opacity: .24; }
          50% { opacity: .5; }
        }

        @keyframes celestial-shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .celestial-reveal {
          animation: celestial-enter .75s cubic-bezier(.2,.7,.2,1) both;
        }

        .celestial-event-card {
          animation: celestial-enter .65s cubic-bezier(.2,.7,.2,1) both;
          animation-delay: var(--card-delay, 0ms);
          transition: border-color .35s ease, transform .35s ease, box-shadow .35s ease, background .35s ease;
        }

        .celestial-event-card:hover {
          transform: translateY(-5px);
          border-color: rgba(218,184,112,.42);
          background: linear-gradient(145deg, rgba(24,32,45,.98), rgba(12,18,28,.98));
          box-shadow: 0 22px 55px rgba(0,0,0,.24), 0 0 36px rgba(199,157,77,.055);
        }

        .celestial-star {
          animation: celestial-twinkle 3.5s ease-in-out infinite;
          animation-delay: var(--star-delay, 0s);
        }

        .celestial-icon-button {
          display: inline-flex;
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 13px;
          background: rgba(255,255,255,.025);
          color: #9699a0;
          transition: all .25s ease;
        }

        .celestial-icon-button:hover,
        .celestial-icon-button-active {
          border-color: rgba(218,184,112,.38);
          background: rgba(218,184,112,.10);
          color: #ebcf91;
          transform: translateY(-1px);
        }

        .celestial-text-button {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #e1bf79;
          font-size: 12px;
          font-weight: 600;
          transition: color .25s ease;
        }

        .celestial-text-button:hover {
          color: #ffe8b0;
        }

        .celestial-filter {
          border: 1px solid rgba(255,255,255,.09);
          background: rgba(255,255,255,.025);
          color: #a9adb6;
          transition: background .25s ease, color .25s ease, border-color .25s ease, transform .25s ease;
        }

        .celestial-filter:hover {
          border-color: rgba(218,184,112,.28);
          color: #efe0c3;
          transform: translateY(-1px);
        }

        .celestial-filter-active {
          border-color: rgba(218,184,112,.38);
          background: linear-gradient(110deg, rgba(191,147,67,.18), rgba(191,147,67,.06));
          color: #f1d69b;
          box-shadow: inset 0 0 20px rgba(191,147,67,.025);
        }

        .celestial-primary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid rgba(245,213,148,.28);
          border-radius: 12px;
          background: linear-gradient(110deg, #e0c17d, #b98b43, #e0c17d);
          background-size: 200% 100%;
          padding: 10px 13px;
          color: #17130c;
          font-size: 12px;
          font-weight: 700;
          transition: transform .25s ease, box-shadow .25s ease, background-position .45s ease;
        }

        .celestial-primary-button:hover {
          transform: translateY(-2px);
          background-position: 100% 0;
          box-shadow: 0 8px 24px rgba(190,147,67,.2);
        }

        .celestial-source-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #a8a6a1;
          font-size: 11px;
          transition: color .2s ease;
        }

        .celestial-source-link:hover {
          color: #efd59b;
        }

        .celestial-details-panel {
          animation: celestial-enter .32s ease both;
        }

        .celestial-filter:focus-visible,
        .celestial-icon-button:focus-visible,
        .celestial-primary-button:focus-visible,
        .celestial-text-button:focus-visible,
        .celestial-source-link:focus-visible {
          outline: 2px solid #e4c47f;
          outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          .celestial-scroll *,
          .celestial-scroll *::before,
          .celestial-scroll *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_0%,rgba(155,116,54,0.13),transparent_37%),radial-gradient(ellipse_at_0%_35%,rgba(29,57,86,0.16),transparent_38%)]" />

        {STARS.map((star, index) => (
          <span
            key={`${star.x}-${star.y}`}
            className="celestial-star absolute rounded-full bg-[#f4d99b]"
            style={{
              left: star.x,
              top: star.y,
              width: star.s,
              height: star.s,
              "--star-delay": star.d,
              boxShadow: "0 0 8px rgba(244,217,155,.55)",
            }}
          />
        ))}

        <div
          className="absolute -right-32 top-24 h-[360px] w-[360px] rounded-full border border-[#C8A76A]/[0.09]"
          style={{ animation: "celestial-orbit 80s linear infinite" }}
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#DCC080] shadow-[0_0_18px_5px_rgba(220,192,128,.25)]" />
        </div>

        <div
          className="absolute -right-20 top-36 h-[270px] w-[270px] rounded-full border border-dashed border-[#C8A76A]/[0.12]"
          style={{ animation: "celestial-orbit 100s linear infinite reverse" }}
        />

        <div
          className="absolute -right-12 top-36 h-80 w-80 rounded-full bg-[#ad833e]/[0.07] blur-[100px]"
          style={{ animation: "celestial-glow 7s ease-in-out infinite" }}
        />
      </div>

      <div className="relative p-5 sm:p-8 lg:p-10">
        <header className="celestial-reveal flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#C8A76A]/25 bg-gradient-to-br from-[#C8A76A]/15 to-[#C8A76A]/[0.02] text-[#E4C781] shadow-[0_0_25px_rgba(200,167,106,.06)]">
              <MoonStar size={22} strokeWidth={1.4} />
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#C8A76A] sm:text-[10px]">
                Pecathon · Mystic Mikado
              </p>
              <p className="mt-1 text-xs tracking-wide text-[#888E9A]">
                Astronomical field journal
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-[#C8A76A]/20 bg-[#C8A76A]/[0.045] px-3.5 py-2 sm:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D9B975]" />
            <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#CFB57F]">
              The night sky, catalogued
            </span>
          </div>
        </header>

        <div className="celestial-reveal relative mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_270px] lg:items-end">
          <div className="relative max-w-3xl" style={{ animationDelay: "100ms" }}>
            <div className="mb-5 flex items-center gap-2 text-[#D8BB7D]">
              <Sparkles size={14} strokeWidth={1.6} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.23em]">
                Read the heavens
              </span>
            </div>

            <h1 className="font-serif text-[clamp(2.8rem,7.2vw,5.75rem)] leading-[0.94] tracking-[-0.055em] text-[#F4EBDD]">
              The Celestial
              <br />
              <span className="bg-gradient-to-r from-[#F5E8C8] via-[#D7B76F] to-[#A98142] bg-clip-text text-transparent">
                Scroll.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-[#A9ADB7] sm:text-base sm:leading-8">
              An atlas of remarkable nights. Discover celestial events,
              understand the conditions, and prepare for your next moment
              beneath the stars.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#celestial-events"
                className="celestial-primary-button px-5 py-3"
              >
                Explore the events
                <ArrowDownRight size={16} />
              </a>

              <a
                href={SOURCE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.09] px-4 py-3 text-xs font-medium text-[#B6B7BC] transition hover:border-[#C8A76A]/30 hover:text-[#E9D5AB]"
              >
                Event calendar
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          <aside className="relative hidden overflow-hidden rounded-[22px] border border-[#C8A76A]/20 bg-gradient-to-br from-[#171B22]/90 via-[#111721]/80 to-[#0D121B]/90 p-5 lg:block">
            <div className="pointer-events-none absolute -right-7 -top-8 h-28 w-28 rounded-full bg-[#CAA966]/[0.08] blur-2xl" />

            <div className="relative flex items-center justify-between">
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#B99D64]">
                Observer's oath
              </span>
              <Telescope size={17} className="text-[#D6B774]" />
            </div>

            <p className="relative mt-5 font-serif text-xl leading-7 text-[#E9DDC5]">
              “Look up.
              <br />
              Stay curious.”
            </p>

            <p className="relative mt-3 text-xs leading-6 text-[#8F959F]">
              Find darkness, give your eyes time, and let the sky set the pace.
            </p>

            <div className="relative mt-5 flex items-center gap-2 border-t border-white/[0.07] pt-4 text-[10px] uppercase tracking-[0.12em] text-[#9C9C99]">
              <Star size={12} className="text-[#D6B774]" />
              Patience is part of the ritual
            </div>
          </aside>
        </div>

        <div className="celestial-reveal mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#8E949E]">
                Next peak
              </span>
              <Clock3 size={15} className="text-[#D0AE68]" />
            </div>
            <p className="mt-3 font-serif text-xl text-[#F0E5D2] sm:text-2xl">
              {featuredEvent ? formatShortDate(featuredEvent.peakStart) : "—"}
            </p>
            <p className="mt-1 truncate text-xs text-[#9B9DA4]">
              {featuredEvent?.name || "No event in range"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#8E949E]">
                In the catalogue
              </span>
              <Sparkles size={15} className="text-[#D0AE68]" />
            </div>
            <p className="mt-3 font-serif text-xl text-[#F0E5D2] sm:text-2xl">
              {upcomingEvents.length.toString().padStart(2, "0")}
            </p>
            <p className="mt-1 text-xs text-[#9B9DA4]">Upcoming events</p>
          </div>

          <div className="col-span-2 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 sm:col-span-1 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#8E949E]">
                Your watchlist
              </span>
              <Bookmark size={15} className="text-[#D0AE68]" />
            </div>
            <p className="mt-3 font-serif text-xl text-[#F0E5D2] sm:text-2xl">
              {savedIds.length.toString().padStart(2, "0")}
            </p>
            <p className="mt-1 text-xs text-[#9B9DA4]">Moments to remember</p>
          </div>
        </div>

        <div className="mt-8 sm:mt-10">
          <MoonPhaseCard
            onExplore={() => {
              document.getElementById("celestial-events")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          />
        </div>

        <section id="celestial-events" className="scroll-mt-8 pt-12 sm:pt-16">
          <div className="celestial-reveal flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[#D6B774]">
                <span className="h-px w-7 bg-[#C8A76A]/70" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.23em]">
                  Your field guide
                </span>
              </div>

              <h2 className="font-serif text-3xl tracking-tight text-[#F2E6D2] sm:text-4xl">
                Upcoming sightings
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#969BA5]">
                Choose a night, read the field notes, and save the events you
                don't want to miss.
              </p>
            </div>

            <div className="relative w-full lg:max-w-[280px]">
              <Search
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#888E99]"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search the scroll..."
                aria-label="Search celestial events"
                className="w-full rounded-xl border border-white/[0.1] bg-[#101620]/85 py-3 pl-11 pr-4 text-sm text-[#EEE4D2] outline-none transition placeholder:text-[#777E89] focus:border-[#C8A76A]/50 focus:ring-2 focus:ring-[#C8A76A]/10"
              />
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`celestial-filter rounded-full px-4 py-2.5 text-[11px] font-medium ${
                  activeFilter === filter.id ? "celestial-filter-active" : ""
                }`}
              >
                {filter.id === "saved" && (
                  <Bookmark size={12} className="mr-1.5 inline-block" />
                )}
                {filter.label}
                {filter.id === "saved" && savedIds.length > 0 && (
                  <span className="ml-2 rounded-full bg-[#C8A76A]/15 px-1.5 py-0.5 text-[9px] text-[#E3C682]">
                    {savedIds.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 border-b border-white/[0.07] pb-4">
            <p className="text-xs text-[#858B96]">
              <span className="text-[#D9C08D]">{filteredEvents.length}</span>{" "}
              {filteredEvents.length === 1 ? "event" : "events"} in view
            </p>

            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.13em] text-[#8B9099]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#BE9D60]" />
              Peak dates in source calendar
            </span>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  index={index}
                  saved={savedIds.includes(event.id)}
                  expanded={expandedId === event.id}
                  onToggleSave={toggleSave}
                  onToggleDetails={toggleDetails}
                  onPlanNight={planNight}
                />
              ))}
            </div>
          ) : (
            <div className="celestial-reveal mt-5 flex flex-col items-center rounded-[22px] border border-dashed border-white/[0.12] px-5 py-14 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#C8A76A]/20 bg-[#C8A76A]/[0.06] text-[#D6B774]">
                {activeFilter === "saved" ? (
                  <Bookmark size={21} />
                ) : (
                  <Search size={21} />
                )}
              </div>
              <h3 className="mt-4 font-serif text-xl text-[#E9DDC6]">
                {activeFilter === "saved"
                  ? "Your scroll is waiting"
                  : "No stars found in this search"}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-[#9297A0]">
                {activeFilter === "saved"
                  ? "Save an event with the bookmark icon and it will appear here for your next night of observing."
                  : "Try a different name or clear your search to explore the upcoming events."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveFilter("all");
                }}
                className="celestial-text-button mt-5"
              >
                Show all events <ChevronRight size={14} />
              </button>
            </div>
          )}
        </section>

        <footer className="mt-12 border-t border-white/[0.08] pt-6 sm:mt-16 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#C8A76A]/20 bg-[#C8A76A]/[0.05] text-[#D6B774]">
              <Telescope size={17} />
            </div>
            <div>
              <p className="text-xs font-medium text-[#DAD0BE]">
                The sky rewards the curious.
              </p>
              <p className="mt-1 text-[10px] text-[#818792]">
                Verify local visibility and weather before travelling.
              </p>
            </div>
          </div>

          <a
            href={SOURCE_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.13em] text-[#B8A071] transition hover:text-[#F1D79B] sm:mt-0"
          >
            International Meteor Organization
            <ArrowUpRight size={13} />
          </a>
        </footer>
      </div>

      {notice && (
        <div
          role="status"
          className="celestial-reveal fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[#C8A76A]/30 bg-[#121923] px-4 py-3 text-xs text-[#F0E2C5] shadow-[0_12px_45px_rgba(0,0,0,.5)]"
        >
          <Check size={15} className="text-[#D9BC7A]" />
          {notice}
        </div>
      )}
    </section>
  );
}
