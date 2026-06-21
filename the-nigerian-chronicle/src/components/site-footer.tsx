import { Link } from "@tanstack/react-router";
import { ALL_STATES } from "@/data/types";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t-2 border-ink bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="font-serif text-xl font-bold text-ink">{SITE_NAME}</div>
            <p className="mt-3 text-sm text-ink-muted leading-relaxed">
              {SITE_TAGLINE}
            </p>
          </div>

          <div>
            <div className="kicker mb-3 !text-ink">Sections</div>
            <ul className="space-y-2 text-sm">
              {[
                ["Politics", "/politics"],
                ["Investigations", "/investigations"],
                ["Human Rights", "/human-rights"],
                ["Communities", "/communities"],
                ["Education", "/education"],
                ["Health", "/health"],
                ["Governance", "/governance"],
                ["Fact Check", "/fact-check"],
              ].map(([l, h]) => (
                <li key={h}>
                  <Link to={h} className="text-ink hover:text-newsroom">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="kicker mb-3 !text-ink">States</div>
            <ul className="grid grid-cols-2 gap-y-2 text-sm">
              {ALL_STATES.map((s) => (
                <li key={s}>
                  <Link
                    to="/states/$state"
                    params={{ state: s.toLowerCase() }}
                    className="text-ink hover:text-newsroom"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="kicker mb-3 !text-ink">Newsroom</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-ink hover:text-newsroom">About</Link></li>
              <li><Link to="/authors" className="text-ink hover:text-newsroom">Reporters</Link></li>
              <li><Link to="/ethics" className="text-ink hover:text-newsroom">Editorial ethics</Link></li>
              <li><Link to="/corrections" className="text-ink hover:text-newsroom">Corrections policy</Link></li>
              <li><Link to="/contact" className="text-ink hover:text-newsroom">Contact &amp; tips</Link></li>
              <li><Link to="/archive" className="text-ink hover:text-newsroom">Archive</Link></li>
              <li><Link to="/privacy" className="text-ink hover:text-newsroom">Privacy</Link></li>
              <li><Link to="/terms" className="text-ink hover:text-newsroom">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between text-xs text-ink-muted">
          <div>© {new Date().getFullYear()} {SITE_NAME}. Independent newsroom registered in Nigeria.</div>
          <div>Reporting in the public interest.</div>
        </div>
      </div>
    </footer>
  );
}
