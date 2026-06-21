import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleCard } from "@/components/article-card";
import { Newsletter, SectionHead } from "@/components/editorial";
import { ALL_STATES, CATEGORY_LABEL, type Category, type Article } from "@/data/types";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import { apiFetch } from "@/lib/api";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE_NAME} — Independent Nigerian Investigative Journalism` },
      { name: "description", content: SITE_TAGLINE },
      { property: "og:title", content: SITE_NAME },
      { property: "og:description", content: SITE_TAGLINE },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  loader: async () => {
    return {
      articles: await apiFetch<Article[]>("/api/articles"),
    };
  },
  component: Home,
});

function byCategory(articles: Article[], cat: Category, n = 4) {
  return articles.filter((a) => a.category === cat).slice(0, n);
}

function Home() {
  const { articles } = Route.useLoaderData();
  const hero = articles.find((a) => a.isInvestigation) ?? articles[0];
  const featured = articles.filter((a) => a.slug !== hero.slug).slice(0, 2);
  const latest = articles.filter((a) => ![hero.slug, ...featured.map(f => f.slug)].includes(a.slug)).slice(0, 6);
  const trending = articles.slice(20, 25);

  const politics = byCategory(articles, "politics", 4);
  const education = byCategory(articles, "education", 4);
  const health = byCategory(articles, "health", 4);
  const humanRights = byCategory(articles, "human-rights", 4);
  const accountability = articles.filter(a => a.category === "governance" || a.category === "investigations").slice(0, 5);
  const underreported = articles.filter(a => a.state).slice(10, 16);

  return (
    <div>
      {/* HERO + RAIL */}
      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-4 py-8 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ArticleCard article={hero} variant="hero" />
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {featured.map((a) => (
                <ArticleCard key={a.slug} article={a} variant="feature" />
              ))}
            </div>
          </div>

          <aside className="lg:border-l lg:border-rule lg:pl-8">
            <div className="kicker mb-3 pb-2 border-b border-ink">Trending now</div>
            <ol className="space-y-4">
              {trending.map((a, i) => (
                <li key={a.slug} className="grid grid-cols-[auto_1fr] gap-3 border-b border-rule pb-4 last:border-0">
                  <div className="font-serif text-2xl font-bold text-newsroom leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <Link
                    to="/$category/$slug"
                    params={{ category: a.category, slug: a.slug }}
                    className="group block"
                  >
                    <div className="text-[10px] uppercase tracking-[0.12em] font-bold text-ink-muted mb-1">
                      {CATEGORY_LABEL[a.category]}
                    </div>
                    <div className="font-serif text-base font-bold leading-snug text-ink group-hover:text-newsroom">
                      {a.title}
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      {/* LATEST REPORTS */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHead
          kicker="Latest"
          title="Latest reports"
          right={<Link to="/archive" className="text-newsroom font-semibold hover:underline">View archive →</Link>}
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((a) => (
            <ArticleCard key={a.slug} article={a} variant="stacked" />
          ))}
        </div>
      </section>

      {/* UNDERREPORTED + ACCOUNTABILITY (two-column) */}
      <section className="mx-auto max-w-7xl px-4 py-6 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionHead
            kicker="From the field"
            title="Underreported Nigeria"
            description="Stories from communities and states often left out of national coverage."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {underreported.map((a) => (
              <ArticleCard key={a.slug} article={a} variant="stacked" />
            ))}
          </div>
        </div>

        <div>
          <SectionHead kicker="Tracker" title="Accountability" />
          <ul className="space-y-4">
            {accountability.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} variant="compact" />
              </li>
            ))}
          </ul>
          <div className="mt-6 border-2 border-ink p-5">
            <div className="kicker mb-2">By state</div>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              {ALL_STATES.map((s) => (
                <Link
                  key={s}
                  to="/states/$state"
                  params={{ state: s.toLowerCase() }}
                  className="text-ink hover:text-newsroom"
                >
                  → {s} State
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HUMAN RIGHTS WATCH */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHead
          kicker="Watch"
          title="Human Rights"
          right={<Link to="/human-rights" className="text-newsroom font-semibold hover:underline">All human rights →</Link>}
        />
        <div className="grid gap-8 md:grid-cols-4">
          {humanRights.map((a) => (
            <ArticleCard key={a.slug} article={a} variant="stacked" />
          ))}
        </div>
      </section>

      {/* POLITICS */}
      <section className="mx-auto max-w-7xl px-4 py-6 grid gap-12 lg:grid-cols-3 border-t border-rule">
        <div className="lg:col-span-2 pt-10">
          <SectionHead
            kicker="Section"
            title="Politics"
            right={<Link to="/politics" className="text-newsroom font-semibold hover:underline">All politics →</Link>}
          />
          {politics.length > 0 && (
            <>
              <ArticleCard article={politics[0]} variant="feature" />
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {politics.slice(1).map((a) => (
                  <ArticleCard key={a.slug} article={a} variant="stacked" showExcerpt={false} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="pt-10 lg:border-l lg:border-rule lg:pl-8">
          <SectionHead kicker="Section" title="Education" />
          <ul className="space-y-4">
            {education.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} variant="compact" />
              </li>
            ))}
          </ul>
          <Link
            to="/education"
            className="mt-4 inline-block text-sm font-semibold text-newsroom hover:underline"
          >
            All education →
          </Link>
        </div>
      </section>

      {/* HEALTH */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHead
          kicker="Section"
          title="Health"
          right={<Link to="/health" className="text-newsroom font-semibold hover:underline">All health →</Link>}
        />
        <div className="grid gap-8 md:grid-cols-4">
          {health.map((a) => (
            <ArticleCard key={a.slug} article={a} variant="stacked" />
          ))}
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
