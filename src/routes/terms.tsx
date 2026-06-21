import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/editorial";
import { SITE_NAME } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: `Terms — ${SITE_NAME}` },
      { name: "description", content: "Terms of use for this website." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Terms" }]} />
      <header className="border-b-2 border-ink pb-6 mb-8">
        <h1 className="font-serif text-4xl font-bold tracking-tight text-ink">Terms of use</h1>
      </header>
      <div className="prose-article">
        <p>
          By using this website you agree to the terms below. They are intentionally
          brief and written in plain language.
        </p>
        <h2>Copyright</h2>
        <p>
          Reports, photographs, illustrations and design on this site are © {new Date().getFullYear()} {SITE_NAME}
          unless otherwise credited. You may quote short excerpts with attribution
          and a link back to the source page. For republication of full articles,
          please contact the editorial desk.
        </p>
        <h2>No warranty</h2>
        <p>
          We make every effort to ensure that information on this site is accurate at
          the time of publication, but provide no warranty as to its continuing
          accuracy. Stories are corrected as described in our{" "}
          corrections policy.
        </p>
        <h2>Third-party links</h2>
        <p>
          We are not responsible for the content of external websites we link to. A
          link does not constitute endorsement.
        </p>
      </div>
    </div>
  );
}
