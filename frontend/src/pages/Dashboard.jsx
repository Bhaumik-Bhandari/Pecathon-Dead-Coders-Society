
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarDays,
  Cloud,
  Clock3,
  Droplets,
  Eye,
  MapPin,
  Moon,
  Sparkles,
} from "lucide-react";
import HonorPointsPanel from "../components/features/honor/HonorPointsPanel";

function WeatherMetric({ icon: Icon, label, note }) {
  return (
    <article className="rounded-2xl border border-white/[0.08] bg-[#142135]/80 p-4 transition-colors duration-200 hover:border-[#C99A52]/30 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-[#A9B5C5] sm:text-sm">
          {label}
        </span>

        <Icon size={19} className="shrink-0 text-[#D4AE6A]" />
      </div>

      <p className="mt-5 text-2xl font-semibold tracking-tight text-[#F4EBDD]">
        —
      </p>

      <p className="mt-1.5 text-xs leading-5 text-[#8492A5]">
        {note}
      </p>
    </article>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AE6A] sm:text-xs">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-lg font-semibold tracking-tight text-[#F4EBDD] sm:text-xl">
        {title}
      </h2>

      {description && (
        <p className="mt-1.5 text-sm leading-6 text-[#93A0B1]">
          {description}
        </p>
      )}
    </div>
  );
}

function FeatureLink({ to, icon: Icon, eyebrow, title, description }) {
  return (
    <Link
      to={to}
      className="group flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#142135]/80 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#C99A52]/40 hover:bg-[#18283D]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#C99A52]/20 bg-[#C99A52]/10 text-[#D4AE6A]">
          <Icon size={21} strokeWidth={1.7} />
        </div>

        <ArrowUpRight
          size={18}
          className="text-[#748297] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#D4AE6A]"
        />
      </div>

      <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4AE6A]">
        {eyebrow}
      </p>

      <h3 className="mt-2 text-base font-semibold text-[#F4EBDD]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#93A0B1]">
        {description}
      </p>

      <span className="mt-5 text-xs font-semibold text-[#D4AE6A] group-hover:text-[#F0D49B]">
        Explore module
      </span>
    </Link>
  );
}

