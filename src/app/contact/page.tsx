import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui";
import { PageHero } from "@/components/sections";
import { ContactForm } from "@/components/forms";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Free Quote",
  description: `Request a free security quote from ${SITE.name}. Licensed guards, mobile patrol and fire watch across Toronto and the GTA, with dispatch available 24/7.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const details = [
    { icon: Phone, label: "Call us", value: SITE.phone, href: SITE.phoneHref },
    { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Clock, label: "Hours", value: SITE.hours },
    { icon: MapPin, label: "Based in", value: `${SITE.city}, ${SITE.region}. Serving the GTA.` },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your site"
        lead="Tell us what you need protected and we'll get back to you with a plan and a free, no-obligation quote. For urgent coverage, call us any time."
      />

      <section className="bg-paper py-20 sm:py-24">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <div className="min-w-0 rounded-[2rem] bg-white p-5 ring-1 ring-ink/10 sm:p-10">
            <h2 className="font-display text-2xl font-semibold text-ink">Request a free quote</h2>
            <p className="mt-2 text-muted">Fields marked * are required.</p>
            <div className="mt-8">
              <ContactForm services={SERVICES.map(({ slug, title }) => ({ slug, title }))} />
            </div>
          </div>

          <aside className="flex min-w-0 flex-col gap-4">
            {details.map((d) => {
              const inner = (
                <>
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-ink text-gold">
                    <d.icon className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted">{d.label}</span>
                    <span className="mt-1 block break-words font-display text-lg font-semibold text-ink">{d.value}</span>
                  </span>
                </>
              );
              return d.href ? (
                <a
                  key={d.label}
                  href={d.href}
                  className="flex items-center gap-5 rounded-3xl bg-white p-6 ring-1 ring-ink/10 transition hover:ring-ink/30"
                >
                  {inner}
                </a>
              ) : (
                <div key={d.label} className="flex items-center gap-5 rounded-3xl bg-white p-6 ring-1 ring-ink/10">
                  {inner}
                </div>
              );
            })}
            <div className="relative mt-2 overflow-hidden rounded-3xl bg-ink p-7">
              <div className="absolute -right-12 -top-12 size-40 rounded-full bg-gold/25 blur-2xl" aria-hidden />
              <p className="relative font-display text-lg font-semibold text-white">Need a guard tonight?</p>
              <p className="relative mt-2 text-sm leading-relaxed text-mist">
                For fire watch, break-ins or other urgent coverage, call instead of using the form so we can respond right away.
              </p>
              <a
                href={SITE.phoneHref}
                className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink hover:bg-gold-light"
              >
                <Phone className="size-4" aria-hidden />
                Call {SITE.phone}
              </a>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
