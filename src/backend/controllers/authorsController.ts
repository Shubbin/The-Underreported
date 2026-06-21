import { AUTHORS, authorBySlug } from "../../data/authors";
import { ARTICLES } from "../../data/articles";

export function getAuthors() {
  return AUTHORS;
}

export function getAuthorBySlug(slug: string) {
  const author = authorBySlug(slug);
  if (!author) return null;

  const articles = ARTICLES.filter((a) => a.authorSlug === slug);

  return {
    author,
    articles,
  };
}