export default function Dashboard() {
  const today = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(new Date());

  return (
    <main className="space-y-6 pb-6 sm:space-y-8">
      {/* Page heading */}
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AE6A] shadow-[0_0_10px_rgba(212,174,106,0.65)]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AE6A] sm:text-xs">
              TSUKUYOMI WATCH · MYSTIC MIKADO
            </p>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-[#F4EBDD] sm:text-3xl lg:text-4xl">
            Tonight, written in the stars.
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#A5B0BF] sm:text-base">
            Your celestial guide to finding clearer skies,
            discovering cosmic events, and exploring the universe.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 self-start rounded-xl border border-white/10 bg-[#142135]/70 px-3.5 py-3 sm:self-auto">
          <CalendarDays size={17} className="text-[#D4AE6A]" />
          <span className="text-sm text-[#D9DDE4]">{today}</span>
        </div>
      </header>

      {/* Hero: Night Honor Score */}
      <section className="relative overflow-hidden rounded-3xl border border-[#C99A52]/25 bg-gradient-to-br from-[#1A2A40] via-[#101B2C] to-[#251E2C] p-5 sm:p-7 lg:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[#C99A52]/[0.07] blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-64 rounded-full bg-[#853C45]/15 blur-3xl"
        />

        <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Sparkles size={16} className="text-[#D4AE6A]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.19em] text-[#D4AE6A] sm:text-xs">
                The Watchtower
              </p>

              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium text-[#A9B5C5]">
                Forecast pending
              </span>
            </div>

            <h2 className="mt-4 text-xl font-semibold text-[#F4EBDD] sm:text-2xl">
              Tonight's observing conditions
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-[#A5B0BF]">
              Discover how suitable the sky is for stargazing.
              Your score will appear once location and weather
              data are connected.
            </p>

            <Link
              to="/watchtower"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#C99A52] px-4 py-3 text-sm font-semibold text-[#151C26] transition hover:bg-[#E0B76E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0D49B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17263A]"
            >
              Explore the Watchtower
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="flex items-center gap-5 md:flex-col md:gap-2 md:pl-5">
            <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-[#D4AE6A]/30 bg-[#0D1725]/60 sm:h-32 sm:w-32">
              <div className="absolute inset-2 rounded-full border border-dashed border-[#D4AE6A]/20" />

              <div className="text-center">
                <p className="text-3xl font-semibold tracking-tight text-[#F4EBDD] sm:text-4xl">
                  —
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#A5B0BF]">
                  Out of 100
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-[#F4EBDD]">
                Night Honor Score
              </p>

              <p className="mt-1 text-xs leading-5 text-[#93A0B1] md:text-center">
                Awaiting weather data
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location context */}
      <section className="flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-[#142135]/60 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-[#C99A52]/10 p-2.5 text-[#D4AE6A]">
            <MapPin size={19} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#F4EBDD]">
              Your observing location
            </h2>

            <p className="mt-1 text-xs leading-5 text-[#93A0B1]">
              Choose a location to see its forecast and suitable
              observing times.
            </p>
          </div>
        </div>

        <Link
          to="/watchtower"
          className="inline-flex items-center gap-2 self-start text-sm font-semibold text-[#D4AE6A] transition hover:text-[#F0D49B] sm:self-center"
        >
          Choose location
          <ArrowUpRight size={16} />
        </Link>
      </section>

      {/* Weather summary */}
      <section>
        <SectionHeading
          eyebrow="Sky conditions"
          title="A closer look at the sky"
          description="Forecast details will populate after the weather service is connected."
        />

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <WeatherMetric
            icon={Cloud}
            label="Cloud cover"
            note="Hourly forecast"
          />

          <WeatherMetric
            icon={Eye}
            label="Visibility"
            note="Forecast distance"
          />

          <WeatherMetric
            icon={Droplets}
            label="Humidity"
            note="Relative humidity"
          />
        </div>
      </section>

      {/* Best time and next event */}
      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-white/[0.08] bg-[#142135]/80 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C99A52]/10 text-[#D4AE6A]">
              <Clock3 size={20} />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4AE6A]">
                Best observing window
              </p>

              <h2 className="mt-2 text-lg font-semibold text-[#F4EBDD]">
                Find your hour under the stars
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#93A0B1]">
                Compare the night's forecast scores to find
                a more suitable time for observing.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-dashed border-white/10 bg-[#0C1726]/60 p-4">
            <p className="text-sm font-medium text-[#D9DDE4]">
              No observing window calculated yet
            </p>

            <p className="mt-1.5 text-xs leading-5 text-[#8492A5]">
              An hourly forecast is needed before a time can
              be recommended.
            </p>
          </div>

          <Link
            to="/watchtower"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#D4AE6A] transition hover:text-[#F0D49B]"
          >
            Compare sky conditions
            <ArrowUpRight size={16} />
          </Link>
        </article>

        <article className="rounded-2xl border border-white/[0.08] bg-[#142135]/80 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#853C45]/20 text-[#E2A6A2]">
              <Moon size={20} />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4AE6A]">
                The Celestial Scroll
              </p>

              <h2 className="mt-2 text-lg font-semibold text-[#F4EBDD]">
                The next cosmic event
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#93A0B1]">
                Explore upcoming meteor showers, eclipses,
                lunar phases and supported space events.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-dashed border-white/10 bg-[#0C1726]/60 p-4">
            <p className="text-sm font-medium text-[#D9DDE4]">
              Event information not loaded
            </p>

            <p className="mt-1.5 text-xs leading-5 text-[#8492A5]">
              The next event will appear after the event service
              returns verified data.
            </p>
          </div>

          <Link
            to="/celestial-scroll"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#D4AE6A] transition hover:text-[#F0D49B]"
          >
            Explore celestial events
            <ArrowUpRight size={16} />
          </Link>
        </article>
      </section>

      {/* Module shortcuts */}
      <section>
        <SectionHeading
          eyebrow="Your celestial journey"
          title="Explore the realm"
          description="Go deeper into each part of Tsukuyomi Watch."
        />

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <FeatureLink
            to="/watchtower"
            icon={MapPin}
            eyebrow="01 · Discover"
            title="The Watchtower"
            description="Explore observing locations, compare sky conditions and find the best available observing window."
          />

          <FeatureLink
            to="/celestial-scroll"
            icon={CalendarDays}
            eyebrow="02 · Anticipate"
            title="The Celestial Scroll"
            description="Explore upcoming celestial events and moon information for your chosen location."
          />

          <FeatureLink
            to="/spirit-lens"
            icon={Sparkles}
            eyebrow="03 · Reveal"
            title="The Spirit Lens"
            description="Restore astronomical images and inspect detected celestial-object candidates."
          />
        </div>
      </section>
      {/* Honest data status */}
      {/* Honor Points — The Honor Dojo */}
      <section
        id="honor-dojo"
        className="scroll-mt-24 space-y-4"
      >
        <SectionHeading
          eyebrow="04 · Earn"
          title="The Honor Dojo"
          description="Record celestial observations, complete missions and build your Honor."
        />

        <HonorPointsPanel />
      </section>
      <footer className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-[#101B2A]/70 px-4 py-3.5"></footer>

      {/* Honest data status */}
      <footer className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-[#101B2A]/70 px-4 py-3.5">
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#D4AE6A]" />

        <p className="text-xs leading-5 text-[#8492A5]">
          <span className="font-semibold text-[#BEC6D0]">
            Data status:
          </span>{" "}
          The dashboard layout is ready. Weather forecasts,
          astronomical events and image analysis will show
          results after their backend services are connected.
        </p>
      </footer>
    </main>
  );
}
