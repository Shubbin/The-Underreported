import { Link } from "@tanstack/react-router";
import type { Article } from "@/data/types";
import { CATEGORY_LABEL } from "@/data/types";
import { formatDateShort } from "@/lib/site";
import { authorBySlug } from "@/data/authors";

type Variant = "hero" | "feature" | "list" | "compact" | "stacked";

export function ArticleCard({
  article,
  variant = "list",
  showExcerpt = true,
}: {
  article: Article;
  variant?: Variant;
  showExcerpt?: boolean;
}) {
  const author = authorBySlug(article.authorSlug);
  const to = "/$category/$slug" as const;
  const params = { category: article.category, slug: article.slug };

  if (variant === "hero") {
    return (
      <article className="border-b border-rule pb-8">
        <Link to={to} params={params} className="group block">
          <div className="kicker mb-3">
            {article.isInvestigation ? "Investigation" : CATEGORY_LABEL[article.category]}
            {article.state && <span className="text-ink-muted ml-2 font-medium tracking-normal normal-case">· {article.state} State</span>}
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-[1.05] tracking-tight text-ink group-hover:text-newsroom transition-colors">
            {article.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed max-w-3xl">
            {article.subtitle}
          </p>
          <div className="mt-5 text-sm text-ink-muted">
            <span className="font-semibold text-ink">{author.name}</span>
            <span className="mx-2">·</span>
            {formatDateShort(article.publishedAt)}
            <span className="mx-2">·</span>
            {article.readingMinutes} min read
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "feature") {
    return (
      <article className="group">
        <Link to={to} params={params} className="block">
          <div className="kicker mb-2">{CATEGORY_LABEL[article.category]}</div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-ink group-hover:text-newsroom transition-colors">
            {article.title}
          </h2>
          {showExcerpt && (
            <p className="mt-3 text-ink-muted leading-relaxed">{article.excerpt}</p>
          )}
          <div className="mt-3 text-xs text-ink-muted">
            <span className="font-semibold text-ink">{author.name}</span> · {formatDateShort(article.publishedAt)}
            {article.state && <> · {article.state} State</>}
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="border-b border-rule pb-3 last:border-0">
        <Link to={to} params={params} className="group block">
          <div className="text-[10px] uppercase tracking-[0.12em] font-bold text-newsroom mb-1">
            {CATEGORY_LABEL[article.category]}
          </div>
          <h3 className="font-sans text-sm font-semibold leading-snug text-ink group-hover:text-newsroom transition-colors">
            {article.title}
          </h3>
          <div className="mt-1 text-[11px] text-ink-muted">
            {formatDateShort(article.publishedAt)}
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "stacked") {
    return (
      <article className="group flex flex-col">
        <Link to={to} params={params} className="block">
          <div className="kicker mb-2">{CATEGORY_LABEL[article.category]}</div>
          <h3 className="font-serif text-lg font-bold leading-snug text-ink group-hover:text-newsroom transition-colors">
            {article.title}
          </h3>
          {showExcerpt && (
            <p className="mt-2 text-sm text-ink-muted leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>
          )}
          <div className="mt-3 text-xs text-ink-muted">
            {author.name} · {formatDateShort(article.publishedAt)}
          </div>
        </Link>
      </article>
    );
  }

  // list
  return (
    <article className="grid grid-cols-[auto_1fr] gap-4 sm:gap-6 border-b border-rule py-5 last:border-0">
      <div className="hidden sm:flex h-16 w-16 items-center justify-center border border-ink text-ink font-serif text-xs uppercase tracking-wider">
        {CATEGORY_LABEL[article.category].split(" ")[0].slice(0, 4)}
      </div>
      <div>
        <Link to={to} params={params} className="group block">
          <div className="kicker mb-1">
            {CATEGORY_LABEL[article.category]}
            {article.state && <span className="text-ink-muted ml-2 font-medium tracking-normal normal-case">· {article.state}</span>}
          </div>
          <h3 className="font-serif text-xl font-bold leading-tight text-ink group-hover:text-newsroom transition-colors">
            {article.title}
          </h3>
          {showExcerpt && (
            <p className="mt-2 text-sm text-ink-muted leading-relaxed">{article.excerpt}</p>
          )}
          <div className="mt-2 text-xs text-ink-muted">
            <span className="font-semibold text-ink">{author.name}</span> · {formatDateShort(article.publishedAt)} · {article.readingMinutes} min read
          </div>
        </Link>
      </div>
    </article>
  );
}
