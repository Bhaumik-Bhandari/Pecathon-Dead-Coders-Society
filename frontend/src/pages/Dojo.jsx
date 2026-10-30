
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  Flame,
  LockKeyhole,
  Medal,
  Moon,
  Orbit,
  Rocket,
  ScanSearch,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

import {
  dojoActivity,
  dojoBadges,
  dojoDemoMode,
  dojoMissions,
  dojoProfile,
  dojoStats,
} from "../data/dojoData.js";

const ICONS = {
  sparkles: Sparkles,
  shield: Shield,
  medal: Medal,
  target: Target,
  telescope: Orbit,
  moon: Moon,
  orbit: Orbit,
  "moon-star": Moon,
  "scan-search": ScanSearch,
  rocket: Rocket,
  award: Award,
  "shield-check": ShieldCheck,
};

function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AE6A] sm:text-xs">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-lg font-semibold tracking-tight text-[#F4EBDD] sm:text-xl">
          {title}
        </h2>
        {description && (
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[#93A0B1]">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

function StatCard({ stat }) {
  const Icon = ICONS[stat.icon] ?? Sparkles;

  return (
    <article className="rounded-2xl border border-white/[0.08] bg-[#142135]/80 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-[#C99A52]/35 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-[#A9B5C5]">
          {stat.label}
        </span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#C99A52]/20 bg-[#C99A52]/10 text-[#D4AE6A]">
          <Icon size={18} />
        </span>
      </div>

      <p className="mt-4 break-words text-xl font-semibold tracking-tight text-[#F4EBDD] sm:text-2xl">
        {typeof stat.value === "number"
          ? stat.value.toLocaleString("en-IN")
          : stat.value}
      </p>

      <p className="mt-1.5 text-xs leading-5 text-[#8492A5]">
        {stat.description}
      </p>
    </article>
  );
}

function BadgeCard({ badge }) {
  const Icon = ICONS[badge.icon] ?? Sparkles;

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border p-4 transition duration-200 sm:p-5 ${
        badge.unlocked
          ? "border-[#C99A52]/20 bg-[#142135]/80 hover:border-[#C99A52]/45"
          : "border-white/[0.07] bg-[#101923]/65 hover:border-white/15"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
            badge.unlocked
              ? "border-[#C99A52]/25 bg-[#C99A52]/10 text-[#D4AE6A]"
              : "border-white/10 bg-white/[0.035] text-slate-500"
          }`}
        >
          <Icon size={21} strokeWidth={1.7} />
        </div>

        {badge.unlocked ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-2 py-1 text-[10px] font-medium text-emerald-300">
            <CheckCircle2 size={12} />
            Earned
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] font-medium text-slate-400">
            <LockKeyhole size={11} />
            Locked
          </span>
        )}
      </div>

      <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C9A570]">
        {badge.category}
      </p>

      <h3 className="mt-1.5 text-base font-semibold text-[#F4EBDD]">
        {badge.name}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-6 text-[#93A0B1]">
        {badge.description}
      </p>

      <div className="mt-4 border-t border-white/[0.07] pt-3">
        <span className="text-xs text-slate-500">
          {badge.earnedLabel}
        </span>
      </div>
    </article>
  );
}

function MissionCard({ mission }) {
  const Icon = ICONS[mission.icon] ?? Target;
  const completed = mission.progress >= mission.target;
  const progress = Math.min(
    100,
    Math.round((mission.progress / mission.target) * 100),
  );

  return (
    <article className="flex flex-col rounded-2xl border border-white/[0.08] bg-[#142135]/75 p-4 transition duration-200 hover:border-[#C99A52]/35 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#C99A52]/20 bg-[#C99A52]/10 text-[#D4AE6A]">
          <Icon size={20} />
        </span>

        <span className="rounded-lg border border-[#C99A52]/15 bg-[#C99A52]/[0.06] px-2.5 py-1 text-xs font-semibold text-[#D4AE6A]">
          +{mission.reward} pts
        </span>
      </div>

      <h3 className="mt-4 font-semibold text-[#F4EBDD]">
        {mission.title}
      </h3>

      <p className="mt-1.5 flex-1 text-sm leading-6 text-[#93A0B1]">
        {mission.description}
      </p>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-slate-400">Progress</span>
          <span className={completed ? "text-emerald-300" : "text-slate-400"}>
            {mission.progress}/{mission.target}
          </span>
        </div>

        <div
          className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]"
          role="progressbar"
          aria-label={`${mission.title} progress`}
          aria-valuemin={0}
          aria-valuemax={mission.target}
          aria-valuenow={Math.min(mission.progress, mission.target)}
        >
          <div
            className={`h-full rounded-full transition-all ${
              completed ? "bg-emerald-400" : "bg-[#C99A52]"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Link
        to={mission.href}
        className="mt-5 inline-flex min-h-10 items-center justify-between gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm font-medium text-[#E8D4B2] transition hover:border-[#C99A52]/40 hover:bg-[#C99A52]/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AE6A]"
      >
        {completed ? "Visit module" : "Explore mission"}
        <ArrowUpRight size={16} />
      </Link>
    </article>
  );
}

export default function Dojo() {
  const [badgeFilter, setBadgeFilter] = useState("all");

  const earnedBadges = dojoBadges.filter((badge) => badge.unlocked);
  const filteredBadges = dojoBadges.filter((badge) => {
    if (badgeFilter === "earned") return badge.unlocked;
    if (badgeFilter === "locked") return !badge.unlocked;
    return true;
  });

  const honorPoints = Math.max(0, dojoProfile.honorPoints);
  const nextRankPoints = Math.max(
    dojoProfile.rank.nextRankPoints,
    honorPoints,
  );

  const rankProgress =
    nextRankPoints > 0
      ? Math.min(100, Math.round((honorPoints / nextRankPoints) * 100))
      : 100;

  const pointsRemaining = Math.max(
    0,
    dojoProfile.rank.nextRankPoints - honorPoints,
  );

  return (
    <main className="space-y-7 pb-8 sm:space-y-9">
      {/* Page heading */}
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AE6A] shadow-[0_0_10px_rgba(212,174,106,0.65)]" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AE6A] sm:text-xs">
              The Dojo · Expedition records
            </p>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-[#F4EBDD] sm:text-3xl">
            Your celestial journey.
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#93A0B1]">
            Track your honor, celebrate your discoveries, and see
            what awaits you on the path ahead.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex min-h-10 items-center gap-2 self-start rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-[#E8D4B2] transition hover:border-[#C99A52]/40 hover:bg-white/[0.03] sm:self-auto"
        >
          Main overview
          <ArrowUpRight size={16} />
        </Link>
      </header>

      {dojoDemoMode && (
        <div className="flex items-start gap-3 rounded-xl border border-[#C99A52]/15 bg-[#C99A52]/[0.045] px-4 py-3">
          <Activity size={17} className="mt-0.5 shrink-0 text-[#D4AE6A]" />
          <p className="text-xs leading-5 text-[#B8B4AA]">
            <span className="font-semibold text-[#E8D4B2]">
              Preview data
            </span>
            {" "}— these points, achievements, and activity entries are
            examples for the frontend. They are not saved to a user account.
          </p>
        </div>
      )}

      {/* Rank hero */}
      <section className="relative overflow-hidden rounded-2xl border border-[#C99A52]/20 bg-[#142135]/80 p-5 sm:p-7 lg:p-8">
        <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-[#C99A52]/[0.07] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 right-[20%] h-52 w-52 rounded-full bg-[#7D554E]/[0.10] blur-3xl" />

        <div className="relative grid gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="flex items-center gap-2 text-[#D4AE6A]">
              <Orbit size={17} />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Current standing
              </p>
            </div>

            <p className="mt-5 text-sm text-[#A9B5C5]">
              Welcome back,
            </p>

            <h2 className="mt-1 text-3xl font-semibold tracking-tight text-[#F4EBDD] sm:text-4xl">
              {dojoProfile.displayName}
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#93A0B1]">
              {dojoProfile.subtitle}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#C99A52]/25 bg-[#C99A52]/[0.08] px-3.5 py-2 text-sm font-medium text-[#E8D4B2]">
              <Shield size={17} />
              {dojoProfile.rank.name}
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0D1725]/65 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A9B5C5]">
                  Total honor points
                </p>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-[#F4EBDD]">
                  {honorPoints.toLocaleString("en-IN")}
                </p>
              </div>

              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#C99A52]/25 bg-[#C99A52]/10 text-[#D4AE6A]">
                <Sparkles size={23} />
              </span>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs text-[#A9B5C5]">
                  Next rank
                </p>
                <p className="mt-1 font-semibold text-[#F4EBDD]">
                  {dojoProfile.rank.nextRankName}
                </p>
              </div>

              <p className="text-right text-xs text-[#D4AE6A]">
                {pointsRemaining.toLocaleString("en-IN")} points to go
              </p>
            </div>

            <div
              className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.08]"
              role="progressbar"
              aria-label="Progress toward next rank"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={rankProgress}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#9D7046] via-[#D4AE6A] to-[#F0D49B] transition-all duration-500"
                style={{ width: `${rankProgress}%` }}
              />
            </div>

            <div className="mt-2 flex justify-between text-[11px] text-[#8492A5]">
              <span>Rank {dojoProfile.rank.tier}</span>
              <span>{rankProgress}% progress</span>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="space-y-4">
        <SectionHeading
          eyebrow="Your records"
          title="Expedition at a glance"
          description="A quick overview of your progress through the celestial modules."
        />

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {dojoStats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
      </section>

      {/* Missions */}
      <section className="space-y-4">
        <SectionHeading
          eyebrow="Next steps"
          title="Expedition missions"
          description="Continue exploring the modules to work toward these milestones."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dojoMissions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>
      </section>

      {/* Badges */}
      <section className="space-y-4">
        <SectionHeading
          eyebrow="Achievements"
          title="Your badge collection"
          description={`${earnedBadges.length} of ${dojoBadges.length} sample badges unlocked.`}
          action={
            <div className="flex gap-1 rounded-xl border border-white/[0.08] bg-[#101923]/80 p-1">
              {[
                { id: "all", label: "All" },
                { id: "earned", label: "Earned" },
                { id: "locked", label: "Locked" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={badgeFilter === filter.id}
                  onClick={() => setBadgeFilter(filter.id)}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                    badgeFilter === filter.id
                      ? "bg-[#C99A52]/15 text-[#F0D49B]"
                      : "text-slate-400 hover:text-[#F4EBDD]"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          }
        />

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {filteredBadges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>

        {filteredBadges.length === 0 && (
          <div className="rounded-2xl border border-white/[0.08] bg-[#142135]/60 p-8 text-center">
            <Medal className="mx-auto text-[#D4AE6A]" size={26} />
            <p className="mt-3 font-medium text-[#F4EBDD]">
              No badges in this view
            </p>
            <p className="mt-1 text-sm text-[#93A0B1]">
              Try another filter to explore your collection.
            </p>
          </div>
        )}
      </section>

      {/* Recent activity */}
      <section className="space-y-4">
        <SectionHeading
          eyebrow="Mission log"
          title="Recent activity"
          description="A preview of achievements recorded during the expedition."
        />

        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#142135]/75">
          {dojoActivity.map((item, index) => {
            const Icon = ICONS[item.icon] ?? Activity;

            return (
              <article
                key={item.id}
                className={`flex items-start gap-4 p-4 sm:p-5 ${
                  index !== 0 ? "border-t border-white/[0.07]" : ""
                }`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#C99A52]/20 bg-[#C99A52]/[0.08] text-[#D4AE6A]">
                  <Icon size={19} />
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-[#F4EBDD]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[#93A0B1]">
                    {item.description}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span>{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.timeLabel}</span>
                  </div>
                </div>

                <span className="shrink-0 whitespace-nowrap text-xs font-semibold text-[#D4AE6A]">
                  +{item.points} pts
                </span>
              </article>
            );
          })}

          {dojoActivity.length === 0 && (
            <p className="p-6 text-sm text-[#93A0B1]">
              No activity has been recorded yet.
            </p>
          )}
        </div>
      </section>

      {/* Footer links */}
      <section className="flex flex-col justify-between gap-4 rounded-2xl border border-white/[0.08] bg-[#142135]/55 p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#C99A52]/20 bg-[#C99A52]/10 text-[#D4AE6A]">
            <Flame size={20} />
          </span>
          <div>
            <h2 className="font-semibold text-[#F4EBDD]">
              Keep your expedition moving
            </h2>
            <p className="mt-1 text-sm leading-6 text-[#93A0B1]">
              Discover a new world, inspect an image, or revisit your
              celestial records.
            </p>
          </div>
        </div>

        <Link
          to="/watchtower"
          className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#D4AE6A] px-4 py-2.5 text-sm font-semibold text-[#151719] transition hover:bg-[#E9C786] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AE6A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#142135]"
        >
          Continue exploring
          <ArrowRight size={16} />
        </Link>
      </section>
    </main>
  );
}
