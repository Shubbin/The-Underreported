import { createFileRoute, Link } from "@tanstack/react-router";
import { ARCHIVE_YEARS, ARTICLES, articlesByYear } from "@/data/articles";
import { ALL_CATEGORIES, CATEGORY_LABEL } from "@/data/types";
import { Breadcrumbs } from "@/components/editorial";
import { formatDateShort, SITE_NAME } from "@/lib/site";
import { useState } from "react";

export const Route = createFileRoute("/archive")({
  head: () => ({
    meta: [
      { title: `Archive — ${SITE_NAME}` },
      { name: "description", content: `Complete archive of ${ARTICLES.length} reports from ${SITE_NAME}, 2023 to present.` },
      { property: "og:title", content: `Archive — ${SITE_NAME}` },
      { property: "og:url", content: "/archive" },
    ],
    links: [{ rel: "canonical", href: "/archive" }],
  }),
  component: Archive,
});

function Archive() {
  const [year, setYear] = useState<number>(ARCHIVE_YEARS[0]);
  const [cat, setCat] = useState<string>("all");
  const yearArticles = articlesByYear(year).filter((a) => cat === "all" || a.category === cat);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Archive" }]} />

      <header className="border-b-2 border-ink pb-6 mb-8">
        <div className="kicker mb-2">Archive</div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-ink">
          The full archive
        </h1>
        <p className="mt-3 max-w-2xl text-ink-muted">
          {ARTICLES.length} reports published since 2023, indexed by year and section.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[200px_1fr]">
        <aside>
          <div className="kicker mb-3">Year</div>
          <ul className="space-y-1.5">
            {ARCHIVE_YEARS.map((y) => (
              <li key={y}>
                <button
                  onClick={() => setYear(y)}
                  className={`block w-full text-left text-sm py-1 ${y === year ? "font-bold text-newsroom" : "text-ink hover:text-newsroom"}`}
                >
                  {y} <span className="text-ink-muted text-xs">({articlesByYear(y).length})</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="kicker mt-8 mb-3">Section</div>
          <ul className="space-y-1.5">
            <li>
              <button onClick={() => setCat("all")} className={`text-sm ${cat === "all" ? "font-bold text-newsroom" : "text-ink hover:text-newsroom"}`}>All sections</button>
            </li>
            {ALL_CATEGORIES.map((c) => (
              <li key={c}>
                <button onClick={() => setCat(c)} className={`text-sm ${cat === c ? "font-bold text-newsroom" : "text-ink hover:text-newsroom"}`}>{CATEGORY_LABEL[c]}</button>
              </li>
            ))}
          </ul>
        </aside>

        <div>
          <h2 className="font-serif text-2xl font-bold text-ink border-b border-ink pb-2 mb-4">
            {year} <span className="text-ink-muted text-lg font-normal">· {yearArticles.length} {yearArticles.length === 1 ? "report" : "reports"}</span>
          </h2>
          <ul className="divide-y divide-rule">
            {yearArticles.map((a) => (
              <li key={a.slug} className="py-3 grid grid-cols-[100px_1fr] gap-4 items-start">
                <span className="text-xs text-ink-muted tabular-nums pt-0.5">{formatDateShort(a.publishedAt)}</span>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.12em] font-bold text-newsroom mb-0.5">
                    {CATEGORY_LABEL[a.category]}{a.state && ` · ${a.state}`}
                  </div>
                  <Link
                    to="/$category/$slug"
                    params={{ category: a.category, slug: a.slug }}
                    className="font-serif text-base font-bold text-ink hover:text-newsroom leading-snug"
                  >
                    {a.title}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
