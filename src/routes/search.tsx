import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { ARTICLES } from "@/data/articles";
import {
  ALL_CATEGORIES,
  ALL_STATES,
  CATEGORY_LABEL,
  type Category,
  type NigerianState,
} from "@/data/types";
import { Breadcrumbs } from "@/components/editorial";
import { formatDateShort, SITE_NAME } from "@/lib/site";
import { useMemo } from "react";
import { Search, X } from "lucide-react";

const ALL_TAGS = [
  "accountability",
  "budget",
  "procurement",
  "elections",
  "rural",
  "field-report",
  "documents",
  "policy",
  "reform",
  "primary-health",
  "schools",
  "land",
  "security",
  "transparency",
  "audit",
] as const;

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  category: fallback(z.enum(ALL_CATEGORIES as [Category, ...Category[]]).optional(), undefined),
  state: fallback(z.enum(ALL_STATES as [NigerianState, ...NigerianState[]]).optional(), undefined),
  tag: fallback(z.string().optional(), undefined),
  from: fallback(z.string().optional(), undefined),
  to: fallback(z.string().optional(), undefined),
});

type SearchParams = z.infer<typeof searchSchema>;

function runSearch(s: SearchParams) {
  const hasFilters = Boolean(s.q || s.category || s.state || s.tag || s.from || s.to);
  if (!hasFilters) return { hasFilters, results: [] as typeof ARTICLES };
  const needle = (s.q ?? "").trim().toLowerCase();
  const fromTs = s.from ? Date.parse(s.from) : -Infinity;
  const toTs = s.to ? Date.parse(s.to) + 86_400_000 : Infinity;
  const results = ARTICLES.filter((a) => {
    if (s.category && a.category !== s.category) return false;
    if (s.state && a.state !== s.state) return false;
    if (s.tag && !a.tags.includes(s.tag)) return false;
    const ts = Date.parse(a.publishedAt);
    if (ts < fromTs || ts > toTs) return false;
    if (needle) {
      const hay = `${a.title} ${a.excerpt} ${a.tags.join(" ")} ${a.state ?? ""}`.toLowerCase();
      if (!hay.includes(needle)) return false;
    }
    return true;
  }).slice(0, 100);
  return { hasFilters, results };
}

function describeFilters(s: SearchParams): string {
  const parts: string[] = [];
  if (s.q) parts.push(`“${s.q}”`);
  if (s.category) parts.push(CATEGORY_LABEL[s.category]);
  if (s.state) parts.push(s.state);
  if (s.tag) parts.push(`#${s.tag}`);
  if (s.from || s.to) parts.push(`${s.from ?? "…"} → ${s.to ?? "…"}`);
  return parts.join(" · ");
}

export const Route = createFileRoute("/search")({
  validateSearch: zodValidator(searchSchema),
  head: (ctx: { match?: { search?: SearchParams } }) => {
    const s: SearchParams = ctx.match?.search ?? ({ q: "" } as SearchParams);
    const hasFilters = Boolean(s.q || s.category || s.state || s.tag || s.from || s.to);
    const summary = hasFilters ? describeFilters(s) : "";
    const title = hasFilters
      ? `Search: ${summary} — ${SITE_NAME}`
      : `Search the newsroom — ${SITE_NAME}`;
    const description = hasFilters
      ? `Reports matching ${summary} in the ${SITE_NAME} archive.`
      : `Search ${ARTICLES.length}+ investigative reports by keyword, Nigerian state, category, tag, or date.`;

    // Bare /search is a useful landing page — index it.
    // Filtered variants are noindex,follow and canonicalise to /search
    // so query-string permutations don't fragment ranking.
    const canonical = "/search";
    const robots = hasFilters ? "noindex,follow" : "index,follow";

    const meta: Array<Record<string, string>> = [
      { title },
      { name: "description", content: description },
      { name: "robots", content: robots },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:type", content: "website" },
    ];

    const scripts: Array<{ type: string; children: string }> = [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "/search?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ];

    if (hasFilters) {
      const { results } = runSearch(s);
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SearchResultsPage",
          name: title,
          description,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: results.length,
            itemListElement: results.slice(0, 20).map((a, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `/${a.category}/${a.slug}`,
              name: a.title,
            })),
          },
        }),
      });
    }

    return {
      meta,
      links: [{ rel: "canonical", href: canonical }],
      scripts,
    };
  },
  component: SearchPage,
});

