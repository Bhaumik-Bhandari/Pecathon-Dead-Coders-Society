
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Download,
  ImageUp,
  Orbit,
  Rocket,
  Satellite,
  ScanSearch,
  RotateCcw,
  SkipForward,
  Sparkles,
} from "lucide-react";
import { restoreImage } from "../services/spiritLensApi";

const PLANETS = [
  {
    id: "earth",
    name: "Earth",
    label: "THE BLUE MARBLE",
    role: "ORIGIN",
    color: "#428bd4",
    description: "Our homeworld. Every great expedition begins here.",
  },
  {
    id: "moon",
    name: "The Moon",
    label: "LUNAR FRONTIER",
    role: "SATELLITE",
    color: "#b9c5d5",
    description: "A cratered neighbour glowing in the darkness.",
  },
  {
    id: "mars",
    name: "Mars",
    label: "THE RED PLANET",
    role: "FRONTIER 01",
    color: "#d8795b",
    description: "A rust-coloured world of ancient craters.",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    label: "THE GAS GIANT",
    role: "FRONTIER 02",
    color: "#d6b18a",
    description: "A vast gas giant with sweeping atmospheric bands.",
  },
  {
    id: "saturn",
    name: "Saturn",
    label: "THE RINGED WORLD",
    role: "FRONTIER 03",
    color: "#d5c096",
    description: "A distant world encircled by magnificent rings.",
  },
];

