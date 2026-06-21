import { createFileRoute, notFound } from "@tanstack/react-router";
import { AUTHORS, authorBySlug } from "@/data/authors";
import { articlesByAuthor } from "@/data/articles";
import { ArticleCard } from "@/components/article-card";
import { Breadcrumbs } from "@/components/editorial";
import { SITE_NAME } from "@/lib/site";
import { CATEGORY_LABEL, type Article, type Author } from "@/data/types";

export const Route = createFileRoute("/authors/$slug")({
  beforeLoad: ({ params }) => {
    if (!AUTHORS.find((a) => a.slug === params.slug)) throw notFound();
  },
  loader: ({ params }) => {
    const author = authorBySlug(params.slug);
    return { author, articles: articlesByAuthor(params.slug) };
  },
  head: ({ params, loaderData }) => {
    const name = loaderData?.author.name ?? "Author";
    return {
      meta: [
        { title: `${name} — ${SITE_NAME}` },
        { name: "description", content: loaderData?.author.bio ?? "" },
        { property: "og:title", content: name },
        { property: "og:type", content: "profile" },
        { property: "og:url", content: `/authors/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/authors/${params.slug}` }],
      scripts: loaderData
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: loaderData.author.name,
                jobTitle: loaderData.author.role,
                description: loaderData.author.bio,
                worksFor: { "@type": "NewsMediaOrganization", name: SITE_NAME },
              }),
            },
          ]
        : [],
    };
  },
  component: AuthorPage,
});

function AuthorPage() {
  const { author, articles } = Route.useLoaderData() as {
    author: Author;
    articles: Article[];
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Reporters", to: "/authors" }, { label: author.name }]} />

      <header className="border-b-2 border-ink pb-6 mb-8 flex flex-col sm:flex-row gap-6 sm:items-end">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-ink text-background font-semibold text-2xl">
          {author.initials}
        </div>
        <div>
          <div className="kicker mb-2">Reporter</div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-ink">{author.name}</h1>
          <div className="mt-1 text-ink-muted">{author.role} · {articles.length} reports</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {author.beats.map((b) => (
              <span key={b} className="text-[10px] uppercase tracking-[0.1em] font-bold text-newsroom">
                {CATEGORY_LABEL[b]}
              </span>
            ))}
          </div>
        </div>
      </header>

      <p className="font-serif text-lg text-ink max-w-3xl leading-relaxed mb-10">{author.bio}</p>

      <h2 className="font-serif text-2xl font-bold border-b-2 border-ink pb-2 mb-6">
        Reporting by {author.name.split(" ")[0]}
      </h2>
      <div>
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} variant="list" />
        ))}
      </div>
    </div>
  );
}
