
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Orbit,
  RotateCcw,
  Rocket,
  Satellite,
  SkipForward,
  Sparkles,
} from "lucide-react";

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

export default function SpiritLensScene() {
  const [phase, setPhase] = useState("launch");
  const [runKey, setRunKey] = useState(0);
  const [selectedId, setSelectedId] = useState("earth");

  const selectedPlanet =
    PLANETS.find((planet) => planet.id === selectedId) ?? PLANETS[0];

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setPhase("orbit");
      return undefined;
    }

    setPhase("launch");

    const timer = window.setTimeout(() => {
      setPhase("orbit");
    }, 6500);

    return () => window.clearTimeout(timer);
  }, [runKey]);

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

  return (
    <section
      className="spirit-cinematic"
      data-phase={phase}
      aria-label="Spirit Lens celestial expedition"
    >
      <div className="spirit-cinema-frame spirit-lite-frame">
        {/* Pure CSS space background; no canvas or WebGL required. */}
        <div className="spirit-lite-stars" aria-hidden="true" />
        <div className="spirit-lite-nebula" aria-hidden="true" />
        <div className="spirit-lite-horizon" aria-hidden="true" />

        {/* Earth */}
        <div
          className="spirit-lite-earth"
          aria-label="Earth"
          role="img"
        >
          <span />
        </div>

        {/* Decorative planets */}
        <div className="spirit-lite-moon" aria-hidden="true" />
        <div className="spirit-lite-mars" aria-hidden="true" />
        <div className="spirit-lite-jupiter" aria-hidden="true" />
        <div className="spirit-lite-saturn" aria-hidden="true">
          <span />
        </div>

        {/* Orbital path */}
        <div className="spirit-lite-orbit" aria-hidden="true" />

        {/* Rocket and exhaust */}
        <div className="spirit-lite-rocket" aria-hidden="true">
          <span className="spirit-lite-flame" />
          <Rocket size={42} strokeWidth={1.2} />
        </div>

        <div className="spirit-cinema-vignette" />

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
            <strong>{phase === "launch" ? "ASCENDING" : "IN ORBIT"}</strong>
          </div>
        </div>

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
  );
}
