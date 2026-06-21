import { apiFetch } from "@/lib/api";

export function SectionHead({
  kicker,
  title,
  description,
  right,
}: {
  kicker?: string;
  title: string;
  description?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 border-b-2 border-ink pb-3">
      <div>
        {kicker && <div className="kicker mb-1">{kicker}</div>}
        <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-ink">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl text-sm text-ink-muted">{description}</p>
        )}
      </div>
      {right && <div className="shrink-0 text-sm">{right}</div>}
    </div>
  );
}

export function Newsletter() {
  return (
    <section className="my-16 border-y-2 border-ink bg-paper">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-2 md:items-center">
        <div>
          <div className="kicker mb-2">The Weekly Brief</div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-ink">
            Underreported stories, in your inbox every Friday.
          </h2>
          <p className="mt-2 text-ink-muted">
            A short, careful read from our newsroom — investigations,
            community reporting, and stories the major outlets are missing.
            No advertising. Unsubscribe in one click.
          </p>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            const emailInput = form.elements.namedItem("email") as HTMLInputElement;
            const email = emailInput?.value || "";
            try {
              await apiFetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
              });
              alert("Thanks — please confirm your subscription from the email we just sent.");
              form.reset();
            } catch (err) {
              alert("Something went wrong. Please try again.");
            }
          }}
          className="flex flex-col gap-2 sm:flex-row"
        >
          <input
            required
            name="email"
            type="email"
            placeholder="you@example.com"
            className="flex-1 border border-ink bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-newsroom"
          />
          <button
            type="submit"
            className="bg-ink px-5 py-3 text-sm font-semibold text-background hover:bg-newsroom transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; to?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {it.to ? (
              <a href={it.to} className="hover:text-newsroom">{it.label}</a>
            ) : (
              <span className="text-ink">{it.label}</span>
            )}
            {i < items.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
