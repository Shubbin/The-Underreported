import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  adjacentArticles,
  articleBySlug,
  relatedArticles,
} from "@/data/articles";
import { ALL_CATEGORIES, CATEGORY_LABEL, type Category, type Article } from "@/data/types";
import { authorBySlug } from "@/data/authors";
import type { Author } from "@/data/types";
import { ArticleCard } from "@/components/article-card";
import { Breadcrumbs } from "@/components/editorial";
import { formatDate, SITE_NAME } from "@/lib/site";

interface LoaderData {
  article: Article;
  related: Article[];
  adjacent: { prev?: Article; next?: Article };
  author: Author;
}

export const Route = createFileRoute("/$category/$slug")({
  beforeLoad: ({ params }) => {
    if (!ALL_CATEGORIES.includes(params.category as Category)) throw notFound();
    const a = articleBySlug(params.slug);
    if (!a || a.category !== params.category) throw notFound();
  },
  loader: ({ params }) => {
    const article = articleBySlug(params.slug)!;
    return {
      article,
      related: relatedArticles(article, 3),
      adjacent: adjacentArticles(article),
      author: authorBySlug(article.authorSlug),
    };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return { meta: [] };
    const a = loaderData.article;
    const url = `/${params.category}/${params.slug}`;
    return {
      meta: [
        { title: `${a.title} — ${SITE_NAME}` },
        { name: "description", content: a.excerpt },
        { name: "author", content: loaderData.author.name },
        { property: "article:published_time", content: a.publishedAt },
        { property: "article:section", content: CATEGORY_LABEL[a.category] },
        { property: "og:type", content: "article" },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.excerpt },
        { property: "og:url", content: url },
        { name: "twitter:title", content: a.title },
        { name: "twitter:description", content: a.excerpt },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: a.title,
            description: a.excerpt,
            datePublished: a.publishedAt,
            dateModified: a.updatedAt ?? a.publishedAt,
            articleSection: CATEGORY_LABEL[a.category],
            keywords: a.tags.join(", "),
            author: {
              "@type": "Person",
              name: loaderData.author.name,
            },
            publisher: {
              "@type": "NewsMediaOrganization",
              name: SITE_NAME,
            },
            mainEntityOfPage: url,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              {
                "@type": "ListItem",
                position: 2,
                name: CATEGORY_LABEL[a.category],
                item: `/${a.category}`,
              },
              { "@type": "ListItem", position: 3, name: a.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article, related, adjacent, author } = Route.useLoaderData() as LoaderData;
  const headings = article.body
    .filter((b: string) => b.startsWith("## "))
    .map((b: string) => b.replace(/^##\s+/, ""));

  return (
    <article className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: CATEGORY_LABEL[article.category], to: `/${article.category}` },
          { label: article.title.length > 60 ? article.title.slice(0, 60) + "…" : article.title },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
        <div className="max-w-3xl">
          {/* HEAD */}
          <header className="border-b border-rule pb-6">
            <div className="kicker mb-3">
              {article.isInvestigation ? "Investigation" : CATEGORY_LABEL[article.category]}
              {article.state && (
                <span className="ml-2 font-medium tracking-normal normal-case text-ink-muted">
                  · {article.state} State
                </span>
              )}
              {article.factChecked && (
                <span className="ml-3 inline-block border border-newsroom px-1.5 py-0.5 text-[10px] font-bold text-newsroom tracking-[0.1em]">
                  FACT-CHECKED
                </span>
              )}
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-[1.05] tracking-tight text-ink">
              {article.title}
            </h1>
            <p className="mt-4 text-lg text-ink-muted leading-relaxed font-serif">
              {article.subtitle}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm border-t border-rule pt-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-background font-semibold text-xs">
                  {author.initials}
                </div>
                <div>
                  <Link to="/authors/$slug" params={{ slug: author.slug }} className="font-semibold text-ink hover:text-newsroom">
                    {author.name}
                  </Link>
                  <div className="text-xs text-ink-muted">{author.role}</div>
                </div>
              </div>
              <div className="text-ink-muted">
                <div>Published <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time></div>
                {article.updatedAt && (
                  <div className="text-xs">Updated <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time></div>
                )}
              </div>
              <div className="text-ink-muted text-sm">{article.readingMinutes} min read</div>
            </div>
          </header>

          {/* FEATURED IMAGE — editorial monochrome placeholder */}
          <figure className="my-8">
            <div className="relative aspect-[16/9] w-full overflow-hidden border border-ink bg-ink">
              <div className="absolute inset-0 flex items-center justify-center text-background/70 text-xs uppercase tracking-[0.2em]">
                Field photograph · {article.state ?? "Nigeria"}
              </div>
              <div
                aria-hidden
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent 0 6px, rgba(255,255,255,0.06) 6px 7px)",
                }}
              />
            </div>
            <figcaption className="mt-2 text-xs text-ink-muted">
              File photograph. Reporting and photography by {author.name} for {SITE_NAME}.
            </figcaption>
          </figure>

          {/* TABLE OF CONTENTS */}
          {headings.length > 0 && (
            <nav className="mb-8 border-l-2 border-ink pl-4 lg:hidden">
              <div className="kicker mb-2">In this report</div>
              <ol className="space-y-1 text-sm">
                {headings.map((h) => (
                  <li key={h}>
                    <a href={`#${slugifyHeading(h)}`} className="text-ink hover:text-newsroom">{h}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* BODY */}
          <div className="prose-article">
            {article.body.map((block, i) => {
              if (block.startsWith("## ")) {
                const h = block.replace(/^##\s+/, "");
                return <h2 key={i} id={slugifyHeading(h)}>{h}</h2>;
              }
              if (block.startsWith("> ")) {
                return <p key={i} className="pull-quote">{block.slice(2)}</p>;
              }
              return <p key={i}>{block}</p>;
            })}
          </div>

          {/* SOURCES */}
          {article.sources && article.sources.length > 0 && (
            <section className="mt-10 border-t-2 border-ink pt-6">
              <div className="kicker mb-3">Sources &amp; references</div>
              <ul className="space-y-1 text-sm text-ink-muted">
                {article.sources.map((s, i) => (
                  <li key={i}>• {s.label}</li>
                ))}
              </ul>
            </section>
          )}

          {/* TAGS */}
          <div className="mt-10 border-t border-rule pt-6 flex flex-wrap gap-2">
            {article.tags.map((t) => (
              <span key={t} className="border border-rule px-2 py-1 text-xs text-ink-muted">
                #{t}
              </span>
            ))}
          </div>

          {/* SHARE */}
          <div className="mt-8 border-y border-rule py-4 flex flex-wrap items-center gap-4 text-sm">
            <span className="kicker !text-ink">Share</span>
            {[
              ["X / Twitter", `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`],
              ["Facebook", `https://www.facebook.com/sharer/sharer.php?u=`],
              ["WhatsApp", `https://wa.me/?text=${encodeURIComponent(article.title)}`],
              ["Email", `mailto:?subject=${encodeURIComponent(article.title)}`],
              ["Copy link", "#"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="text-ink hover:text-newsroom underline underline-offset-4">
                {label}
              </a>
            ))}
          </div>

          {/* PREV/NEXT */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 border-t-2 border-ink pt-6">
            {adjacent.prev && (
              <Link
                to="/$category/$slug"
                params={{ category: adjacent.prev.category, slug: adjacent.prev.slug }}
                className="group block"
              >
                <div className="kicker mb-2">← Previous</div>
                <div className="font-serif text-lg font-bold leading-snug text-ink group-hover:text-newsroom">
                  {adjacent.prev.title}
                </div>
              </Link>
            )}
            {adjacent.next && (
              <Link
                to="/$category/$slug"
                params={{ category: adjacent.next.category, slug: adjacent.next.slug }}
                className="group block sm:text-right"
              >
                <div className="kicker mb-2">Next →</div>
                <div className="font-serif text-lg font-bold leading-snug text-ink group-hover:text-newsroom">
                  {adjacent.next.title}
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* RIGHT RAIL */}
        <aside className="hidden lg:block">
          <div className="sticky top-6 space-y-8">
            {headings.length > 0 && (
              <nav className="border-l-2 border-ink pl-4">
                <div className="kicker mb-2">In this report</div>
                <ol className="space-y-1.5 text-sm">
                  {headings.map((h) => (
                    <li key={h}>
                      <a href={`#${slugifyHeading(h)}`} className="text-ink hover:text-newsroom">
                        {h}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="border-2 border-ink p-5">
              <div className="kicker mb-2">About the reporter</div>
              <div className="font-serif text-lg font-bold text-ink">{author.name}</div>
              <div className="text-xs text-ink-muted">{author.role}</div>
              <p className="mt-3 text-sm text-ink-muted leading-relaxed">{author.bio}</p>
              <Link
                to="/authors/$slug"
                params={{ slug: author.slug }}
                className="mt-3 inline-block text-sm font-semibold text-newsroom hover:underline"
              >
                More by {author.name.split(" ")[0]} →
              </Link>
            </div>

            <div>
              <div className="kicker mb-2 pb-2 border-b border-ink">Related</div>
              <ul className="space-y-4 pt-2">
                {related.map((a) => (
                  <li key={a.slug}>
                    <ArticleCard article={a} variant="compact" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* MOBILE RELATED */}
      <section className="lg:hidden mt-12 border-t-2 border-ink pt-6">
        <div className="kicker mb-4">Related reports</div>
        <div className="grid gap-6 sm:grid-cols-3">
          {related.map((a) => (
            <ArticleCard key={a.slug} article={a} variant="stacked" />
          ))}
        </div>
      </section>
    </article>
  );
}

function slugifyHeading(h: string) {
  return h.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
