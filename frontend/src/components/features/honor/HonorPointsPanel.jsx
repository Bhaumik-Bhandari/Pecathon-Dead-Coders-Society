import { useCallback, useEffect, useState } from "react";
import {
  Award,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Crown,
  LoaderCircle,
  LogOut,
  RefreshCw,
  ShieldCheck,
  Star,
  Trophy,
  Wind,
} from "lucide-react";

import {
  clearHonorSession,
  completeHonorMission,
  createHonorSession,
  loadHonorDashboard,
  readHonorSession,
} from "../../../services/honorApi";

const PANEL =
  "rounded-2xl border border-white/[0.08] bg-[#142135]/80";

const MUTED = "text-sm text-[#93A0B1]";

function formatDate(value) {
  if (!value) return "Recently";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Recently";

  return date.toLocaleString();
}

function StatCard({ icon: Icon, label, value, detail }) {
  return (
    <article
      className={`${PANEL} p-4 transition hover:border-[#C99A52]/30 sm:p-5`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-[#A9B5C5]">
          {label}
        </span>

        <Icon size={19} className="text-[#D4AE6A]" />
      </div>

      <p className="mt-4 text-2xl font-semibold text-[#F4EBDD] sm:text-3xl">
        {value}
      </p>

      <p className="mt-1.5 text-xs text-[#A9B5C5]">
        {detail}
      </p>
    </article>
  );
}

function MissionCard({
  mission,
  note,
  eventType,
  busy,
  onNoteChange,
  onEventTypeChange,
  onSubmit,
}) {
  const isEventMission = mission.id === "event-witness";

  const completedEventTypes = mission.completedEventTypes || [];

  const availableEventTypes = isEventMission
    ? (mission.eventTypes || []).filter(
        (event) => !completedEventTypes.includes(event.id)
      )
    : [];

  const selectedEventType =
    availableEventTypes.some((event) => event.id === eventType)
      ? eventType
      : availableEventTypes[0]?.id || "";

  const completed = Boolean(mission.completed);

  const noteLength = note.trim().length;

  const noteValid =
    noteLength >= mission.minNoteChars && noteLength <= 500;

  const canSubmit =
    !completed &&
    !busy &&
    noteValid &&
    (!isEventMission || Boolean(selectedEventType));

  return (
    <article
      className={`${PANEL} flex h-full flex-col p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#C99A52]/30`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="rounded-full border border-[#C99A52]/20 bg-[#C99A52]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#D4AE6A]">
            {mission.cadence}
          </span>

          {completed && (
            <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-300">
              <CheckCircle2 size={12} />
              Completed
            </span>
          )}

          <h3 className="mt-3 text-xl font-semibold text-[#F4EBDD]">
            {mission.title}
          </h3>

          <p className="mt-1 text-sm text-[#B2BDCC]">
            {mission.subtitle}
          </p>
        </div>

        <div className="shrink-0 rounded-xl border border-[#C99A52]/20 bg-[#C99A52]/10 px-3 py-2 text-center">
          <p className="text-xl font-bold text-[#E0B76E]">
            +{mission.points}
          </p>

          <p className="text-[9px] font-bold uppercase tracking-wider text-[#A9B5C5]">
            Points
          </p>
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-6 text-[#A5B0BF]">
        {mission.description}
      </p>

      {isEventMission && (
        <div className="mt-4">
          <label
            htmlFor="honor-event-type"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#D4AE6A]"
          >
            Observation category
          </label>

          <select
            id="honor-event-type"
            value={selectedEventType}
            disabled={
              completed ||
              busy ||
              availableEventTypes.length === 0
            }
            onChange={(event) =>
              onEventTypeChange(mission.id, event.target.value)
            }
            className="w-full rounded-xl border border-white/10 bg-[#0C1726] px-3 py-3 text-sm text-[#F4EBDD] outline-none focus:border-[#C99A52]/60 disabled:opacity-50"
          >
            {availableEventTypes.length === 0 ? (
              <option value="">Daily limit reached</option>
            ) : (
              availableEventTypes.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.label}
                </option>
              ))
            )}
          </select>

          <p className={`${MUTED} mt-2 text-xs`}>
            Recorded today: {completedEventTypes.length} /{" "}
            {mission.dailyLimit}
          </p>
        </div>
      )}

      <form
        className="mt-4"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(mission, selectedEventType);
        }}
      >
        <label
          htmlFor={`honor-note-${mission.id}`}
          className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#D4AE6A]"
        >
          Observation journal
        </label>

        <textarea
          id={`honor-note-${mission.id}`}
          value={note}
          onChange={(event) =>
            onNoteChange(mission.id, event.target.value)
          }
          minLength={mission.minNoteChars}
          maxLength={500}
          rows={3}
          disabled={completed || busy}
          placeholder="Describe what you observed or learned tonight..."
          className="w-full resize-y rounded-xl border border-white/10 bg-[#0C1726] px-3 py-3 text-sm leading-6 text-[#F4EBDD] outline-none placeholder:text-[#718096] focus:border-[#C99A52]/60 disabled:opacity-50"
        />

        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="text-xs text-[#8492A5]">
            {noteLength}/500 characters
          </span>

          <span
            className={`text-xs ${
              noteValid ? "text-emerald-300" : "text-[#8492A5]"
            }`}
          >
            {noteValid
              ? "Note ready"
              : `Minimum ${mission.minNoteChars} characters`}
          </span>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C99A52] px-4 py-3 text-sm font-semibold text-[#151C26] transition hover:bg-[#E0B76E] disabled:cursor-not-allowed disabled:bg-[#344155] disabled:text-[#A9B5C5]"
        >
          {busy ? (
            <>
              <LoaderCircle size={16} className="animate-spin" />
              Recording...
            </>
          ) : completed ? (
            <>
              <CheckCircle2 size={16} />
              Reward claimed
            </>
          ) : (
            <>
              Record observation
              <ChevronRight size={16} />
            </>
          )}
        </button>
      </form>
    </article>
  );
}

