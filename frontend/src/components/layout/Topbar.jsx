
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Bell,
  ChevronDown,
  Settings2,
  Search,
  ArrowRight,
  CornerDownLeft,
} from "lucide-react";

const searchItems = [
  {
    title: "Overview",
    description: "Go to your main dashboard",
    path: "/",
    keywords: "home dashboard main",
  },
  {
    title: "Modules",
    description: "Explore your modules",
    path: "/modules",
    keywords: "module features tools",
  },
  {
    title: "Activity",
    description: "View recent activity",
    path: "/activity",
    keywords: "recent history updates",
  },
  {
    title: "Settings",
    description: "Manage workspace settings",
    path: "/settings",
    keywords: "preferences configuration account",
  },
];

export default function Topbar({ activePage, onMenuClick }) {
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return searchItems;
    }

    return searchItems.filter((item) =>
      `${item.title} ${item.description} ${item.keywords}`
        .toLowerCase()
        .includes(query)
    );
  }, [searchQuery]);

  useEffect(() => {
    function handlePointerDown(event) {
      if (!searchRef.current?.contains(event.target)) {
        setSearchOpen(false);
      }

      if (!profileRef.current?.contains(event.target)) {
        setProfileOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setProfileOpen(false);
        inputRef.current?.blur();
      }

      // Keyboard shortcut: Ctrl+K or Cmd+K
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        setSearchOpen(true);
        inputRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [searchQuery]);

  function openResult(item) {
    navigate(item.path);
    setSearchQuery("");
    setSearchOpen(false);
    inputRef.current?.blur();
  }

  function handleSearchKeyDown(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSearchOpen(true);

      if (filteredItems.length) {
        setActiveIndex((index) =>
          Math.min(index + 1, filteredItems.length - 1)
        );
      }
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (filteredItems.length) {
        setActiveIndex((index) => Math.max(index - 1, 0));
      }
    }

    if (event.key === "Enter" && filteredItems.length) {
      event.preventDefault();
      openResult(filteredItems[activeIndex]);
    }

    if (event.key === "Escape") {
      setSearchOpen(false);
    }
  }

  return (
    <header
      className="sticky top-0 z-30 flex h-[72px] items-center
        justify-between gap-3 border-b border-[#d9cfc0]/15
        px-4 sm:px-7 lg:px-10"
      style={{
        backgroundColor: "var(--dashboard-background-color)",
        backgroundImage: "var(--dashboard-background-image)",
      }}
    >
      {/* Left: mobile navigation and current page */}
      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation"
          onClick={onMenuClick}
          className="rounded-xl border border-white/10 bg-white/5
            p-2.5 text-[#B9B2A7] transition
            hover:bg-white/10 hover:text-[#F2E9DB] md:hidden"
        >
          <Menu size={18} />
        </button>

        <div className="hidden min-w-0 sm:block">
          <p className="text-[10px] font-semibold uppercase
            tracking-[0.18em] text-[#C9A570]"
          >
            PECATHON / WORKSPACE
          </p>

          <p className="mt-1 truncate text-sm font-semibold
            text-[#F2E9DB]"
          >
            {activePage}
          </p>
        </div>
      </div>

      {/* Center: search input and dropdown share one hover area */}
      <div
        ref={searchRef}
        className="relative mx-auto hidden w-full max-w-[560px]
          flex-1 md:block"
        onMouseEnter={() => setSearchOpen(true)}
        onMouseLeave={() => setSearchOpen(false)}
      >
        <div
          className={`relative flex h-12 items-center gap-3
            rounded-xl border px-4 transition-all duration-200
            ${
              searchOpen
                ? "border-[#C9A570]/60 bg-[#1B1B19] shadow-[0_0_0_3px_rgba(201,165,112,0.06)]"
                : "border-white/10 bg-black/20 hover:border-white/20"
            }`}
        >
          <Search
            size={17}
            className={`shrink-0 transition-colors ${
              searchOpen ? "text-[#E9B15D]" : "text-[#A9A196]"
            }`}
          />

          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            placeholder="Search pages..."
            aria-label="Search workspace"
            aria-expanded={searchOpen}
            aria-controls="workspace-search-results"
            aria-autocomplete="list"
            role="combobox"
            onFocus={() => setSearchOpen(true)}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setSearchOpen(true);
            }}
            onKeyDown={handleSearchKeyDown}
            className="min-w-0 flex-1 bg-transparent text-base
              text-[#F2E9DB] outline-none placeholder:text-[#827D73]"
          />

          {searchQuery && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setSearchQuery("");
                inputRef.current?.focus();
                setSearchOpen(true);
              }}
              className="text-xs text-[#A9A196] hover:text-white"
            >
              Clear
            </button>
          )}

          {!searchQuery && (
            <span className="hidden items-center gap-1 rounded-md
              border border-white/10 px-1.5 py-1 text-[10px]
              text-[#A9A196] lg:flex"
            >
              <CommandIcon />
              K
            </span>
          )}
        </div>

        {searchOpen && (
          <div
            id="workspace-search-results"
            role="listbox"
            className="absolute left-0 right-0 top-full z-50
              pt-2"
          >
            <div className="overflow-hidden rounded-2xl border
              border-[#D9CFC0]/15 bg-[#191A18]
              shadow-[0_18px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center justify-between
                border-b border-white/[0.07] px-4 py-3"
              >
                <p className="text-[10px] font-semibold uppercase
                  tracking-[0.2em] text-[#C9A570]"
                >
                  {searchQuery.trim() ? "Search results" : "Quick navigation"}
                </p>

                <span className="text-[10px] text-[#827D73]">
                  {filteredItems.length}{" "}
                  {filteredItems.length === 1 ? "result" : "results"}
                </span>
              </div>

              <div className="search-results-scrollbar max-h-[340px] overflow-y-auto p-2">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <button
                      key={item.path}
                      type="button"
                      role="option"
                      aria-selected={activeIndex === index}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => openResult(item)}
                      className={`flex w-full items-center gap-3
                        rounded-xl px-3 py-3 text-left
                        transition-colors duration-150
                        ${
                          activeIndex === index
                            ? "bg-white/[0.08]"
                            : "hover:bg-white/[0.05]"
                        }`}
                    >
                      <span className={`flex h-9 w-9 shrink-0
                        items-center justify-center rounded-xl
                        border transition-colors ${
                          activeIndex === index
                            ? "border-[#D94C42]/30 bg-[#D94C42]/10 text-[#E9B15D]"
                            : "border-white/10 bg-white/[0.03] text-[#A9A196]"
                        }`}
                      >
                        <Search size={15} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium
                          text-[#F2E9DB]"
                        >
                          {item.title}
                        </span>

                        <span className="mt-1 block truncate text-xs
                          text-[#A9A196]"
                        >
                          {item.description}
                        </span>
                      </span>

                      <ArrowRight
                        size={15}
                        className={`shrink-0 transition-all ${
                          activeIndex === index
                            ? "translate-x-0 text-[#E9B15D] opacity-100"
                            : "-translate-x-1 text-[#827D73] opacity-0"
                        }`}
                      />
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center">
                    <Search
                      size={22}
                      className="mx-auto mb-3 text-[#827D73]"
                    />
                    <p className="text-sm font-medium text-[#F2E9DB]">
                      No results found
                    </p>
                    <p className="mt-1 text-xs text-[#A9A196]">
                      Try another page name or keyword.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 border-t
                border-white/[0.07] px-4 py-2.5"
              >
                <span className="flex items-center gap-1.5
                  text-[10px] text-[#827D73]"
                >
                  <CornerDownLeft size={12} />
                  Open result
                </span>

                <span className="text-[10px] text-[#827D73]">
                  ↑ ↓ Navigate
                </span>

                <span className="ml-auto text-[10px] text-[#827D73]">
                  ESC to close
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right: status, notifications and team profile */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <div className="hidden items-center gap-2 rounded-full
          border border-white/10 bg-black/20 px-3 py-2 xl:flex"
        >
          <span className="h-2 w-2 rounded-full bg-[#D9A34B]" />
          <span className="text-xs font-medium text-[#D4CCC0]">
            Problem statement pending
          </span>
        </div>

        <button
          type="button"
          aria-label="Notification status"
          title="No new notifications"
          className="relative rounded-xl p-2.5 text-[#B9B2A7]
            transition hover:bg-white/10 hover:text-[#F2E9DB]"
        >
          <Bell size={19} strokeWidth={1.8} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5
            rounded-full bg-[#D94C42]"
          />
        </button>

        <div ref={profileRef} className="relative">
          <button
            type="button"
            aria-label="Open team profile"
            aria-haspopup="true"
            aria-expanded={profileOpen}
            aria-controls="team-profile-menu"
            onClick={() => setProfileOpen((open) => !open)}
            className="flex items-center gap-1 rounded-full p-1
              transition hover:bg-white/10 focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-[#E9B15D]"
          >
            <span
              className="flex h-9 w-9 items-center justify-center
                rounded-full border border-[#E5D3B3] bg-[#F2E5CE]
                text-xs font-bold text-[#75542B]"
              title="Team workspace"
            >
              DCS
            </span>

            <ChevronDown
              size={15}
              className={`mr-1 text-[#E9D4B1] transition-transform
                duration-200 ${profileOpen ? "rotate-180" : ""}`}
            />
          </button>

          {profileOpen && (
            <div
              id="team-profile-menu"
              className="absolute right-0 top-full z-50 mt-2
                w-60 rounded-2xl border border-[#d9cfc0]/15
                bg-[#191a1a] p-2
                shadow-[0_14px_40px_rgba(0,0,0,0.35)]"
            >
              <div className="px-3 py-2.5">
                <p className="text-sm font-semibold text-[#F2E9DB]">
                  Dead Coders Society
                </p>
                <p className="mt-0.5 text-xs text-[#B9B2A7]">
                  PECathon team workspace
                </p>
              </div>

              <div className="my-1 h-px bg-white/10" />

              <Link
                to="/settings"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 rounded-xl
                  px-3 py-2.5 text-sm font-medium text-[#D4CCC0]
                  transition hover:bg-white/10 hover:text-[#F2E9DB]"
              >
                <Settings2 size={16} />
                Workspace settings
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function CommandIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5.5 5.5V3.75a1.75 1.75 0 1 0-1.75 1.75H5.5Zm0 0h5m-5 0v5m0 0H3.75a1.75 1.75 0 1 0 1.75 1.75V10.5Zm5 0v1.75a1.75 1.75 0 1 0 1.75-1.75H10.5Zm0 0v-5m0 0h1.75a1.75 1.75 0 1 0-1.75-1.75V5.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
