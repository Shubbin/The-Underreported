import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="kicker">Error 404</div>
        <h1 className="mt-2 font-serif text-5xl font-bold tracking-tight text-ink">
          Page not found
        </h1>
        <p className="mt-3 text-ink-muted">
          The page you are looking for has been moved, retired, or never existed.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/" className="bg-ink px-4 py-2 text-sm font-semibold text-background hover:bg-newsroom">Back to homepage</Link>
          <Link to="/archive" className="border border-ink px-4 py-2 text-sm font-semibold text-ink hover:bg-ink hover:text-background">Browse archive</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="kicker">Something went wrong</div>
        <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-ink">
          This page didn't load
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Try refreshing, or return to the homepage.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="bg-ink px-4 py-2 text-sm font-semibold text-background hover:bg-newsroom"
          >
            Try again
          </button>
          <a href="/" className="border border-ink px-4 py-2 text-sm font-semibold text-ink hover:bg-ink hover:text-background">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${SITE_NAME} — Independent Nigerian Investigative Journalism` },
      { name: "description", content: SITE_TAGLINE },
      { name: "author", content: SITE_NAME },
      { name: "theme-color", content: "#111111" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: `${SITE_NAME} — Independent Nigerian Investigative Journalism` },
      { property: "og:description", content: SITE_TAGLINE },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_NG" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Underreported" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Source+Serif+4:ital,wght@0,400;0,600;0,700;1,400&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsMediaOrganization",
          name: SITE_NAME,
          url: "/",
          description: SITE_TAGLINE,
          areaServed: "NG",
          knowsAbout: [
            "Investigative journalism",
            "Public accountability",
            "Human rights",
            "Governance",
            "Nigerian politics",
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:text-background focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
