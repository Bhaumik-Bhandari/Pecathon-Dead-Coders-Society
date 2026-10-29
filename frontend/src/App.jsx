import {
  Link,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import {
  ArrowLeft,
  Blocks,
  Sparkles,
} from "lucide-react";
import Watchtower from "./pages/Watchtower";
import CelestialScroll from "./pages/CelestialScroll";
import SpiritLens from "./pages/SpiritLens";
// Main application layout
import AppLayout from "./components/layout/AppLayout";

// Application pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

// --------------------------------------------------
// Placeholder page content
// These sections can be replaced with real pages later.
// --------------------------------------------------

const placeholderContent = {
  Modules: {
    title: "Your modules will live here.",
    description:
      "We'll organize the product's core functionality into reusable frontend modules after the problem statement is released.",
  },

  Activity: {
    title: "Activity will appear here.",
    description:
      "A useful activity feed will be added when we have real user actions and events to display.",
  },

  Settings: {
    title: "Workspace settings.",
    description:
      "Shared preferences and project configuration can be added here as the application grows.",
  },
};

// --------------------------------------------------
// Shared placeholder page component
// Used by Modules, Activity and Settings.
// --------------------------------------------------

function PlaceholderPage({ page }) {
  const content =
    placeholderContent[page] ?? placeholderContent.Modules;

  return (
    <section
      className="
        flex
        min-h-[55vh]
        flex-col
        items-center
        justify-center
        text-center
      "
    >
      {/* Placeholder icon */}
      <div
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          border
          border-[#E7DFD0]
          bg-gradient-to-br
          from-[#FAF1DF]
          to-[#F8E9E7]
          text-[#A77835]
        "
      >
        <Blocks size={27} strokeWidth={1.5} />
      </div>

      {/* Section label */}
      <p
        className="
          mt-6
          text-[10px]
          font-bold
          uppercase
          tracking-[0.2em]
          text-[#9A7850]
        "
      >
        Workspace section
      </p>

      {/* Page title */}
      <h1
        className="
          mt-3
          text-2xl
          font-bold
          tracking-tight
          text-[#182331]
        "
      >
        {content.title}
      </h1>

      {/* Page description */}
      <p
        className="
          mt-3
          max-w-lg
          text-sm
          leading-7
          text-[#77808B]
        "
      >
        {content.description}
      </p>

      {/* Return to dashboard */}
      <Link
        to="/"
        className="
          mt-6
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-[#182331]
          px-4
          py-3
          text-sm
          font-semibold
          text-white
          transition
          duration-200
          hover:bg-[#3A302D]
          hover:text-[#FFE5B9]
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#E9B15D]
        "
      >
        <ArrowLeft size={16} />
        Back to overview
      </Link>

      {/* Future functionality note */}
      <div
        className="
          mt-8
          flex
          items-center
          gap-2
          text-xs
          text-[#9299A1]
        "
      >
        <Sparkles
          size={14}
          className="text-[#CB9A4A]"
        />

        <span>
          This section is reserved for future functionality.
        </span>
      </div>
    </section>
  );
}

// --------------------------------------------------
// Main application routing
// Login stays outside AppLayout.
// Dashboard sections use the shared layout.
// --------------------------------------------------

export default function App() {
  return (
    <Routes>
      {/* Authentication route */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Main application routes */}
      <Route element={<AppLayout />}>
        {/* Dashboard / overview */}
        <Route
          index
          element={<Dashboard />}
        />
        <Route
          path="watchtower"
          element={<Watchtower />}
        />

        <Route
          path="celestial-scroll"
          element={<CelestialScroll />}
        />

        <Route
          path="spirit-lens"
          element={<SpiritLens />}
        />

        {/* Modules section */}
        <Route
          path="modules"
          element={<PlaceholderPage page="Modules" />}
        />

        {/* Activity section */}
        <Route
          path="activity"
          element={<PlaceholderPage page="Activity" />}
        />

        {/* Settings section */}
        <Route
          path="settings"
          element={<PlaceholderPage page="Settings" />}
        />
      </Route>

      {/* Redirect unknown routes to the dashboard */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}