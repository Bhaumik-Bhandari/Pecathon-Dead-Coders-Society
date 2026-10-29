import {
  Cloud,
  Eye,
  Droplets,
  MapPin,
  Moon,
} from "lucide-react";

function MetricCard({ icon: Icon, label, value, description }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#152234]/80 p-5">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-[#D94C42]/15 p-3 text-[#E9B15D]">
          <Icon size={20} />
        </div>

        <p className="text-sm text-slate-300">{label}</p>
      </div>

      <p className="mt-5 text-xl font-semibold text-[#F2E9DB]">
        {value}
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-400">
        {description}
      </p>
    </div>
  );
}

export default function Watchtower() {
  return (
    <section className="space-y-7">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E9B15D]">
          Module 01 · The Watchtower
        </p>

        <h1 className="mt-3 text-3xl font-bold text-[#F2E9DB]">
          Find your perfect night sky.
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
          Explore observing locations and compare sky conditions
          to find a suitable time for stargazing.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={Moon}
          label="Night Honor Score"
          value="Awaiting data"
          description="A score will appear when the weather API is connected."
        />

        <MetricCard
          icon={Cloud}
          label="Cloud Cover"
          value="—"
          description="Hourly forecast for your selected location."
        />

        <MetricCard
          icon={Eye}
          label="Visibility"
          value="—"
          description="Forecast visibility reported in metres."
        />

        <MetricCard
          icon={Droplets}
          label="Humidity"
          value="—"
          description="Forecast relative humidity."
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <section className="rounded-2xl border border-white/10 bg-[#152234]/80 p-5">
          <div className="flex items-center gap-3">
            <MapPin size={20} className="text-[#E9B15D]" />

            <div>
              <h2 className="font-semibold text-[#F2E9DB]">
                Stargazing map
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Explore verified observing locations.
              </p>
            </div>
          </div>

          <div className="mt-5 flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-[#0D1725]/60 p-6 text-center">
            <MapPin size={32} className="text-[#E9B15D]" />

            <h3 className="mt-4 font-medium text-[#F2E9DB]">
              Your night-sky map starts here
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
              The interactive map and observing locations will
              be connected in the next implementation step.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#152234]/80 p-5">
          <h2 className="font-semibold text-[#F2E9DB]">
            Best observing window
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Compare forecast conditions across the night to
            identify a suitable observing period.
          </p>

          <div className="mt-5 rounded-xl border border-white/10 bg-[#0D1725]/60 p-4">
            <p className="text-sm text-slate-300">
              Status
            </p>

            <p className="mt-2 font-medium text-[#E9B15D]">
              Waiting for forecast integration
            </p>
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            Recommendations will be based on forecast data
            and the availability of location information.
          </p>
        </section>
      </div>
    </section>
  );
}