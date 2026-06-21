import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ALL_CATEGORIES, CATEGORY_LABEL, type Category, type Article } from "@/data/types";
import { ArticleCard } from "@/components/article-card";
import { Breadcrumbs, SectionHead } from "@/components/editorial";
import { SITE_NAME } from "@/lib/site";
import { apiFetch } from "@/lib/api";

export const Route = createFileRoute("/$category")({
  beforeLoad: ({ params }) => {
    if (!ALL_CATEGORIES.includes(params.category as Category)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const category = params.category as Category;
    const articles = await apiFetch<Article[]>(`/api/articles?category=${category}`);
    return { category, articles };
  },
  head: ({ params }) => {
    const category = params.category as Category;
    const label = CATEGORY_LABEL[category] ?? "Section";
    const desc = `${label} reporting from ${SITE_NAME}. Investigations, accountability reporting, and field stories from across Nigeria.`;
    return {
      meta: [
        { title: `${label} — ${SITE_NAME}` },
        { name: "description", content: desc },
        { property: "og:title", content: `${label} — ${SITE_NAME}` },
        { property: "og:description", content: desc },
        { property: "og:url", content: `/${params.category}` },
      ],
      links: [{ rel: "canonical", href: `/${params.category}` }],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category, articles } = Route.useLoaderData() as {
    category: Category;
    articles: import("@/data/types").Article[];
  };
  const label = CATEGORY_LABEL[category];
  const [lead, ...rest] = articles;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label }]} />

      <header className="border-b-2 border-ink pb-6 mb-8">
        <div className="kicker mb-2">Section</div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-ink">{label}</h1>
        <p className="mt-3 max-w-3xl text-ink-muted">
          {articles.length} {articles.length === 1 ? "report" : "reports"} from our newsroom on {label.toLowerCase()} across Nigeria.
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="text-ink-muted">No stories yet in this section.</p>
      ) : (
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-2">
            {lead && <ArticleCard article={lead} variant="hero" />}
            <div className="pt-6 space-y-0">
              {rest.slice(0, 12).map((a) => (
                <ArticleCard key={a.slug} article={a} variant="list" />
              ))}
            </div>
          </div>

          <aside className="lg:border-l lg:border-rule lg:pl-8">
            <SectionHead kicker="More" title="Older in this section" />
            <ul className="space-y-4">
              {rest.slice(12, 25).map((a) => (
                <li key={a.slug}>
                  <ArticleCard article={a} variant="compact" />
                </li>
              ))}
            </ul>
            <div className="mt-8 border-2 border-ink p-5">
              <div className="kicker mb-2">Other sections</div>
              <ul className="space-y-1.5 text-sm">
                {ALL_CATEGORIES.filter(c => c !== category).map(c => (
                  <li key={c}>
                    <Link to="/$category" params={{ category: c }} className="text-ink hover:text-newsroom">
                      → {CATEGORY_LABEL[c]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
