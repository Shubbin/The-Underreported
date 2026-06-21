import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/editorial";
import { SITE_NAME } from "@/lib/site";

export const Route = createFileRoute("/corrections")({
  head: () => ({
    meta: [
      { title: `Corrections policy — ${SITE_NAME}` },
      { name: "description", content: "How we handle corrections, clarifications and retractions." },
      { property: "og:url", content: "/corrections" },
    ],
    links: [{ rel: "canonical", href: "/corrections" }],
  }),
  component: Corrections,
});

function Corrections() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Corrections policy" }]} />
      <header className="border-b-2 border-ink pb-6 mb-8">
        <div className="kicker mb-2">Policy</div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-ink">
          Corrections policy
        </h1>
      </header>

      <div className="prose-article">
        <p>
          {SITE_NAME} corrects errors of fact promptly and visibly. We do not silently
          edit published reports.
        </p>
        <h2>What we correct</h2>
        <p>
          Any error of fact — including names, places, dates, financial figures, quotes
          and the description of events. Differences of opinion, interpretation or
          emphasis are not subject to correction, though we welcome letters in response.
        </p>
        <h2>How corrections appear</h2>
        <p>
          A correction is appended at the foot of the affected story, dated, and
          describing what was previously stated and what the correct information is.
          For corrections affecting headlines, the original headline is preserved in
          the correction note.
        </p>
        <h2>Retractions</h2>
        <p>
          Where a story is found to be substantially wrong, we retract it. The page is
          kept online with the headline replaced by a retraction note, so that the
          historical record of what was previously claimed is not erased.
        </p>
        <h2>How to request a correction</h2>
        <p>
          Write to corrections@underreported.ng with the story URL and a description
          of the error. We aim to respond within two working days.
        </p>
      </div>
    </div>
  );
}
