import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ALL_STATES, type NigerianState, type Article } from "@/data/types";
import { ArticleCard } from "@/components/article-card";
import { Breadcrumbs, SectionHead } from "@/components/editorial";
import { SITE_NAME } from "@/lib/site";
import { apiFetch } from "@/lib/api";

function normalize(s: string): NigerianState | undefined {
  const target = s.toLowerCase();
  return ALL_STATES.find((x) => x.toLowerCase() === target);
}

export const Route = createFileRoute("/states/$state")({
  beforeLoad: ({ params }) => {
    if (!normalize(params.state)) throw notFound();
  },
  loader: async ({ params }) => {
    const state = normalize(params.state)!;
    try {
      const articles = await apiFetch<Article[]>(`/api/articles?state=${encodeURIComponent(state)}`);
      return { state, articles };
    } catch (err) {
      throw notFound();
    }
  },
  head: ({ params, loaderData }) => {
    const state = loaderData?.state ?? "Nigeria";
    const title = `${state} State — Reporting from ${SITE_NAME}`;
    const desc = `Investigations, governance and community reporting from ${state} State, Nigeria.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `/states/${params.state}` },
      ],
      links: [{ rel: "canonical", href: `/states/${params.state}` }],
    };
  },
  component: StatePage,
});

function StatePage() {
  const { state, articles } = Route.useLoaderData() as {
    state: NigerianState;
    articles: import("@/data/types").Article[];
  };
  const [lead, ...rest] = articles;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "States" }, { label: `${state} State` }]} />

      <header className="border-b-2 border-ink pb-6 mb-8">
        <div className="kicker mb-2">State desk</div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-ink">
          {state} State
        </h1>
        <p className="mt-3 max-w-3xl text-ink-muted">
          {articles.length} {articles.length === 1 ? "report" : "reports"} from {state} State — covering governance, community issues, accountability and public services.
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="text-ink-muted">No reports yet from {state} State. Check back soon.</p>
      ) : (
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {lead && <ArticleCard article={lead} variant="hero" />}
            <div className="mt-8">
              {rest.slice(0, 14).map((a) => (
                <ArticleCard key={a.slug} article={a} variant="list" />
              ))}
            </div>
          </div>

          <aside className="lg:border-l lg:border-rule lg:pl-8">
            <SectionHead kicker="Other states" title="Reporting from" />
            <ul className="space-y-2 text-sm">
              {ALL_STATES.filter((s) => s !== state).map((s) => (
                <li key={s}>
                  <Link
                    to="/states/$state"
                    params={{ state: s.toLowerCase() }}
                    className="text-ink hover:text-newsroom"
                  >
                    → {s} State
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}
    </div>
  );
}
