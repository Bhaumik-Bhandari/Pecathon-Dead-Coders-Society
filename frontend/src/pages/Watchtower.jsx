
import { useState } from "react";
import {
  Cloud,
  Eye,
  Droplets,
  MapPin,
  Moon,
  RefreshCw,
} from "lucide-react";

import { getLocalForecast } from "../services/watchtowerApi";

function MetricCard({ icon: Icon, label, value, description }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#152234]/80 p-5">
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
    </article>
  );
}

export default function Watchtower() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function handleUseMyLocation() {
    setLoading(true);
    setError("");

    try {
      const data = await getLocalForecast();
      setResult(data);
    } catch (err) {
      setError(err.message || "Could not load the forecast.");
    } finally {
      setLoading(false);
    }
  }

  const location = result?.location;
  const forecast = result?.forecast;

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

      <section className="rounded-2xl border border-white/10 bg-[#152234]/80 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <MapPin size={21} className="mt-1 text-[#E9B15D]" />

            <div>
              <h2 className="font-semibold text-[#F2E9DB]">
                Your observing location
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Allow location access to request your forecast.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D94C42] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#B93D36] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            {loading ? "Loading forecast..." : "Use my location"}
          </button>
        </div>

        {location && (
          <p className="mt-4 break-words text-sm text-slate-300">
            Coordinates: {location.latitude.toFixed(4)},{" "}
            {location.longitude.toFixed(4)}
          </p>
        )}

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-300"
          >
            {error}
          </p>
        )}
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={Moon}
          label="Night Honor Score"
          value="—"
          description="Will be calculated by the astronomy backend."
        />

        <MetricCard
          icon={Cloud}
          label="Cloud Cover"
          value="—"
          description="Hourly cloud-cover forecast."
        />

        <MetricCard
          icon={Eye}
          label="Visibility"
          value="—"
          description="Forecast visibility in metres."
        />

        <MetricCard
          icon={Droplets}
          label="Humidity"
          value="—"
          description="Forecast relative humidity."
        />
      </div>

      {forecast && (
        <section className="rounded-2xl border border-white/10 bg-[#152234]/80 p-5">
          <h2 className="font-semibold text-[#F2E9DB]">
            Forecast response
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            This displays the raw response so we can verify the
            backend data structure before connecting individual metrics.
          </p>

          <pre className="mt-4 max-h-[400px] overflow-auto rounded-xl bg-[#0D1725] p-4 text-xs leading-5 text-slate-300">
            {JSON.stringify(forecast, null, 2)}
          </pre>
        </section>
      )}

      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <section className="rounded-2xl border border-white/10 bg-[#152234]/80 p-5">
          <div className="flex items-center gap-3">
            <MapPin size={20} className="text-[#E9B15D]" />

            <div>
              <h2 className="font-semibold text-[#F2E9DB]">
                Stargazing map
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Explore observing locations.
              </p>
            </div>
          </div>

          <div className="mt-5 flex min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-[#0D1725]/60 p-6 text-center">
            <MapPin size={32} className="text-[#E9B15D]" />

            <h3 className="mt-4 font-medium text-[#F2E9DB]">
              Stargazing map
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
              The interactive map and verified observing locations
              will be added in the next implementation step.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#152234]/80 p-5">
          <h2 className="font-semibold text-[#F2E9DB]">
            Best observing window
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            We will compare hourly sky conditions to identify
            a suitable observing period.
          </p>

          <div className="mt-5 rounded-xl border border-white/10 bg-[#0D1725]/60 p-4">
            <p className="text-sm font-medium text-[#E9B15D]">
              Awaiting hourly forecast integration
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}
