import { createFileRoute } from '@tanstack/react-router'
import { Breadcrumbs } from "@/components/editorial";
import { CATEGORY_LABEL, type Author, type Article } from "@/data/types";
import { SITE_NAME } from "@/lib/site";
import { apiFetch } from "@/lib/api";

export const Route = createFileRoute("/authors")({
  head: () => ({
    meta: [
      { title: `Reporters & editors — ${SITE_NAME}` },
      { name: "description", content: "The reporters, editors and contributors behind our newsroom." },
      { property: "og:url", content: "/authors" },
    ],
    links: [{ rel: "canonical", href: "/authors" }],
  }),
  loader: async () => {
    const [authors, articles] = await Promise.all([
      apiFetch<Author[]>("/api/authors"),
      apiFetch<Article[]>("/api/articles"),
    ]);
    return { authors, articles };
  },
  component: AuthorsIndex,
});

function AuthorsIndex() {
  const { authors, articles } = Route.useLoaderData() as {
    authors: Author[];
    articles: Article[];
  };
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Reporters" }]} />

      <header className="border-b-2 border-ink pb-6 mb-10">
        <div className="kicker mb-2">Newsroom</div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-ink">
          Reporters &amp; editors
        </h1>
        <p className="mt-3 max-w-2xl text-ink-muted">
          The people whose bylines you read. Every report is the work of a named journalist,
          accountable for what they publish.
        </p>
      </header>

      <ul className="grid gap-8 md:grid-cols-2">
        {AUTHORS.map((a) => {
          const count = articlesByAuthor(a.slug).length;
          return (
            <li key={a.slug} className="flex gap-4 border-b border-rule pb-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink text-background font-semibold">
                {a.initials}
              </div>
              <div>
                <Link
                  to="/authors/$slug"
                  params={{ slug: a.slug }}
                  className="font-serif text-xl font-bold text-ink hover:text-newsroom"
                >
                  {a.name}
                </Link>
                <div className="text-xs text-ink-muted">{a.role} · {count} reports</div>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{a.bio}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {a.beats.map((b) => (
                    <span key={b} className="text-[10px] uppercase tracking-[0.1em] font-bold text-newsroom">
                      {CATEGORY_LABEL[b]}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
