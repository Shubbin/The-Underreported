import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/editorial";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${SITE_NAME}` },
      { name: "description", content: `${SITE_NAME} is an independent newsroom focused on underreported stories in Nigeria.` },
      { property: "og:title", content: `About — ${SITE_NAME}` },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "About" }]} />
      <header className="border-b-2 border-ink pb-6 mb-8">
        <div className="kicker mb-2">About</div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-ink">
          About {SITE_NAME}
        </h1>
        <p className="mt-4 text-lg text-ink-muted font-serif leading-relaxed">{SITE_TAGLINE}</p>
      </header>

      <div className="prose-article">
        <p>
          {SITE_NAME} is an independent Nigerian newsroom established in 2023. We exist
          to report on the stories that are routinely missed or under-covered by larger
          outlets: governance failures at the state and local government levels,
          investigations into public spending, abuses of fundamental rights, and the
          everyday lives of communities outside the centres of national attention.
        </p>
        <h2>What we cover</h2>
        <p>
          Our reporting spans politics, investigations, human rights, education, health,
          governance and the lived experience of communities. We maintain dedicated state
          desks for Ogun, Oyo, Osun, Ekiti, Lagos, Ondo, Kwara, Niger, Benue and Taraba,
          with a particular focus on subnational accountability.
        </p>
        <h2>How we are funded</h2>
        <p>
          {SITE_NAME} is funded through reader contributions, small philanthropic grants
          for specific investigative projects, and limited syndication revenue. We do not
          accept payment to publish, suppress, or alter editorial coverage. A summary of
          our funding sources is published annually.
        </p>
        <h2>Editorial independence</h2>
        <p>
          Every story is the responsibility of the named reporter and the editor who
          approved it. We do not allow funders, advertisers, public officials or political
          actors any prior review of editorial content. See our{" "}
          <Link to="/ethics">editorial ethics policy</Link> and{" "}
          <Link to="/corrections">corrections policy</Link>.
        </p>
        <h2>Contact</h2>
        <p>
          For tips, document leaks or whistleblower reporting, please use the secure
          channels listed on our <Link to="/contact">contact page</Link>. We treat the
          identity of sources as a matter of obligation.
        </p>
      </div>
    </div>
  );
}
