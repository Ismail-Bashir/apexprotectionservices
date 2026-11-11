import type { Metadata } from "next";
import {
  TriangleAlert,
  BadgeCheck,
  Briefcase,
  Building,
  Check,
  Clapperboard,
  FileText,
  GraduationCap,
  HardHat,
  Headset,
  Hospital,
  House,
  Phone,
  Store,
  Ticket,
  Users,
  Warehouse,
} from "lucide-react";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { CtaBand, Faq, Process, ServiceCard } from "@/components/sections";
import { GtaMap } from "@/components/GtaMap";
import { SERVICES } from "@/lib/services";
import { SERVICE_AREAS, SITE, TRUST_POINTS, asset } from "@/lib/site";
import { HOME_FAQ } from "@/lib/faq";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const REASONS = [
  {
    icon: BadgeCheck,
    title: "Licensed, screened guards",
    body: "Every guard holds a valid Ontario security guard licence and passes background checks before their first shift.",
  },
  {
    icon: Headset,
    title: "Supervised around the clock",
    body: "Field supervisors check on posts, and our 24/7 dispatch line means you can always reach a real person.",
  },
  {
    icon: FileText,
    title: "Reports you can use",
    body: "Shift logs, checkpoint scans and incident reports with photos, sent to you digitally after every shift.",
  },
  {
    icon: Users,
    title: "Consistent teams",
    body: "Wherever possible we keep the same guards on your site, so they learn your property, your people and your procedures.",
  },
];

const INDUSTRIES = [
  { icon: HardHat, label: "Construction & development" },
  { icon: Building, label: "Property management" },
  { icon: House, label: "Condominiums" },
  { icon: Store, label: "Retail" },
  { icon: Briefcase, label: "Corporate offices" },
  { icon: Warehouse, label: "Warehouses & logistics" },
  { icon: Ticket, label: "Events & venues" },
  { icon: Clapperboard, label: "Film & TV production" },
  { icon: Hospital, label: "Healthcare" },
  { icon: GraduationCap, label: "Education" },
];

