import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Phone } from "lucide-react";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { CtaBand, Process, ServiceCard } from "@/components/sections";
import { SERVICES, getService } from "@/lib/services";
import { SITE, asset } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} in Toronto`,
    description: `${service.short} ${SITE.name} serves Toronto and the GTA.`,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const others = SERVICES.filter((s) => s.slug !== service.slug);
  // Show three related services, rotating so each page links to different ones.
  const start = SERVICES.findIndex((s) => s.slug === service.slug);
  const related = [0, 1, 2].map((k) => others[(start + k) % others.length]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.intro,
    serviceType: service.title,
    provider: { "@id": `${SITE.url}/#business` },
    areaServed: { "@type": "City", name: "Toronto" },
    url: `${SITE.url}/services/${service.slug}`,
  };

  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-20 pt-32 sm:pt-40">
        <div className="bg-grid absolute inset-0" aria-hidden />
        <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium text-mist hover:text-white">
              <ArrowLeft className="size-4" aria-hidden />
              All services
            </Link>
            <div className="mt-8 flex items-center gap-4">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-gold/10 text-gold ring-1 ring-gold/25">
                <Icon className="size-5" aria-hidden />
              </span>
              <Eyebrow>{service.title}</Eyebrow>
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-balance text-white sm:text-6xl sm:leading-[1.05]">
              {service.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-mist">{service.short}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/contact?service=${service.slug}`} arrow>
                Get a quote
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
          <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50">
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG illustration */}
            <img src={asset(service.image)} alt={service.imageAlt} className="aspect-[3/2] w-full object-cover" fetchPriority="high" />
          </div>
        </Container>
      </section>

      <section className="bg-paper py-24 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div>
            <Eyebrow tone="light">Overview</Eyebrow>
            <p className="mt-6 font-display text-2xl leading-snug text-pretty text-ink sm:text-[1.75rem]" data-reveal>
              {service.intro}
            </p>

            <h2 className="mt-16 font-display text-2xl font-semibold text-ink">What&apos;s included</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2" data-reveal>
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl bg-white p-5 ring-1 ring-ink/10">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-dark">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="leading-relaxed text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl bg-white p-8 ring-1 ring-ink/10">
              <h2 className="font-display text-lg font-semibold text-ink">Ideal for</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {service.idealFor.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted">
                    <span className="size-1.5 shrink-0 rounded-full bg-gold-dark" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-ink p-8">
              <div className="absolute -right-16 -top-16 size-48 rounded-full bg-gold/20 blur-2xl" aria-hidden />
              <h2 className="relative font-display text-xl font-semibold text-white">Get a quote for {service.title.toLowerCase()}</h2>
              <p className="relative mt-3 text-sm leading-relaxed text-mist">
                Tell us about your site and we&apos;ll put together a plan and a written quote.
              </p>
              <ButtonLink href={`/contact?service=${service.slug}`} arrow className="relative mt-6 w-full">
                Request a quote
              </ButtonLink>
            </div>
          </aside>
        </Container>
      </section>

      <Process tone="dark" />

      <section className="bg-paper py-24 sm:py-28">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow tone="light">More services</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Often paired with</h2>
            </div>
            <ButtonLink href="/services" variant="outline-dark" arrow className="self-start sm:self-auto">
              All services
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
