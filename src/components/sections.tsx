import Link from "next/link";
import { ArrowUpRight, Phone, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "./ui";
import type { Service } from "@/lib/services";
import { SITE, asset } from "@/lib/site";

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const Icon = service.icon;
  return (
    <div data-reveal style={{ "--reveal-delay": `${(index % 3) * 80}ms` } as React.CSSProperties}>
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_24px_60px_-24px_rgb(7_11_20/0.35)]"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-night">
        {/* eslint-disable-next-line @next/next/no-img-element -- static SVG illustration */}
        <img
          src={asset(service.image)}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 flex size-11 items-center justify-center rounded-2xl bg-ink/70 text-gold ring-1 ring-white/15 backdrop-blur">
          <Icon className="size-5" aria-hidden />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-xl font-semibold text-ink">{service.title}</h3>
        <p className="text-[0.95rem] leading-relaxed text-muted">{service.short}</p>
        <span className="mt-auto flex items-center gap-1.5 pt-3 text-sm font-semibold text-ink">
          Learn more
          <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
    </div>
  );
}

const STEPS = [
  {
    title: "Free site assessment",
    body: "We visit your property, walk it with you and learn where the real risks are: entry points, blind spots, lighting and past incidents.",
  },
  {
    title: "A plan and a clear quote",
    body: "You get a written security plan with post orders, schedules and straightforward pricing. No surprises on the invoice.",
  },
  {
    title: "Guards on site",
    body: "We brief the team on your site and procedures before their first shift. Short-notice starts are often possible.",
  },
  {
    title: "Reports and reviews",
    body: "Shift reports land in your inbox, you have a direct contact, and we adjust coverage as your needs change.",
  },
];

export function Process({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <section className={dark ? "bg-night py-24 sm:py-32" : "bg-paper py-24 sm:py-32"}>
      <Container>
        <SectionHeading
          tone={dark ? "dark" : "light"}
          eyebrow="How it works"
          title="From first call to guards on site"
          lead="Getting coverage in place is simple. Here is what happens after you reach out."
        />
        <ol
          className={`mt-16 grid gap-px overflow-hidden rounded-3xl border sm:grid-cols-2 lg:grid-cols-4 ${
            dark ? "border-white/10 bg-white/10" : "border-ink/10 bg-ink/10"
          }`}
        >
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className={`relative flex flex-col gap-4 p-8 ${dark ? "bg-navy text-white" : "bg-white text-ink"}`}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <span className={`font-display text-sm font-semibold tracking-widest ${dark ? "text-gold" : "text-gold-dark"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl font-semibold">{step.title}</h3>
              <p className={`leading-relaxed ${dark ? "text-mist" : "text-muted"}`}>{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function CtaBand({
  title = "Tell us about your property.",
  body = "We'll walk the site with you, recommend the right coverage and send you a clear, written quote.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-paper px-5 py-20 sm:px-8 sm:py-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-ink px-6 py-16 sm:px-14 sm:py-20" data-reveal>
        <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
        <div className="absolute -right-32 -top-40 size-[28rem] rounded-full bg-gold/10 blur-3xl" aria-hidden />
        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Get protected</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-balance text-white sm:text-5xl">{title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-mist">{body}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <ButtonLink href="/contact" arrow>
              Request a free quote
            </ButtonLink>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
            >
              <Phone className="size-4 text-gold" aria-hidden />
              {SITE.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-36 sm:pb-24 sm:pt-44">
      {image ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element -- static SVG illustration */}
          <img src={asset(image)} alt="" className="absolute inset-0 size-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" aria-hidden />
        </>
      ) : (
        <div className="bg-grid absolute inset-0" aria-hidden />
      )}
      <Container className="relative">
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-balance text-white sm:text-6xl sm:leading-[1.05]">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-mist sm:text-xl">{lead}</p>
          {children ? <div className="mt-10">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}

export function Faq({ items, tone = "light" }: { items: { q: string; a: string }[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div className={`divide-y ${dark ? "divide-white/10 border-y border-white/10" : "divide-ink/10 border-y border-ink/10"}`}>
      {items.map((item) => (
        <details key={item.q} className="group py-2" data-reveal>
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-5">
            <span className={`font-display text-lg font-medium sm:text-xl ${dark ? "text-white" : "text-ink"}`}>{item.q}</span>
            <span
              className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                dark ? "border-white/15 text-gold" : "border-ink/15 text-ink group-hover:bg-ink group-hover:text-white"
              }`}
            >
              <Plus className="faq-icon size-4 transition-transform duration-300" aria-hidden />
            </span>
          </summary>
          <p className={`max-w-3xl pb-6 pr-12 leading-relaxed ${dark ? "text-mist" : "text-muted"}`}>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
