import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { ARTICLES } from "@/data/articles";
import { ALL_CATEGORIES, ALL_STATES } from "@/data/types";
import { AUTHORS } from "@/data/authors";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          "/",
          "/about",
          "/contact",
          "/ethics",
          "/corrections",
          "/privacy",
          "/terms",
          "/archive",
          "/search",
          "/authors",
        ];
        const catPaths = ALL_CATEGORIES.map((c) => `/${c}`);
        const statePaths = ALL_STATES.map((s) => `/states/${s.toLowerCase()}`);
        const authorPaths = AUTHORS.map((a) => `/authors/${a.slug}`);
        const articlePaths = ARTICLES.map((a) => ({
          path: `/${a.category}/${a.slug}`,
          lastmod: (a.updatedAt ?? a.publishedAt).slice(0, 10),
        }));

        const urls = [
          ...staticPaths.map((p) => `<url><loc>${BASE_URL}${p}</loc></url>`),
          ...catPaths.map((p) => `<url><loc>${BASE_URL}${p}</loc></url>`),
          ...statePaths.map((p) => `<url><loc>${BASE_URL}${p}</loc></url>`),
          ...authorPaths.map((p) => `<url><loc>${BASE_URL}${p}</loc></url>`),
          ...articlePaths.map(
            (a) => `<url><loc>${BASE_URL}${a.path}</loc><lastmod>${a.lastmod}</lastmod></url>`,
          ),
        ].join("\n  ");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
