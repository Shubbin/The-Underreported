import { createFileRoute } from "@tanstack/react-router";
import { submitContactMessage } from "../backend/controllers/contactController";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: any = {};
        try {
          body = await request.json();
        } catch (err) {
          return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const result = submitContactMessage({
          name: body.name,
          email: body.email,
          subject: body.subject,
          message: body.message,
        });

        if (!result.success) {
          return new Response(JSON.stringify({ error: result.error }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify(result), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