function SearchPage() {
  const { q, category, state, tag, from, to } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });

  const update = (patch: Record<string, string | undefined>) =>
    navigate({
      search: ((prev: Record<string, unknown>) => {
        const next: Record<string, unknown> = { ...prev, ...patch };
        for (const k of Object.keys(next)) if (next[k] === "" || next[k] === undefined) delete next[k];
        return next;
      }) as never,
      replace: true,
    });

  const hasFilters = Boolean(q || category || state || tag || from || to);

  const results = useMemo(() => {
    if (!hasFilters) return [];
    const needle = q.trim().toLowerCase();
    const fromTs = from ? Date.parse(from) : -Infinity;
    const toTs = to ? Date.parse(to) + 86_400_000 : Infinity; // inclusive end-of-day
    return ARTICLES.filter((a) => {
      if (category && a.category !== category) return false;
      if (state && a.state !== state) return false;
      if (tag && !a.tags.includes(tag)) return false;
      const ts = Date.parse(a.publishedAt);
      if (ts < fromTs || ts > toTs) return false;
      if (needle) {
        const hay = `${a.title} ${a.excerpt} ${a.tags.join(" ")} ${a.state ?? ""}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    }).slice(0, 100);
  }, [hasFilters, q, category, state, tag, from, to]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Search" }]} />

      <header className="border-b-2 border-ink pb-6 mb-8">
        <div className="kicker mb-2">Search</div>
        <h1 className="font-serif text-4xl font-bold tracking-tight text-ink">
          Search the newsroom
        </h1>
        <p className="mt-3 text-ink-muted">
          Filter {ARTICLES.length} reports by keyword, state, category, tag, or date.
        </p>
      </header>

      <form role="search" aria-label="Search reports" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="q" className="sr-only">Search keyword</label>
        <div className="flex items-center gap-3 border-2 border-ink p-3 focus-within:ring-2 focus-within:ring-newsroom">
          <Search size={18} className="text-ink-muted" aria-hidden="true" />
          <input
            id="q"
            type="search"
            autoFocus
            value={q}
            onChange={(e) => update({ q: e.target.value })}
            placeholder="Try: ‘Ogun’, ‘procurement’, ‘primary health’…"
            className="w-full bg-transparent outline-none text-base text-ink placeholder:text-ink-muted"
          />
          {q && (
            <button
              type="button"
              onClick={() => update({ q: "" })}
              aria-label="Clear search keyword"
              className="text-ink-muted hover:text-ink"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <fieldset className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <legend className="sr-only">Filters</legend>

          <div>
            <label htmlFor="f-category" className="block text-[11px] uppercase tracking-[0.14em] font-bold text-ink mb-1">
              Category
            </label>
            <select
              id="f-category"
              value={category ?? ""}
              onChange={(e) => update({ category: e.target.value || undefined })}
              className="w-full border border-ink bg-background px-2 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-newsroom"
            >
              <option value="">All categories</option>
              {ALL_CATEGORIES.map((c) => (
                <option key={c} value={c}>{CATEGORY_LABEL[c]}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="f-state" className="block text-[11px] uppercase tracking-[0.14em] font-bold text-ink mb-1">
              State
            </label>
            <select
              id="f-state"
              value={state ?? ""}
              onChange={(e) => update({ state: e.target.value || undefined })}
              className="w-full border border-ink bg-background px-2 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-newsroom"
            >
              <option value="">All states</option>
              {ALL_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="f-tag" className="block text-[11px] uppercase tracking-[0.14em] font-bold text-ink mb-1">
              Tag
            </label>
            <select
              id="f-tag"
              value={tag ?? ""}
              onChange={(e) => update({ tag: e.target.value || undefined })}
              className="w-full border border-ink bg-background px-2 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-newsroom"
            >
              <option value="">All tags</option>
              {ALL_TAGS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="f-from" className="block text-[11px] uppercase tracking-[0.14em] font-bold text-ink mb-1">
              From
            </label>
            <input
              id="f-from"
              type="date"
              value={from ?? ""}
              max={to ?? undefined}
              onChange={(e) => update({ from: e.target.value || undefined })}
              className="w-full border border-ink bg-background px-2 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-newsroom"
            />
          </div>

          <div>
            <label htmlFor="f-to" className="block text-[11px] uppercase tracking-[0.14em] font-bold text-ink mb-1">
              To
            </label>
            <input
              id="f-to"
              type="date"
              value={to ?? ""}
              min={from ?? undefined}
              onChange={(e) => update({ to: e.target.value || undefined })}
              className="w-full border border-ink bg-background px-2 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-newsroom"
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={() =>
                navigate({ search: {} as Record<string, never>, replace: true })
              }
              disabled={!hasFilters}
              className="w-full border-2 border-ink bg-background px-3 py-2 text-sm font-semibold text-ink hover:bg-ink hover:text-background disabled:opacity-40 disabled:hover:bg-background disabled:hover:text-ink"
            >
              Reset filters
            </button>
          </div>
        </fieldset>
      </form>

      <div className="mt-8" aria-live="polite" aria-busy="false">
        {!hasFilters && (
          <p className="text-ink-muted text-sm">
            Enter a keyword or pick a filter to begin. {ARTICLES.length} reports available.
          </p>
        )}
        {hasFilters && (
          <p className="text-sm text-ink-muted mb-4">
            {results.length} {results.length === 1 ? "result" : "results"}
            {q && <> for “<span className="text-ink font-semibold">{q}</span>”</>}
          </p>
        )}
        {hasFilters && results.length === 0 && (
          <p className="text-ink">No reports match the current filters. Try widening the date range or clearing a filter.</p>
        )}
        <ul className="divide-y divide-rule">
          {results.map((a) => (
            <li key={a.slug} className="py-4">
              <div className="text-[10px] uppercase tracking-[0.12em] font-bold text-newsroom mb-1">
                {CATEGORY_LABEL[a.category]}{a.state && ` · ${a.state}`} · {formatDateShort(a.publishedAt)}
              </div>
              <Link
                to="/$category/$slug"
                params={{ category: a.category, slug: a.slug }}
                className="font-serif text-lg font-bold text-ink hover:text-newsroom focus:outline-none focus-visible:ring-2 focus-visible:ring-newsroom"
              >
                {a.title}
              </Link>
              <p className="mt-1 text-sm text-ink-muted line-clamp-2">{a.excerpt}</p>
              {a.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {a.tags.slice(0, 4).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => update({ tag: t })}
                      className="text-[11px] border border-rule px-2 py-0.5 text-ink-muted hover:border-ink hover:text-ink"
                      aria-label={`Filter by tag ${t}`}
                    >
                      #{t}
                    </button>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
