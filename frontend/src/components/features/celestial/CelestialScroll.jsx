
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bookmark,
  Check,
  Clock3,
  ExternalLink,
  MoonStar,
  Search,
  Sparkles,
  Star,
  Telescope,
} from "lucide-react";

import MoonPhaseCard from "./MoonPhaseCard.jsx";
import EventCard from "./EventCard.jsx";
import EventFilters from "./EventFilters.jsx";

import {
  CELESTIAL_EVENTS as EVENTS,
  CELESTIAL_SOURCE_URL as SOURCE_URL,
} from "./celestialEvents.js";

const WATCHLIST_KEY = "pecathon-celestial-watchlist";

const STARS = [
  { x: "7%", y: "15%", s: 2, d: "0s" },
  { x: "15%", y: "35%", s: 3, d: "1.4s" },
  { x: "22%", y: "12%", s: 2, d: "2.1s" },
  { x: "31%", y: "26%", s: 2, d: "0.8s" },
  { x: "39%", y: "8%", s: 3, d: "2.8s" },
  { x: "47%", y: "19%", s: 2, d: "1.8s" },
  { x: "55%", y: "9%", s: 3, d: "0.4s" },
  { x: "63%", y: "26%", s: 2, d: "2.4s" },
  { x: "72%", y: "12%", s: 2, d: "1.2s" },
  { x: "82%", y: "20%", s: 3, d: "2.6s" },
  { x: "92%", y: "9%", s: 2, d: "0.6s" },
  { x: "89%", y: "42%", s: 2, d: "1.9s" },
  { x: "77%", y: "52%", s: 2, d: "0.9s" },
  { x: "35%", y: "49%", s: 2, d: "2.3s" },
  { x: "12%", y: "57%", s: 2, d: "1.7s" },
  { x: "96%", y: "63%", s: 2, d: "1.1s" },
  { x: "25%", y: "70%", s: 2, d: "1.5s" },
  { x: "66%", y: "72%", s: 3, d: "2.5s" },
  { x: "43%", y: "83%", s: 2, d: "0.5s" },
];

function parseLocalDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0);
}

function startOfToday() {
  const now = new Date();

  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0
  );
}

function daysUntil(dateString) {
  const today = startOfToday();
  const target = parseLocalDate(dateString);

  return Math.round(
    (target.getTime() - today.getTime()) / 86400000
  );
}

