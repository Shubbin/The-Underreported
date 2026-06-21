import { createFileRoute } from "@tanstack/react-router";
import { getArticles } from "../backend/controllers/articlesController";

export const Route = createFileRoute("/api/articles")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const category = url.searchParams.get("category") || undefined;
        const state = url.searchParams.get("state") || undefined;
        const authorSlug = url.searchParams.get("authorSlug") || undefined;
        const tag = url.searchParams.get("tag") || undefined;
        const from = url.searchParams.get("from") || undefined;
        const to = url.searchParams.get("to") || undefined;
        const q = url.searchParams.get("q") || undefined;
        const limit = url.searchParams.get("limit") || undefined;

        const results = getArticles({
          category,
          state,
          authorSlug,
          tag,
          from,
          to,
          q,
          limit,
        });

        return new Response(JSON.stringify(results), {
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
    },
  },
});
