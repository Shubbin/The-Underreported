import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/editorial";
import { SITE_NAME } from "@/lib/site";
import { apiFetch } from "@/lib/api";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact & tips — ${SITE_NAME}` },
      { name: "description", content: "Reach our newsroom, submit a confidential tip, or send documents securely." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />

      <header className="border-b-2 border-ink pb-6 mb-8">
        <div className="kicker mb-2">Newsroom</div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-ink">
          Contact &amp; tips
        </h1>
        <p className="mt-3 text-ink-muted">
          We welcome story ideas, documents and first-hand accounts. The right channel depends on how sensitive your information is.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <section className="border-2 border-ink p-6">
          <div className="kicker mb-2">General desk</div>
          <h2 className="font-serif text-xl font-bold mb-2">Editorial</h2>
          <p className="text-sm text-ink-muted mb-3">
            For story ideas, press releases, syndication and corrections.
          </p>
          <p className="text-sm">editorial@underreported.ng</p>
        </section>

        <section className="border-2 border-newsroom p-6">
          <div className="kicker mb-2">Confidential</div>
          <h2 className="font-serif text-xl font-bold mb-2">Secure tip line</h2>
          <p className="text-sm text-ink-muted mb-3">
            For whistleblowers and sensitive documents. We accept Signal and SecureDrop. We
            do not log identifying metadata on these channels.
          </p>
          <p className="text-sm">Signal: +234 (XXX) on request<br/>SecureDrop: published on request</p>
        </section>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);
          const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            subject: formData.get("subject") as string,
            message: formData.get("message") as string,
          };
          try {
            await apiFetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });
            alert("Thanks — a member of the newsroom will respond within 3 working days.");
            form.reset();
          } catch (err) {
            alert("Something went wrong. Please try again.");
          }
        }}
        className="mt-10 border-t-2 border-ink pt-8"
      >
        <h2 className="font-serif text-2xl font-bold mb-4">Send a message</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm">
            <span className="block font-semibold mb-1">Name</span>
            <input required name="name" className="w-full border border-ink px-3 py-2" />
          </label>
          <label className="text-sm">
            <span className="block font-semibold mb-1">Email</span>
            <input required name="email" type="email" className="w-full border border-ink px-3 py-2" />
          </label>
          <label className="text-sm sm:col-span-2">
            <span className="block font-semibold mb-1">Subject</span>
            <input required name="subject" className="w-full border border-ink px-3 py-2" />
          </label>
          <label className="text-sm sm:col-span-2">
            <span className="block font-semibold mb-1">Message</span>
            <textarea required name="message" rows={6} className="w-full border border-ink px-3 py-2" />
          </label>
        </div>
        <button type="submit" className="mt-4 bg-ink px-5 py-3 text-sm font-semibold text-background hover:bg-newsroom">
          Send to newsroom
        </button>
      </form>
    </div>
  );
}