const SAMPLE_LOG = [
  { time: "22:00", text: "Guard on post, site secured", ok: true },
  { time: "23:40", text: "Perimeter patrol, 12 of 12 checkpoints", ok: true },
  { time: "01:15", text: "Gate C found unlocked. Secured, photo attached", ok: false },
  { time: "03:05", text: "Perimeter patrol, all clear", ok: true },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink">
        {/* eslint-disable-next-line @next/next/no-img-element -- static SVG illustration */}
        <img
          src={asset("/images/hero-skyline.svg")}
          alt=""
          className="absolute inset-0 -z-10 size-full object-cover object-[68%_bottom]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/60 to-ink lg:bg-gradient-to-r lg:from-ink lg:via-ink/75 lg:to-ink/10" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-ink to-transparent" aria-hidden />

        <Container className="flex min-h-[100svh] flex-col justify-center gap-14 pb-16 pt-32 lg:flex-row lg:items-end lg:justify-between lg:pb-24">
          <div className="max-w-2xl lg:self-center">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-gold" />
              </span>
              Toronto &amp; the GTA · {SITE.hours}
            </span>
            <h1 className="mt-7 font-display text-5xl font-semibold tracking-tight text-balance text-white sm:text-6xl lg:text-7xl lg:leading-[1.02]">
              Security that shows up, <span className="text-gold">every shift.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-mist sm:text-xl">
              Licensed security guards, mobile patrols and fire watch for construction sites, condos, businesses and events across
              Toronto and the GTA.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" arrow>
                Request a free quote
              </ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                Explore services
              </ButtonLink>
            </div>
            <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-white/85 sm:flex sm:flex-wrap">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <Check className="size-4 text-gold" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Example of the shift report clients receive */}
          <div className="hidden w-[22rem] shrink-0 rounded-3xl border border-white/10 bg-night/70 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl lg:block">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-mist">Shift report</p>
                <p className="mt-1 font-display font-semibold text-white">Construction site · Night shift</p>
              </div>
              <span className="rounded-full bg-gold/15 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-gold">
                Example
              </span>
            </div>
            <ol className="mt-6 flex flex-col gap-4">
              {SAMPLE_LOG.map((entry) => (
                <li key={entry.time} className="flex gap-3 text-sm">
                  <span className="w-11 shrink-0 font-mono text-xs leading-5 text-mist">{entry.time}</span>
                  {entry.ok ? (
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-400" aria-label="Completed" />
                  ) : (
                    <TriangleAlert className="mt-0.5 size-4 shrink-0 text-gold" aria-label="Issue found" />
                  )}
                  <span className="leading-5 text-white/90">{entry.text}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-white/10 pt-4 text-xs text-mist">Sent to your site team at 06:00</p>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section id="services" className="bg-paper py-24 text-ink sm:py-32">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              tone="light"
              eyebrow="Our services"
              title="Security for every kind of property"
              lead="From a single fire watch shift to round-the-clock coverage on a high-rise build, we put the right people in the right places."
            />
            <ButtonLink href="/services" variant="outline-dark" arrow className="self-start lg:self-auto">
              All services
            </ButtonLink>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* Why Apex */}
      <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
        <div className="bg-grid absolute inset-0" aria-hidden />
        <div className="absolute -left-40 top-1/3 size-[30rem] rounded-full bg-gold/10 blur-3xl" aria-hidden />
        <Container className="relative grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow="Why Apex"
              title="The guard on post at 3 a.m. is the whole job"
              lead="Security only works if the person on site is alert, trained and accountable. Everything we do is built around that: who we hire, how we supervise, and how we report back to you."
            />
            <div data-reveal>
              <ButtonLink href="/about" variant="secondary" arrow>
                About Apex
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {REASONS.map((r, i) => (
              <div
                key={r.title}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-gold/40 hover:bg-white/[0.05]"
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-gold/10 text-gold ring-1 ring-gold/25">
                  <r.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-white">{r.title}</h3>
                <p className="mt-3 leading-relaxed text-mist">{r.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Process />

      {/* Industries */}
      <section className="bg-night py-24 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Who we work with"
            title="Trusted across industries"
            lead="Builders, property managers, retailers, event organizers and more rely on us to protect their people and property."
            align="center"
          />
          <ul className="mx-auto mt-14 flex max-w-5xl flex-wrap justify-center gap-3" data-reveal>
            {INDUSTRIES.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/90"
              >
                <item.icon className="size-4 text-gold" aria-hidden />
                {item.label}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Service area */}
      <section className="bg-ink py-24 sm:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Service area"
              title="Based in Toronto. Covering the GTA."
              lead="Our guards and patrol vehicles work across the city and the surrounding regions, from Oakville to Whitby. If your site is further out, ask us."
            />
            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3" data-reveal>
              {SERVICE_AREAS.map((area) => (
                <li key={area} className="flex items-center gap-2 text-sm text-white/85">
                  <span className="size-1.5 rounded-full bg-gold" aria-hidden />
                  {area}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-night p-4 sm:p-8" data-reveal>
            <GtaMap />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div className="flex flex-col gap-8">
            <SectionHeading tone="light" eyebrow="FAQ" title="Questions we hear often" />
            <div className="rounded-3xl bg-white p-7 ring-1 ring-ink/10" data-reveal>
              <p className="font-display text-lg font-semibold text-ink">Need an answer now?</p>
              <p className="mt-2 text-muted">Our dispatch line is open around the clock.</p>
              <a href={SITE.phoneHref} className="mt-5 inline-flex items-center gap-2 font-semibold text-ink hover:text-gold-dark">
                <Phone className="size-4" aria-hidden />
                {SITE.phone}
              </a>
            </div>
          </div>
          <Faq items={HOME_FAQ} />
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
