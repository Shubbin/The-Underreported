import { createFileRoute } from "@tanstack/react-router";
import { getArticleBySlug } from "../backend/controllers/articlesController";

export const Route = createFileRoute("/api/articles/$slug")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const result = getArticleBySlug(params.slug);
        if (!result) {
          return new Response(
            JSON.stringify({ error: `Article not found with slug: ${params.slug}` }),
            {
              status: 404,
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
        }

        return new Response(JSON.stringify(result), {
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
    },
  },
});