function formatShortDate(value) {
  return parseLocalDate(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

function readWatchlist() {
  try {
    const value = JSON.parse(
      localStorage.getItem(WATCHLIST_KEY) || "[]"
    );

    return Array.isArray(value)
      ? value.filter((item) => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

export default function CelestialScroll({ onPlanNight }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [savedIds, setSavedIds] = useState(readWatchlist);
  const [expandedId, setExpandedId] = useState(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(
        WATCHLIST_KEY,
        JSON.stringify(savedIds)
      );
    } catch {
      // The Scroll remains usable if browser storage is unavailable.
    }
  }, [savedIds]);

  const upcomingEvents = useMemo(
    () =>
      EVENTS.filter(
        (event) => daysUntil(event.peakEnd) >= 0
      ).sort((a, b) =>
        a.peakStart.localeCompare(b.peakStart)
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
        (activeFilter === "upcoming" &&
          daysUntil(event.peakStart) >= 0) ||
        (activeFilter === "favourable" &&
          ["favourable", "very favourable"].includes(
            event.moonlight.toLowerCase()
          )) ||
        (activeFilter === "saved" &&
          savedIds.includes(event.id));

      return matchesQuery && matchesFilter;
    });
  }, [query, activeFilter, savedIds, upcomingEvents]);

  function showNotice(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  }

  function toggleSave(id) {
    const isSaved = savedIds.includes(id);

    setSavedIds((current) =>
      isSaved
        ? current.filter((item) => item !== id)
        : [...current, id]
    );

    showNotice(
      isSaved
        ? "Removed from your scroll"
        : "Added to your scroll"
    );
  }

  function toggleDetails(id) {
    setExpandedId((current) =>
      current === id ? null : id
    );
  }

  function planNight(event) {
    if (typeof onPlanNight === "function") {
      onPlanNight(event);
      return;
    }

    showNotice(`${event.name} selected for night planning`);
  }

  return (
    <section className="celestial-scroll relative isolate w-full overflow-hidden rounded-[28px] border border-[#C8A76A]/20 bg-[#080C14] text-[#F5ECD9] shadow-[0_28px_90px_rgba(0,0,0,0.32)] sm:rounded-[34px]">
      <style>{`
        @keyframes celestial-enter {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes celestial-twinkle {
          0%, 100% {
            opacity: .22;
            transform: scale(.75);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        @keyframes celestial-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes celestial-orbit-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes celestial-glow {
          0%, 100% {
            opacity: .35;
            transform: scale(.95);
          }
          50% {
            opacity: .75;
            transform: scale(1.08);
          }
        }

        @keyframes celestial-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @keyframes celestial-moon-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-9px); }
        }

        .celestial-reveal {
          animation: celestial-enter .75s cubic-bezier(.2,.7,.2,1) both;
        }

        .celestial-star {
          animation: celestial-twinkle 3.5s ease-in-out infinite;
          animation-delay: var(--star-delay, 0s);
        }

        .celestial-event-card {
          animation: celestial-enter .65s cubic-bezier(.2,.7,.2,1) both;
          animation-delay: var(--card-delay, 0ms);
          transition:
            border-color .35s ease,
            transform .35s ease,
            box-shadow .35s ease,
            background .35s ease;
        }

        .celestial-event-card:hover {
          transform: translateY(-5px);
          border-color: rgba(218,184,112,.42);
          background: linear-gradient(
            145deg,
            rgba(24,32,45,.98),
            rgba(12,18,28,.98)
          );
          box-shadow:
            0 22px 55px rgba(0,0,0,.24),
            0 0 36px rgba(199,157,77,.055);
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
          transition:
            background .25s ease,
            color .25s ease,
            border-color .25s ease,
            transform .25s ease;
        }

        .celestial-filter:hover {
          border-color: rgba(218,184,112,.28);
          color: #efe0c3;
          transform: translateY(-1px);
        }

        .celestial-filter-active {
          border-color: rgba(218,184,112,.38);
          background: linear-gradient(
            110deg,
            rgba(191,147,67,.18),
            rgba(191,147,67,.06)
          );
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
          background: linear-gradient(
            110deg,
            #e0c17d,
            #b98b43,
            #e0c17d
          );
          background-size: 200% 100%;
          padding: 10px 13px;
          color: #17130c;
          font-size: 12px;
          font-weight: 700;
          transition:
            transform .25s ease,
            box-shadow .25s ease,
            background-position .45s ease;
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

        .celestial-moon {
          animation: celestial-moon-float 6s ease-in-out infinite;
        }

        .celestial-orbit-one {
          animation: celestial-orbit 85s linear infinite;
        }

        .celestial-orbit-two {
          animation: celestial-orbit-reverse 110s linear infinite;
        }

        .celestial-glow {
          animation: celestial-glow 7s ease-in-out infinite;
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

      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(155,116,54,0.16),transparent_42%),radial-gradient(ellipse_at_0%_40%,rgba(29,57,86,0.17),transparent_40%),radial-gradient(ellipse_at_100%_65%,rgba(29,57,86,0.12),transparent_40%)]" />

        {STARS.map((star) => (
          <span
            key={`${star.x}-${star.y}`}
            className="celestial-star absolute rounded-full bg-[#f4d99b]"
            style={{
              left: star.x,
              top: star.y,
              width: star.s,
              height: star.s,
              "--star-delay": star.d,
              boxShadow: "0 0 9px rgba(244,217,155,.65)",
            }}
          />
        ))}
      </div>

      <div className="relative p-5 sm:p-8 lg:p-10">
        {/* Header */}
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

        {/* Hero */}
        <div className="celestial-reveal relative mt-10 grid items-center gap-8 lg:mt-14 lg:grid-cols-[1fr_0.9fr] lg:gap-5">
          <div className="relative z-10 max-w-3xl">
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

          {/* Centred celestial artwork */}
          <div className="relative mx-auto flex min-h-[310px] w-full max-w-[490px] items-center justify-center sm:min-h-[390px] lg:min-h-[440px]">
            <div className="celestial-glow absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C79D55]/[0.12] blur-[65px] sm:h-[290px] sm:w-[290px]" />

            <div className="celestial-orbit-one absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C8A76A]/20 sm:h-[350px] sm:w-[350px]">
              <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#E7C985] shadow-[0_0_18px_5px_rgba(220,192,128,.45)]" />
              <span className="absolute bottom-[18%] left-[8%] h-1.5 w-1.5 rounded-full bg-[#D6B774] shadow-[0_0_12px_3px_rgba(220,192,128,.35)]" />
            </div>

            <div className="celestial-orbit-two absolute left-1/2 top-1/2 h-[205px] w-[205px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#C8A76A]/25 sm:h-[285px] sm:w-[285px]">
              <span className="absolute right-[10%] top-[20%] h-2 w-2 rounded-full bg-[#D8B879] shadow-[0_0_14px_4px_rgba(220,192,128,.3)]" />
            </div>

            <div className="celestial-moon relative z-10 flex h-[145px] w-[145px] items-center justify-center rounded-full border border-[#E8CC8F]/40 bg-[radial-gradient(circle_at_35%_30%,#F4E6C4_0%,#D8B875_28%,#96703A_62%,#302417_100%)] shadow-[0_0_45px_rgba(207,164,83,.22),inset_-14px_-12px_28px_rgba(0,0,0,.4)] sm:h-[190px] sm:w-[190px]">
              <div className="absolute inset-[10px] rounded-full border border-[#FFF0C5]/20" />
              <div className="absolute left-[22%] top-[25%] h-5 w-5 rounded-full bg-[#72562E]/20 blur-[2px] sm:h-7 sm:w-7" />
              <div className="absolute bottom-[28%] right-[22%] h-8 w-8 rounded-full bg-[#72562E]/15 blur-[3px] sm:h-10 sm:w-10" />
              <MoonStar
                size={52}
                strokeWidth={0.8}
                className="relative z-10 text-[#FFF0C8]/85 drop-shadow-[0_0_15px_rgba(255,236,190,.55)] sm:h-16 sm:w-16"
              />
            </div>

            <div className="absolute left-[10%] top-[22%] hidden rounded-xl border border-[#C8A76A]/20 bg-[#111721]/80 px-3 py-2 backdrop-blur-md sm:block">
              <p className="text-[9px] uppercase tracking-[0.17em] text-[#A9946A]">
                Celestial
              </p>
              <p className="mt-1 text-xs text-[#E8D9B8]">Observation</p>
            </div>

            <div className="absolute bottom-[17%] right-[5%] hidden rounded-xl border border-[#C8A76A]/20 bg-[#111721]/80 px-3 py-2 backdrop-blur-md sm:block">
              <p className="text-[9px] uppercase tracking-[0.17em] text-[#A9946A]">
                Mystic Mikado
              </p>
              <p className="mt-1 text-xs text-[#E8D9B8]">Look beyond</p>
            </div>

            <Star className="absolute left-[16%] top-[60%] h-4 w-4 text-[#E5C783] opacity-70" />
            <Sparkles className="absolute right-[17%] top-[15%] h-5 w-5 text-[#E5C783] opacity-70" />
            <Star className="absolute bottom-[13%] left-[43%] h-3 w-3 text-[#E5C783] opacity-60" />
          </div>
        </div>

        {/* Summary cards */}
        <div className="celestial-reveal mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 transition duration-300 hover:border-[#C8A76A]/30 hover:bg-[#C8A76A]/[0.04] sm:p-5">
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

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 transition duration-300 hover:border-[#C8A76A]/30 hover:bg-[#C8A76A]/[0.04] sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#8E949E]">
                In the catalogue
              </span>
              <Sparkles size={15} className="text-[#D0AE68]" />
            </div>

            <p className="mt-3 font-serif text-xl text-[#F0E5D2] sm:text-2xl">
              {upcomingEvents.length.toString().padStart(2, "0")}
            </p>

            <p className="mt-1 text-xs text-[#9B9DA4]">
              Upcoming events
            </p>
          </div>

          <div className="col-span-2 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 transition duration-300 hover:border-[#C8A76A]/30 hover:bg-[#C8A76A]/[0.04] sm:col-span-1 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#8E949E]">
                Your watchlist
              </span>
              <Bookmark size={15} className="text-[#D0AE68]" />
            </div>

            <p className="mt-3 font-serif text-xl text-[#F0E5D2] sm:text-2xl">
              {savedIds.length.toString().padStart(2, "0")}
            </p>

            <p className="mt-1 text-xs text-[#9B9DA4]">
              Moments to remember
            </p>
          </div>
        </div>

        {/* Moon phase */}
        <div className="mt-9 sm:mt-11">
          <MoonPhaseCard
            onExplore={() => {
              document
                .getElementById("celestial-events")
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
            }}
          />
        </div>

        {/* Event catalogue */}
        <section
          id="celestial-events"
          className="scroll-mt-8 pt-12 sm:pt-16"
        >
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

          {/* Filters: no extra nested margin wrapper */}
          <div className="mt-7">
            <EventFilters
              activeFilter={activeFilter}
              onChange={setActiveFilter}
              savedCount={savedIds.length}
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] pb-4">
            <p className="text-xs text-[#858B96]">
              <span className="text-[#D9C08D]">
                {filteredEvents.length}
              </span>{" "}
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
                Show all events
                <ArrowUpRight size={14} />
              </button>
            </div>
          )}
        </section>

        {/* Footer */}
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
