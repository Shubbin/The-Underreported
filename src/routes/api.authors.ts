import { createFileRoute } from "@tanstack/react-router";
import { getAuthors } from "../backend/controllers/authorsController";

export const Route = createFileRoute("/api/authors")({
  server: {
    handlers: {
      GET: async () => {
        const results = getAuthors();
        return new Response(JSON.stringify(results), {
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
    },
  },
});
