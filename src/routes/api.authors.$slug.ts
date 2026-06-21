import { createFileRoute } from "@tanstack/react-router";
import { getAuthorBySlug } from "../backend/controllers/authorsController";

export const Route = createFileRoute("/api/authors/$slug")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const result = getAuthorBySlug(params.slug);
        if (!result) {
          return new Response(
            JSON.stringify({ error: `Author not found with slug: ${params.slug}` }),
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