export default function HonorPointsPanel() {
  const [session, setSession] = useState(() => readHonorSession());
  const [displayName, setDisplayName] = useState("");

  const [profile, setProfile] = useState(null);
  const [missions, setMissions] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  const [notes, setNotes] = useState({});
  const [eventTypes, setEventTypes] = useState({});

  const [loading, setLoading] = useState(false);
  const [creatingSession, setCreatingSession] = useState(false);
  const [busyMission, setBusyMission] = useState("");

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const refreshDashboard = useCallback(async (activeSession) => {
    if (!activeSession?.token) return;

    setLoading(true);
    setError("");

    try {
      const result = await loadHonorDashboard(activeSession.token);

      setProfile(result.profile);
      setMissions(result.missionData.missions || []);
      setLeaderboard(result.leaderboardData.entries || []);
    } catch (requestError) {
      if (requestError.status === 401) {
        clearHonorSession();
        setSession(null);
        setProfile(null);
        setError(
          "Your participant session has expired. Please start a new session."
        );
      } else {
        setError(requestError.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session) {
      refreshDashboard(session);
    }
  }, [session, refreshDashboard]);

  async function handleCreateSession(event) {
    event.preventDefault();

    setError("");
    setNotice("");
    setCreatingSession(true);

    try {
      const createdSession = await createHonorSession(displayName);

      setSession(createdSession);
      setDisplayName("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setCreatingSession(false);
    }
  }

  function handleLogout() {
    clearHonorSession();

    setSession(null);
    setProfile(null);
    setMissions([]);
    setLeaderboard([]);
    setNotes({});
    setEventTypes({});
    setError("");
    setNotice("");
  }

  function handleNoteChange(missionId, value) {
    setNotes((current) => ({
      ...current,
      [missionId]: value,
    }));
  }

  function handleEventTypeChange(missionId, value) {
    setEventTypes((current) => ({
      ...current,
      [missionId]: value,
    }));
  }

  async function handleMissionSubmit(mission, selectedEventType) {
    if (!session?.token) return;

    const note = (notes[mission.id] || "").trim();

    if (
      note.length < mission.minNoteChars ||
      note.length > 500
    ) {
      setError(
        `Observation notes must contain ${mission.minNoteChars}–500 characters.`
      );
      return;
    }

    if (
      mission.id === "event-witness" &&
      !selectedEventType
    ) {
      setError("Please select an observation category.");
      return;
    }

    setBusyMission(mission.id);
    setError("");
    setNotice("");

    try {
      const payload = { note };

      if (mission.id === "event-witness") {
        payload.eventType = selectedEventType;
      }

      const result = await completeHonorMission(
        session.token,
        mission.id,
        payload
      );

      await refreshDashboard(session);

      setNotes((current) => ({
        ...current,
        [mission.id]: "",
      }));

      setNotice(
        `Observation recorded successfully. You earned ${result.awardedPoints} Honor Points.`
      );
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusyMission("");
    }
  }

  if (!session) {
    return (
      <section className={`${PANEL} mx-auto max-w-xl overflow-hidden p-6 sm:p-8`}>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#C99A52]/25 bg-[#C99A52]/10 text-[#D4AE6A]">
          <ShieldCheck size={25} />
        </div>

        <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-[#D4AE6A]">
          Tsukuyomi Watch · Honor Dojo
        </p>

        <h2 className="mt-3 text-2xl font-semibold text-[#F4EBDD] sm:text-3xl">
          Begin your celestial journey
        </h2>

        <p className="mt-3 leading-7 text-[#A5B0BF]">
          Create your participant profile to record observations,
          complete celestial missions and earn Honor Points.
        </p>

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-red-300/20 bg-red-950/30 p-3 text-sm text-red-200"
          >
            {error}
          </div>
        )}

        <form className="mt-6" onSubmit={handleCreateSession}>
          <label
            htmlFor="honor-display-name"
            className="mb-2 block text-sm font-medium text-[#D9DDE4]"
          >
            Participant name
          </label>

          <input
            id="honor-display-name"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            minLength={2}
            maxLength={24}
            required
            placeholder="Choose your celestial name"
            className="w-full rounded-xl border border-white/10 bg-[#0C1726] px-4 py-3 text-sm text-[#F4EBDD] outline-none placeholder:text-[#718096] focus:border-[#C99A52]/60"
          />

          <button
            type="submit"
            disabled={creatingSession}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C99A52] px-4 py-3 text-sm font-semibold text-[#151C26] transition hover:bg-[#E0B76E] disabled:opacity-60"
          >
            {creatingSession ? (
              <>
                <LoaderCircle size={17} className="animate-spin" />
                Creating profile...
              </>
            ) : (
              <>
                Enter the Honor Dojo
                <ChevronRight size={17} />
              </>
            )}
          </button>
        </form>

        <p className="mt-4 text-xs leading-5 text-[#8492A5]">
          This anonymous participant profile is separate from
          your main application login.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6 text-[#F4EBDD]">
      <header className="relative overflow-hidden rounded-3xl border border-[#C99A52]/25 bg-gradient-to-br from-[#1A2A40] via-[#101B2C] to-[#251E2C] p-5 sm:p-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full border border-[#D4AE6A]/15"
        />

        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4AE6A]">
              The Honor Dojo
            </p>

            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              The path of the sky watcher
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#A5B0BF]">
              Welcome, {session.player.displayName}. Every observation
              becomes part of your celestial journey.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => refreshDashboard(session)}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs font-semibold text-[#D9DDE4] hover:border-[#C99A52]/40 disabled:opacity-50"
            >
              <RefreshCw
                size={15}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs font-semibold text-[#D9DDE4] hover:border-red-300/30 hover:text-red-200"
            >
              <LogOut size={15} />
              Switch
            </button>
          </div>
        </div>
      </header>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-300/20 bg-red-950/30 p-4 text-sm text-red-200"
        >
          {error}
        </div>
      )}

      {notice && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-emerald-300/20 bg-emerald-950/20 p-4 text-sm text-emerald-200"
        >
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
          {notice}
        </div>
      )}

      {loading && !profile ? (
        <div className={`${PANEL} flex items-center justify-center gap-3 p-10 text-[#B8C3D1]`}>
          <LoaderCircle size={20} className="animate-spin text-[#D4AE6A]" />
          Loading your Honor Dojo...
        </div>
      ) : profile ? (
        <>
          <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            <StatCard
              icon={Award}
              label="Honor Points"
              value={profile.totalPoints}
              detail="Lifetime points earned"
            />

            <StatCard
              icon={Trophy}
              label="Current rank"
              value={`#${profile.rank}`}
              detail="Among participants"
            />

            <StatCard
              icon={Wind}
              label="Sky streak"
              value={`${profile.streakDays} day${profile.streakDays === 1 ? "" : "s"}`}
              detail="Consecutive active dates"
            />

            <StatCard
              icon={Crown}
              label="Your level"
              value={profile.level.name}
              detail={
                profile.level.nextLevelAt
                  ? `${profile.level.nextLevelAt - profile.totalPoints} points to next level`
                  : "Highest configured level"
              }
            />
          </div>

          <section className={`${PANEL} p-5 sm:p-6`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-[#D4AE6A]" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.19em] text-[#D4AE6A]">
                    Advancement
                  </p>
                </div>

                <h3 className="mt-2 text-xl font-semibold">
                  {profile.level.name}
                </h3>

                <p className={`${MUTED} mt-1`}>
                  {profile.level.nextLevelName
                    ? `Next destination: ${profile.level.nextLevelName}`
                    : "Highest level currently configured."}
                </p>
              </div>

              <p className="text-sm font-semibold text-[#D4AE6A]">
                {profile.level.progressPercent}% complete
              </p>
            </div>

            <div
              className="mt-5 h-2 overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-valuenow={profile.level.progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Level progress"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#996B30] to-[#E0B76E] transition-all duration-500"
                style={{
                  width: `${profile.level.progressPercent}%`,
                }}
              />
            </div>

            {profile.level.nextLevelAt && (
              <div className="mt-2 flex justify-between text-xs text-[#8492A5]">
                <span>{profile.level.currentLevelAt} points</span>
                <span>{profile.level.nextLevelAt} points</span>
              </div>
            )}
          </section>

          <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,2fr)_minmax(270px,1fr)]">
            <div>
              <div className="mb-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AE6A]">
                  Your missions
                </p>

                <h3 className="mt-2 text-xl font-semibold sm:text-2xl">
                  Record your observations
                </h3>

                <p className={`${MUTED} mt-1`}>
                  Complete missions to earn Honor Points.
                </p>
              </div>

              {missions.length === 0 ? (
                <div className={`${PANEL} p-6 text-sm text-[#A5B0BF]`}>
                  No missions are currently available.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {missions.map((mission) => (
                    <MissionCard
                      key={mission.id}
                      mission={mission}
                      note={notes[mission.id] || ""}
                      eventType={eventTypes[mission.id] || ""}
                      busy={busyMission === mission.id}
                      onNoteChange={handleNoteChange}
                      onEventTypeChange={handleEventTypeChange}
                      onSubmit={handleMissionSubmit}
                    />
                  ))}
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <section className={`${PANEL} p-5`}>
                <div className="flex items-center gap-2">
                  <Trophy size={17} className="text-[#D4AE6A]" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4AE6A]">
                    The celestial standings
                  </p>
                </div>

                <h3 className="mt-2 text-xl font-semibold">
                  Honor leaderboard
                </h3>

                <p className={`${MUTED} mt-1`}>
                  Top participants by lifetime points.
                </p>

                {leaderboard.length === 0 ? (
                  <p className={`${MUTED} mt-5`}>
                    No participants have earned points yet.
                  </p>
                ) : (
                  <div className="mt-4 divide-y divide-white/[0.08]">
                    {leaderboard.map((entry) => (
                      <div
                        key={entry.rank}
                        className="flex items-center gap-3 py-3"
                      >
                        <span className="w-7 shrink-0 text-sm font-semibold text-[#D4AE6A]">
                          {String(entry.rank).padStart(2, "0")}
                        </span>

                        <p className="min-w-0 flex-1 truncate text-sm font-medium text-[#E7E9ED]">
                          {entry.displayName}
                        </p>

                        <span className="shrink-0 text-sm font-semibold text-[#D4AE6A]">
                          {entry.totalPoints} pts
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section className={`${PANEL} p-5`}>
                <div className="flex items-center gap-2">
                  <Clock3 size={17} className="text-[#D4AE6A]" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4AE6A]">
                    Mission history
                  </p>
                </div>

                <h3 className="mt-2 text-xl font-semibold">
                  Recent activity
                </h3>

                {profile.recentActivity.length === 0 ? (
                  <p className={`${MUTED} mt-4`}>
                    Your completed missions will appear here.
                  </p>
                ) : (
                  <div className="mt-4 space-y-4">
                    {profile.recentActivity.map((item) => (
                      <div
                        key={`${item.missionId}-${item.createdAt}`}
                        className="flex items-start justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[#E7E9ED]">
                            {item.reason}
                          </p>

                          <p className="mt-1 text-xs text-[#8492A5]">
                            {formatDate(item.createdAt)}
                          </p>
                        </div>

                        <span className="shrink-0 text-sm font-semibold text-[#D4AE6A]">
                          +{item.points}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section className={`${PANEL} p-5`}>
                <div className="flex items-center gap-2">
                  <CircleUserRound
                    size={17}
                    className="text-[#D4AE6A]"
                  />

                  <h3 className="text-sm font-semibold">
                    Participant profile
                  </h3>
                </div>

                <p className="mt-3 text-base font-semibold">
                  {profile.player.displayName}
                </p>

                <p className="mt-1 text-xs text-[#8492A5]">
                  Member since {formatDate(profile.player.createdAt)}
                </p>
              </section>
            </aside>
          </div>

          <footer className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-[#101B2A]/70 px-4 py-3.5">
            <CalendarDays
              size={17}
              className="mt-0.5 shrink-0 text-[#D4AE6A]"
            />

            <p className="text-xs leading-5 text-[#8492A5]">
              Observation records are self-reported in this version.
              Honor Points reward completion of the observation
              logging process; they do not independently verify
              that an astronomical event was observed.
            </p>
          </footer>
        </>
      ) : (
        <div className={`${PANEL} p-6`}>
          <p className="text-sm text-[#A5B0BF]">
            Your participant profile could not be loaded.
          </p>

          <button
            type="button"
            onClick={() => refreshDashboard(session)}
            className="mt-4 rounded-xl bg-[#C99A52] px-4 py-2.5 text-sm font-semibold text-[#151C26]"
          >
            Try again
          </button>
        </div>
      )}
    </section>
  );
}
