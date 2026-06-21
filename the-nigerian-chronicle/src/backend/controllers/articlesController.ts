import { ARTICLES, articleBySlug, relatedArticles, adjacentArticles } from "../../data/articles";
import { authorBySlug } from "../../data/authors";

export function getArticles(params: {
  category?: string;
  state?: string;
  authorSlug?: string;
  tag?: string;
  from?: string;
  to?: string;
  q?: string;
  limit?: string;
}) {
  let results = ARTICLES;

  if (params.category) {
    results = results.filter((a) => a.category === params.category);
  }

  if (params.state) {
    results = results.filter(
      (a) => a.state?.toLowerCase() === params.state?.toLowerCase(),
    );
  }

  if (params.authorSlug) {
    results = results.filter((a) => a.authorSlug === params.authorSlug);
  }

  if (params.tag) {
    results = results.filter((a) => a.tags.includes(params.tag!));
  }

  if (params.from) {
    const fromTs = Date.parse(params.from);
    if (!isNaN(fromTs)) {
      results = results.filter((a) => Date.parse(a.publishedAt) >= fromTs);
    }
  }

  if (params.to) {
    const toTs = Date.parse(params.to) + 86400000; // inclusive end of day
    if (!isNaN(toTs)) {
      results = results.filter((a) => Date.parse(a.publishedAt) <= toTs);
    }
  }

  if (params.q) {
    const needle = params.q.trim().toLowerCase();
    if (needle) {
      results = results.filter((a) => {
        const hay = `${a.title} ${a.excerpt} ${a.tags.join(" ")} ${a.state ?? ""}`.toLowerCase();
        return hay.includes(needle);
      });
    }
  }

  if (params.limit) {
    const lim = parseInt(params.limit, 10);
    if (!isNaN(lim) && lim > 0) {
      results = results.slice(0, lim);
    }
  }

  return results;
}

export function getArticleBySlug(slug: string) {
  const article = articleBySlug(slug);
  if (!article) return null;

  const author = authorBySlug(article.authorSlug);
  const related = relatedArticles(article, 3);
  const adjacent = adjacentArticles(article);

  return {
    article,
    author,
    related,
    adjacent,
  };
}
