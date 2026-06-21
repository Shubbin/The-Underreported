import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/editorial";
import { SITE_NAME } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: `Privacy — ${SITE_NAME}` },
      { name: "description", content: "How we handle personal data on this website." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Privacy" }]} />
      <header className="border-b-2 border-ink pb-6 mb-8">
        <h1 className="font-serif text-4xl font-bold tracking-tight text-ink">Privacy</h1>
      </header>
      <div className="prose-article">
        <p>
          This page describes the personal data {SITE_NAME} collects when you use this
          website, how we use that data, and your rights in relation to it.
        </p>
        <h2>What we collect</h2>
        <p>
          We collect the minimum data needed to deliver this website: standard server
          logs (IP address, user agent, requested URL), and any information you provide
          directly — for example when you subscribe to the newsletter or send us a
          message through the contact form.
        </p>
        <h2>How we use it</h2>
        <p>
          Server logs are retained for a short period for operational and security
          purposes. Newsletter addresses are used only to send the newsletter you
          subscribed to. Contact form submissions are forwarded to the newsroom inbox.
        </p>
        <h2>Cookies and analytics</h2>
        <p>
          We use a privacy-respecting analytics tool that does not set advertising
          cookies, does not track you across sites, and does not collect IP addresses
          in identifiable form.
        </p>
        <h2>Your rights</h2>
        <p>
          You can unsubscribe from the newsletter at any time. You may request a copy
          of personal data we hold about you, or its deletion, by writing to
          privacy@underreported.ng.
        </p>
      </div>
    </div>
  );
}
