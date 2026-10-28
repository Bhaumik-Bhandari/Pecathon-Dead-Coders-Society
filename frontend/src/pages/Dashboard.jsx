import {
  Blocks,
  CheckCircle2,
  Clock3,
  Code2,
  Palette,
  Sparkles,
} from "lucide-react";

import Panel from "../components/ui/Panel";
import StatCard from "../components/ui/StatCard";
import StatusBadge from "../components/ui/StatusBadge";
import { dashboardStats, setupItems } from "../data/dashboardData";

function BuildStep({ number, title, description, isLast = false }) {
  return (
    <div className="flex gap-3.5">
      <div className="flex flex-col items-center">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#E9E2D5] bg-[#FAF6EE] text-xs font-bold text-[#9B733B]">
          {number}
        </div>

        {!isLast && <div className="mt-2 w-px flex-1 bg-[#E8E6E0]" />}
      </div>

      <div className={isLast ? "pb-0" : "pb-6"}>
        <h3 className="text-sm font-semibold text-[#263342]">{title}</h3>
        <p className="mt-1.5 text-sm leading-6 text-[#77808B]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Dashboard() {

  return (
    <div className="dashboard-page relative z-0 min-h-full space-y-7">
      {/* Page heading */}
      <section className="flex flex-col gap-3">
        <div className="max-w-2xl">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#C9A570]" />
            <p className="text-xs font-semibold uppercase tracking-[0.19em] text-[#C9A570]">
              The foundation
            </p>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-[#F2E9DB] sm:text-3xl">
            Workspace overview
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#B9B2A7] sm:text-base">
            A flexible starting point for your PECathon project. We’ll add the
            actual product workflow once the problem statement is released.
          </p>
        </div>
      </section>


      {/* Overview cards */}
      <section
        aria-label="Workspace summary"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {dashboardStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      {/* Main content */}
      <section className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(290px,0.85fr)]">
        <Panel
          id="build-checklist"
          title="Foundation checklist"
          description="The shared pieces are prepared first so future features can be added cleanly."
          action={
            <span className="rounded-lg bg-[#F4F2ED] px-2.5 py-1.5 text-xs font-medium text-[#727B85]">
              {setupItems.length} items
            </span>
          }
          className="dashboard-anchor"
        >
          <div className="divide-y divide-[#F0EFEB]">
            {setupItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-start gap-3.5 py-4 first:pt-0 last:pb-0"
                >
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5F3EE] text-[#7F7059]">
                    <Icon size={18} strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-[#293644]">
                        {item.title}
                      </h3>

                      <StatusBadge status={item.status}>
                        {item.statusLabel}
                      </StatusBadge>
                    </div>

                    <p className="mt-1.5 text-sm leading-6 text-[#818993]">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel
          title="Build sequence"
          description="A simple order of work that avoids premature implementation."
        >
          <div className="pt-1">
            <BuildStep
              number="01"
              title="Prepare the foundation"
              description="Layout, design tokens and reusable components."
            />

            <BuildStep
              number="02"
              title="Map the problem to the UI"
              description="Identify users, key actions, screens and required outputs."
            />

            <BuildStep
              number="03"
              title="Connect the functionality"
              description="Integrate data, backend APIs and meaningful states."
              isLast
            />
          </div>
        </Panel>
      </section>

      {/* Design principles */}
      <Panel
        title="Frontend principles"
        description="The rules we’ll follow as the project grows."
        action={<Sparkles size={18} className="text-[#C18C3E]" />}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-[#EEEBE4] bg-[#FCFBF8] p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F8E9E6] text-[#C94B43]">
              <Blocks size={18} />
            </div>

            <h3 className="mt-3 text-sm font-semibold text-[#293644]">
              Reusable by default
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-[#818993]">
              Common layouts and UI patterns live in shared components.
            </p>
          </div>

          <div className="rounded-xl border border-[#EEEBE4] bg-[#FCFBF8] p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FBF1DF] text-[#A66D16]">
              <Palette size={18} />
            </div>

            <h3 className="mt-3 text-sm font-semibold text-[#293644]">
              Subtle visual identity
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-[#818993]">
              Neutral surfaces with restrained amber, crimson and sakura details.
            </p>
          </div>

          <div className="rounded-xl border border-[#EEEBE4] bg-[#FCFBF8] p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF0EA] text-[#53735A]">
              <Code2 size={18} />
            </div>

            <h3 className="mt-3 text-sm font-semibold text-[#293644]">
              Easy to explain
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-[#818993]">
              Clear component responsibilities, readable code and no unnecessary
              dependencies.
            </p>
          </div>
        </div>
      </Panel>

      {/* Small reminder */}
      <div className="flex items-start gap-3 rounded-2xl border border-[#E9DFCC] bg-gradient-to-r from-[#FBF5E9] via-[#FDF9F3] to-[#F8EEEE] p-4 sm:p-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#B17A30] shadow-sm">
          <Clock3 size={18} />
        </div>

        <div>
          <p className="text-sm font-semibold text-[#56432B]">
            Keep the product open-ended for now
          </p>

          <p className="mt-1 text-sm leading-6 text-[#827461]">
            We’re intentionally leaving domain-specific features out until the
            official problem statement tells us what the application must do.
          </p>
        </div>

        <CheckCircle2
          size={18}
          className="ml-auto mt-1 hidden shrink-0 text-[#A17B42] sm:block"
        />
      </div>
    </div>
  );
}