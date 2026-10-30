
import { Download, Image, Telescope } from "lucide-react";

export default function SkyImageViewer({
  image,
  loading,
  error,
}) {

  if (loading) {
    return (
      <section className="rounded-2xl border border-white/10 bg-[#152234]/80 p-8 text-center">
        <Telescope
          size={35}
          className="mx-auto animate-pulse text-[#E9B15D]"
        />

        <p className="mt-4 text-[#F2E9DB]">
          Retrieving astronomical imagery...
        </p>

        <p className="mt-2 text-sm text-slate-400">
          Communicating with NASA SkyView.
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-2xl border border-red-400/20 bg-red-400/5 p-6">
        <h3 className="font-semibold text-red-300">
          Unable to retrieve image
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          {error}
        </p>
      </section>
    );
  }

  if (!image) {
    return (
      <section className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#152234]/50 p-8 text-center">

        <Image size={40} className="text-[#E9B15D]" />

        <h3 className="mt-4 font-semibold text-[#F2E9DB]">
          Your observatory awaits
        </h3>

        <p className="mt-2 max-w-sm text-sm text-slate-400">
          Search for an astronomical object to retrieve its
          image from NASA SkyView.
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#152234]/80">

      <div className="border-b border-white/10 p-5">
        <p className="text-xs uppercase tracking-widest text-[#E9B15D]">
          Observation result
        </p>

        <h2 className="mt-2 text-xl font-semibold text-[#F2E9DB]">
          {image.name || image.position}
        </h2>
      </div>

      <div className="p-5">

        <img
          src={image.imageUrl}
          alt={`Astronomical observation of ${image.position}`}
          className="w-full rounded-xl object-contain"
        />

        <div className="mt-5 grid grid-cols-2 gap-4">

          <div>
            <p className="text-xs text-slate-400">
              SURVEY
            </p>
            <p className="mt-1 text-sm text-[#F2E9DB]">
              {image.survey}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              DATA SOURCE
            </p>
            <p className="mt-1 text-sm text-[#F2E9DB]">
              NASA SkyView
            </p>
          </div>

        </div>

        <a
          href={image.imageUrl}
          download
          target="_blank"
          rel="noreferrer"
          className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#E9B15D] px-4 py-3 text-sm font-semibold text-[#17202D] hover:bg-[#F2C77F]"
        >
          <Download size={17} />
          Download image
        </a>

      </div>
    </section>
  );
}