export default function SpiritLens() {
  // Cinematic scene state
  const [phase, setPhase] = useState("launch");
  const [runKey, setRunKey] = useState(0);
  const [selectedId, setSelectedId] = useState("earth");

  // Image restoration state
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [restoredUrl, setRestoredUrl] = useState("");
  const [error, setError] = useState("");
  const [restoring, setRestoring] = useState(false);

  const selectedPlanet =
    PLANETS.find((planet) => planet.id === selectedId) ?? PLANETS[0];

  // Run the cinematic launch sequence.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("orbit");
      return undefined;
    }

    setPhase("launch");

    const timer = window.setTimeout(() => {
      setPhase("orbit");
    }, 6500);

    return () => window.clearTimeout(timer);
  }, [runKey]);

  // Clean up temporary image URLs when replaced or unmounted.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    return () => {
      if (restoredUrl) URL.revokeObjectURL(restoredUrl);
    };
  }, [restoredUrl]);

  function replayLaunch() {
    setPhase("launch");
    setRunKey((key) => key + 1);
  }

  function skipLaunch() {
    setPhase("orbit");
  }

  function enterSpiritLens() {
    document.getElementById("spirit-lens-upload")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function handleFileChange(event) {
    const selectedFile = event.target.files?.[0];

    // Allow selecting the same file again.
    event.target.value = "";

    if (!selectedFile) return;

    setError("");
    setRestoredUrl("");

    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please select a JPG or PNG image.");
      return;
    }

    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("Your image must be 10 MB or smaller.");
      return;
    }

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  }

  async function handleRestore() {
    if (!file || restoring) return;

    setRestoring(true);
    setError("");
    setRestoredUrl("");

    try {
      // Send the selected image to the backend.
      const restoredBlob = await restoreImage(file);

      if (!(restoredBlob instanceof Blob) || restoredBlob.size === 0) {
        throw new Error("The server returned an empty image.");
      }

      if (!restoredBlob.type.startsWith("image/")) {
        throw new Error(
          "The server did not return a valid image response."
        );
      }

      setRestoredUrl(URL.createObjectURL(restoredBlob));
    } catch (err) {
      console.error("Spirit Lens restoration failed:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Image restoration failed. Please try again."
      );
    } finally {
      setRestoring(false);
    }
  }

  function handleReset() {
    setFile(null);
    setPreviewUrl("");
    setRestoredUrl("");
    setError("");
  }

  return (
    <div className="space-y-10">
      {/* CINEMATIC SPACE EXPERIENCE */}
      <section
        className="spirit-cinematic"
        data-phase={phase}
        aria-label="Spirit Lens celestial expedition"
      >
        <div className="spirit-cinema-frame spirit-lite-frame">
          <div className="spirit-lite-stars" aria-hidden="true" />
          <div className="spirit-lite-nebula" aria-hidden="true" />
          <div className="spirit-lite-horizon" aria-hidden="true" />

          {/* Earth */}
          <div className="spirit-lite-earth" aria-label="Earth" role="img">
            <span />
          </div>

          {/* Decorative planets */}
          <div className="spirit-lite-moon" aria-hidden="true" />
          <div className="spirit-lite-mars" aria-hidden="true" />
          <div className="spirit-lite-jupiter" aria-hidden="true" />

          <div className="spirit-lite-saturn" aria-hidden="true">
            <span />
          </div>

          <div className="spirit-lite-orbit" aria-hidden="true" />

          {/* Rocket */}
          <div className="spirit-lite-rocket" aria-hidden="true">
            <span className="spirit-lite-flame" />
            <Rocket size={42} strokeWidth={1.2} />
          </div>

          <div className="spirit-cinema-vignette" />

          {/* HUD */}
          <header className="spirit-cinema-hud">
            <div className="spirit-cinema-brand">
              <span className="spirit-cinema-brand-icon">
                <Orbit size={19} />
              </span>

              <div>
                <strong>SPIRIT LENS</strong>
                <span>CELESTIAL EXPEDITION</span>
              </div>
            </div>

            <div className="spirit-cinema-status">
              <span className="spirit-cinema-status-dot" />
              {phase === "launch" ? "MISSION INITIATED" : "DEEP SPACE"}
            </div>
          </header>

          {/* Launch copy */}
          <div className="spirit-cinema-launch-copy">
            <p className="spirit-cinema-eyebrow">
              <Sparkles size={12} />
              MISSION 001 · DEPARTURE
            </p>

            <h2>
              Beyond the
              <br />
              <em>known sky.</em>
            </h2>

            <p>
              Leaving Earth behind.
              <br />
              Beginning the search for the extraordinary.
            </p>

            <div className="spirit-cinema-telemetry">
              <span>ORIGIN</span>
              <strong>EARTH</strong>
              <span className="spirit-cinema-telemetry-separator" />
              <span>STATUS</span>
              <strong>
                {phase === "launch" ? "ASCENDING" : "IN ORBIT"}
              </strong>
            </div>
          </div>

          {/* Destination introduction */}
          <div className="spirit-cinema-orbit-copy">
            <p className="spirit-cinema-eyebrow">
              <Satellite size={12} />
              EXPEDITION MAP · SOLAR SYSTEM
            </p>

            <h2>
              Worlds beyond
              <br />
              <em>our own.</em>
            </h2>

            <p>
              Five celestial stops.
              <br />
              One journey into the unknown.
            </p>
          </div>

          {phase === "launch" ? (
            <button
              type="button"
              className="spirit-cinema-control"
              onClick={skipLaunch}
            >
              Skip launch
              <SkipForward size={14} />
            </button>
          ) : (
            <button
              type="button"
              className="spirit-cinema-control"
              onClick={replayLaunch}
            >
              <RotateCcw size={14} />
              Replay sequence
            </button>
          )}

          <div className="spirit-cinema-launch-status">
            <span className="spirit-cinema-status-dot" />

            <span>
              {phase === "launch"
                ? "ENGINE IGNITION · ASCENT · ORBIT"
                : "ORBIT ESTABLISHED · ROUTE ACTIVE"}
            </span>

            <div className="spirit-cinema-progress">
              <span />
            </div>
          </div>
        </div>

        {/* Planet selection */}
        <div className="spirit-cinema-destinations">
          <div className="spirit-cinema-destination-heading">
            <div>
              <p>CHOOSE A CELESTIAL BODY</p>
              <span>
                Select a destination to explore this cinematic route.
              </span>
            </div>

            <span className="spirit-cinema-scale-note">
              CINEMATIC SCALE · NOT TO SCALE
            </span>
          </div>

          <nav
            className="spirit-cinema-planet-nav"
            aria-label="Planetary destinations"
          >
            {PLANETS.map((planet, index) => (
              <button
                type="button"
                key={planet.id}
                className={
                  selectedId === planet.id
                    ? "spirit-cinema-planet-button is-active"
                    : "spirit-cinema-planet-button"
                }
                onClick={() => setSelectedId(planet.id)}
                aria-pressed={selectedId === planet.id}
              >
                <span className="spirit-cinema-planet-number">
                  0{index + 1}
                </span>

                <span className="spirit-cinema-planet-name">
                  {planet.name}
                </span>

                <span className="spirit-cinema-planet-role">
                  {planet.role}
                </span>
              </button>
            ))}
          </nav>

          <div className="spirit-cinema-selected-world">
            <div>
              <p>{selectedPlanet.label}</p>
              <h3>{selectedPlanet.name}</h3>
              <span>{selectedPlanet.description}</span>
            </div>

            <button
              type="button"
              className="spirit-cinema-continue"
              onClick={enterSpiritLens}
            >
              Enter Spirit Lens
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <p className="spirit-cinema-attribution">
          A stylised celestial illustration · Planet positions are illustrative.
        </p>
      </section>

      {/* IMAGE RESTORATION FEATURE */}
      <section id="spirit-lens-upload" className="space-y-8 scroll-mt-8">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="rounded-xl bg-violet-500/10 p-2">
              <Sparkles className="h-5 w-5 text-violet-400" />
            </div>

            <span className="text-sm font-medium uppercase tracking-[0.2em] text-violet-300">
              Spirit Lens · Image Restoration
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Restore the unseen.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
            Upload a noisy or blurry image and send it to the AI restoration
            backend. Compare the original with the processed result.
          </p>
        </div>

        {/* Upload panel */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 md:p-7">
          <div className="mb-5 flex items-center gap-3">
            <ImageUp className="h-5 w-5 text-violet-300" />

            <div>
              <h2 className="font-semibold text-white">Upload an image</h2>
              <p className="mt-1 text-sm text-slate-400">
                JPG or PNG, up to 10 MB
              </p>
            </div>
          </div>

          <label
            htmlFor="spirit-lens-image"
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-violet-400/40 bg-violet-400/5 px-5 py-10 text-center transition hover:border-violet-300 hover:bg-violet-400/10"
          >
            <ImageUp className="mb-4 h-9 w-9 text-violet-300" />

            <span className="font-medium text-white">
              Choose an image from your device
            </span>

            <span className="mt-2 text-sm text-slate-400">
              {file ? file.name : "Click here to browse files"}
            </span>

            <input
              id="spirit-lens-image"
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>

          {error && (
            <div
              role="alert"
              className="mt-4 rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300"
            >
              {error}
            </div>
          )}

          {file && (
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleRestore}
                disabled={restoring}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3 font-medium text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {restoring ? (
                  <>
                    <span
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                      aria-hidden="true"
                    />
                    Restoring image...
                  </>
                ) : (
                  <>
                    <ScanSearch className="h-4 w-4" />
                    Restore image with AI
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={restoring}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Original and restored image comparison */}
        {previewUrl && (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">
              <div className="border-b border-white/10 px-5 py-4">
                <h2 className="font-semibold text-white">Original image</h2>
                <p className="mt-1 text-sm text-slate-400">
                  The image you uploaded
                </p>
              </div>

              <div className="flex min-h-64 items-center justify-center bg-black/20 p-4">
                <img
                  src={previewUrl}
                  alt="Original uploaded image"
                  className="max-h-[500px] max-w-full rounded-lg object-contain"
                />
              </div>
            </div>

            <div className="min-w-0 overflow-hidden rounded-2xl border border-violet-400/20 bg-slate-900/60">
              <div className="border-b border-white/10 px-5 py-4">
                <h2 className="font-semibold text-white">
                  AI-restored image
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {restoring
                    ? "Processing your image on the backend..."
                    : restoredUrl
                      ? "Restoration complete"
                      : "Your processed image will appear here"}
                </p>
              </div>

              <div className="flex min-h-64 items-center justify-center bg-black/20 p-4">
                {restoring ? (
                  <div
                    className="flex flex-col items-center gap-4 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <span
                      className="h-10 w-10 animate-spin rounded-full border-4 border-violet-300/20 border-t-violet-300"
                      aria-hidden="true"
                    />

                    <p className="text-sm text-slate-300">
                      Removing noise and blur...
                    </p>

                    <p className="text-xs text-slate-500">
                      Processing time depends on the model and image size.
                    </p>
                  </div>
                ) : restoredUrl ? (
                  <img
                    src={restoredUrl}
                    alt="AI-restored image"
                    className="max-h-[500px] max-w-full rounded-lg object-contain"
                  />
                ) : (
                  <div className="px-5 py-10 text-center">
                    <Sparkles className="mx-auto mb-3 h-8 w-8 text-violet-300/60" />

                    <p className="text-sm text-slate-400">
                      Click{" "}
                      <span className="font-medium text-violet-300">
                        Restore image with AI
                      </span>{" "}
                      to see the processed result here.
                    </p>
                  </div>
                )}
              </div>

              {restoredUrl && (
                <div className="border-t border-white/10 p-4">
                  <a
                    href={restoredUrl}
                    download={`restored-${file?.name || "image.png"}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-400"
                  >
                    <Download className="h-4 w-4" />
                    Download restored image
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Backend information */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
          <div className="flex items-start gap-3">
            <ScanSearch className="mt-1 h-5 w-5 shrink-0 text-violet-300" />

            <div>
              <h2 className="font-semibold text-white">
                Restoration pipeline
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                The frontend sends the selected image to the Spirit Lens API
                and displays the returned image. Actual image restoration
                depends on the backend and its configured AI model.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
