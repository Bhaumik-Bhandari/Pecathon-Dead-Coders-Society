
import { Telescope } from "lucide-react";

const surveys = [
  {
    id: "DSS",
    name: "Optical",
    description: "Visible light observations",
  },
  {
    id: "2MASS-K",
    name: "Infrared",
    description: "Infrared observations",
  },
  {
    id: "GALEX Near UV",
    name: "Ultraviolet",
    description: "Near ultraviolet observations",
  },
];

export default function SurveySelector({
  survey,
  onChange,
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#152234]/80 p-5">

      <div className="flex items-center gap-3">
        <Telescope size={21} className="text-[#E9B15D]" />

        <div>
          <h2 className="font-semibold text-[#F2E9DB]">
            Observation survey
          </h2>

          <p className="text-xs text-slate-400">
            Choose the wavelength of observation.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">

        {surveys.map((item) => {
          const selected = survey === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              aria-pressed={selected}
              className={`rounded-xl border p-4 text-left transition ${
                selected
                  ? "border-[#E9B15D] bg-[#E9B15D]/10"
                  : "border-white/10 bg-[#0D1725] hover:border-white/30"
              }`}
            >
              <p className={`font-semibold ${
                selected
                  ? "text-[#E9B15D]"
                  : "text-[#F2E9DB]"
              }`}>
                {item.name}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                {item.description}
              </p>

              <p className="mt-3 text-xs text-slate-500">
                {item.id}
              </p>

              {selected && (
                <span className="mt-3 block text-xs text-[#E9B15D]">
                  ✓ Selected
                </span>
              )}
            </button>
          );
        })}

      </div>
    </section>
  );
}
