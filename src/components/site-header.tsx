import { Link } from "@tanstack/react-router";
import { ALL_CATEGORIES, ALL_STATES, CATEGORY_LABEL } from "@/data/types";
import { SITE_NAME } from "@/lib/site";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

const PRIMARY_NAV: { label: string; to: string }[] = [
  { label: "Politics", to: "/politics" },
  { label: "Investigations", to: "/investigations" },
  { label: "Human Rights", to: "/human-rights" },
  { label: "Communities", to: "/communities" },
  { label: "Education", to: "/education" },
  { label: "Health", to: "/health" },
  { label: "Governance", to: "/governance" },
  { label: "Opinion", to: "/opinion" },
  { label: "Fact Check", to: "/fact-check" },
];

function todayString() {
  return new Date().toLocaleDateString("en-NG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b-2 border-ink bg-background">
      {/* Top utility strip */}
      <div className="border-b border-rule">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs text-ink-muted">
          <span className="hidden sm:inline">{todayString()}</span>
          <span className="sm:hidden">Independent · Nigeria</span>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-ink">About</Link>
            <Link to="/contact" className="hover:text-ink">Tip the newsroom</Link>
          </div>
        </div>
      </div>

      {/* Masthead */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="lg:hidden -ml-2 p-2 text-ink min-h-11 min-w-11 inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-newsroom"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
          <Link to="/" className="block">
            <div className="font-serif text-2xl sm:text-3xl font-bold leading-none tracking-tight text-ink">
              {SITE_NAME}
            </div>
            <div className="mt-1 hidden sm:block text-[11px] uppercase tracking-[0.18em] text-ink-muted">
              Independent · Nigeria · Since 2023
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/search"
            className="flex items-center gap-2 rounded-sm border border-ink px-3 py-1.5 text-sm text-ink hover:bg-ink hover:text-background transition-colors"
          >
            <Search size={14} />
            <span className="hidden sm:inline">Search</span>
          </Link>
          <Link
            to="/contact"
            className="hidden md:inline-flex rounded-sm bg-newsroom px-3 py-1.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Submit a tip
          </Link>
        </div>
      </div>

      {/* Section nav */}
      <nav className="hidden lg:block border-t border-rule">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 overflow-x-auto">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-newsroom border-newsroom" }}
              inactiveProps={{ className: "text-ink border-transparent hover:text-newsroom" }}
              className="whitespace-nowrap border-b-2 py-3 text-sm font-semibold tracking-tight"
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-auto py-3 text-xs text-ink-muted">
            <Link to="/archive" className="hover:text-ink">Archive</Link>
            <span className="mx-2">·</span>
            <Link to="/authors" className="hover:text-ink">Reporters</Link>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-nav" className="lg:hidden border-t border-rule bg-background">
          <nav aria-label="Mobile primary" className="mx-auto max-w-7xl px-4 py-4">
            <div className="grid grid-cols-2 gap-y-3 gap-x-6">
              {PRIMARY_NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-rule pb-2 text-sm font-semibold text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-5 rule-hair pt-4">
              <div className="text-[11px] uppercase tracking-[0.16em] text-ink-muted mb-2">
                States
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                {ALL_STATES.map((s) => (
                  <Link
                    key={s}
                    to="/states/$state"
                    params={{ state: s.toLowerCase() }}
                    onClick={() => setOpen(false)}
                    className="text-ink-muted hover:text-newsroom"
                  >
                    {s}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export { ALL_CATEGORIES, CATEGORY_LABEL };
