import {
  CalendarDays,
  Clock3,
  Moon,
  Telescope,
} from "lucide-react";

export default function CelestialScroll() {
  return (
    <section className="space-y-7">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E9B15D]">
          Module 02 · The Celestial Scroll
        </p>

        <h1 className="mt-3 text-3xl font-bold text-[#F2E9DB]">
          The universe has a schedule.
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
          Explore astronomical events, track lunar phases and
          discover upcoming opportunities to observe the sky.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-[#152234]/80 p-5">
          <div className="flex items-center gap-3">
            <Moon size={21} className="text-[#E9B15D]" />

            <h2 className="font-semibold text-[#F2E9DB]">
              Lunar conditions
            </h2>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-400">
            Moon phase, moonrise and moonset will be displayed
            for the selected location and date.
          </p>

          <div className="mt-5 rounded-xl border border-white/10 bg-[#0D1725]/60 p-4">
            <p className="text-sm text-slate-400">
              Moon data
            </p>

            <p className="mt-2 font-medium text-[#E9B15D]">
              Awaiting astronomy data
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#152234]/80 p-5">
          <div className="flex items-center gap-3">
            <Clock3 size={21} className="text-[#E9B15D]" />

            <h2 className="font-semibold text-[#F2E9DB]">
              Next celestial event
            </h2>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-400">
            Verified event dates and local times will appear
            when the event service is connected.
          </p>

          <div className="mt-5 rounded-xl border border-white/10 bg-[#0D1725]/60 p-4">
            <p className="text-sm text-slate-400">
              Event status
            </p>

            <p className="mt-2 font-medium text-[#E9B15D]">
              No events loaded yet
            </p>
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-white/10 bg-[#152234]/80 p-5">
        <div className="flex items-center gap-3">
          <CalendarDays size={21} className="text-[#E9B15D]" />

          <h2 className="font-semibold text-[#F2E9DB]">
            Celestial event calendar
          </h2>
        </div>

        <div className="mt-5 flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-[#0D1725]/60 p-6 text-center">
          <Telescope size={32} className="text-[#E9B15D]" />

          <h3 className="mt-4 font-medium text-[#F2E9DB]">
            Your celestial calendar
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
            The calendar will display verified meteor showers,
            eclipses, moon phases and supported spaceflight events
            with date filters and local-time information.
          </p>
        </div>
      </section>
    </section>
  );
}
