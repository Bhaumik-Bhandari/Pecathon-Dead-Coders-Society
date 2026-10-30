
import { Search, Telescope } from "lucide-react";

const popularObjects = [
  "M31",
  "M42",
  "M51",
  "M104",
];

export default function SkySearch({
  position,
  onChange,
  onSearch,
  loading,
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#152234]/80 p-5">

      <div className="flex items-center gap-3">
        <Telescope className="text-[#E9B15D]" size={22} />

        <div>
          <h2 className="font-semibold text-[#F2E9DB]">
            Explore the cosmos
          </h2>
          <p className="text-xs text-slate-400">
            Search an astronomical object or coordinates.
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
        className="mt-5 flex flex-col gap-3 sm:flex-row"
      >
        <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-[#0D1725] px-4">
          <Search size={18} className="text-[#E9B15D]" />

          <input
            value={position}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g. Andromeda Galaxy or M31"
            className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !position.trim()}
          className="rounded-xl bg-[#E9B15D] px-6 py-3 text-sm font-semibold text-[#17202D] transition hover:bg-[#F2C77F] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Searching..." : "Explore Sky"}
        </button>
      </form>

      <div className="mt-4">
        <p className="mb-2 text-xs text-slate-400">
          POPULAR OBJECTS
        </p>

        <div className="flex flex-wrap gap-2">
          {popularObjects.map((object) => (
            <button
              key={object}
              type="button"
              onClick={() => onChange(object)}
              className="rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300 hover:border-[#E9B15D] hover:text-[#E9B15D]"
            >
              {object}
            </button>
          ))}
        </div>
      </div>

    </section>
  );
}
