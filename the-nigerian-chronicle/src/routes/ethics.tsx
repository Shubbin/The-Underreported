import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/editorial";
import { SITE_NAME } from "@/lib/site";

export const Route = createFileRoute("/ethics")({
  head: () => ({
    meta: [
      { title: `Editorial ethics — ${SITE_NAME}` },
      { name: "description", content: "Our editorial standards, source protection, and conflict-of-interest policy." },
      { property: "og:url", content: "/ethics" },
    ],
    links: [{ rel: "canonical", href: "/ethics" }],
  }),
  component: Ethics,
});

function Ethics() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Editorial ethics" }]} />
      <header className="border-b-2 border-ink pb-6 mb-8">
        <div className="kicker mb-2">Policy</div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-ink">
          Editorial ethics
        </h1>
      </header>

      <div className="prose-article">
        <p>
          Every reporter and editor at {SITE_NAME} is bound by the standards below.
          We publish them so that readers, subjects of our reporting, and sources can
          hold us to account.
        </p>
        <h2>Accuracy</h2>
        <p>
          We do not publish what we cannot verify. Where a claim is provided by a
          single source, we say so. Where documents support a claim, we describe them
          and, where safe, link to them. Where a person has been accused of wrongdoing,
          we contact them for a response before publication.
        </p>
        <h2>Source protection</h2>
        <p>
          Where we agree to protect the identity of a source, that agreement is
          absolute. We do not disclose identifying information to courts, advertisers,
          funders, government bodies or anyone else.
        </p>
        <h2>Independence and conflicts of interest</h2>
        <p>
          Reporters disclose financial interests, family ties and prior employment
          relationships to their editors. Where a conflict exists, the story is
          reassigned. Editors do not accept paid trips, gifts above token value, or
          honoraria from subjects of reporting.
        </p>
        <h2>Funding transparency</h2>
        <p>
          Our funding sources are listed publicly and updated annually. No funder
          reviews or approves editorial content prior to publication.
        </p>
        <h2>Use of generative AI</h2>
        <p>
          We do not generate reporting, headlines or quotes using large language models.
          Translation tools may be used for non-English source material, and translations
          are reviewed by a human before publication.
        </p>
      </div>
    </div>
  );
}
