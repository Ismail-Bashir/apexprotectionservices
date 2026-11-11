import type { Metadata } from "next";
import { BadgeCheck, ClipboardCheck, GraduationCap, Radio } from "lucide-react";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { CtaBand, PageHero, Process } from "@/components/sections";
import { SITE, asset } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `${SITE.name} is a Toronto security company providing licensed guards, mobile patrols and fire watch across the GTA.`,
  alternates: { canonical: "/about" },
};

const STANDARDS = [
  {
    icon: BadgeCheck,
    title: "Licensed and screened",
    body: "Every guard holds a valid Ontario security guard licence under the Private Security and Investigative Services Act, and passes a background check before they're placed.",
  },
  {
    icon: GraduationCap,
    title: "Trained for your site",
    body: "Beyond licensing, guards are briefed on each site's layout, procedures and contacts before their first shift, with ongoing training in report writing and de-escalation.",
  },
  {
    icon: Radio,
    title: "Supervised, never alone",
    body: "Field supervisors inspect posts and a 24/7 dispatch line backs up every guard, so issues get escalated and resolved quickly.",
  },
  {
    icon: ClipboardCheck,
    title: "Accountable on paper",
    body: "Patrols, checkpoints and incidents are logged and reported, so you always know what happened on your property and when.",
  },
];

const VALUES = [
  { title: "Show up", body: "On time, in uniform, alert. Every shift, including the 3 a.m. ones nobody sees." },
  { title: "Tell the truth", body: "Honest reports, even when the news isn't good. You can't fix what you don't know about." },
  { title: "Treat people with respect", body: "Residents, staff, trades and visitors. Calm, professional conduct prevents most problems." },
  { title: "Own the outcome", body: "If something goes wrong on our watch, we deal with it, report it and make sure it doesn't happen again." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Apex"
        title="Toronto security, done properly"
        lead={`${SITE.name} provides licensed guards, mobile patrols and fire watch to builders, property managers, businesses and event organizers across the GTA.`}
        image="/images/hero-skyline.svg"
      />

      <section className="bg-paper py-24 sm:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow tone="light">Who we are</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl" data-reveal>
              Security is only as good as the person on post.
            </h2>
            <div className="mt-6 flex flex-col gap-5 text-lg leading-relaxed text-muted" data-reveal>
              <p>
                Apex is built on a simple idea: the guard standing on your site at 3 a.m. is the whole product. Uniforms, vehicles
                and software matter, but only if that person is alert, trained and accountable.
              </p>
              <p>
                So we focus on the fundamentals. We hire carefully, train for each site, supervise closely and report honestly. We
                keep teams consistent so guards get to know your property, and we stay in touch so you always know what&apos;s
                happening.
              </p>
            </div>
            <div className="mt-10" data-reveal>
              <ButtonLink href="/contact" variant="dark" arrow>
                Talk to our team
              </ButtonLink>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-ink/30" data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG illustration */}
            <img src={asset("/images/team.svg")} alt="Three uniformed security guards in front of the Toronto skyline" className="aspect-[3/2] w-full object-cover" />
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
        <div className="bg-grid absolute inset-0" aria-hidden />
        <Container className="relative">
          <SectionHeading eyebrow="Our standards" title="What every Apex client gets" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STANDARDS.map((s, i) => (
              <div
                key={s.title}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-7"
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-gold/10 text-gold ring-1 ring-gold/25">
                  <s.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-mist">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-night py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <SectionHeading eyebrow="Our values" title="How we work" lead="Four principles every Apex guard and supervisor works by." />
          <ol className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <li key={v.title} className="bg-night p-8" data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}>
                <span className="font-display text-sm font-semibold tracking-widest text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-xl font-semibold text-white">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-mist">{v.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Process />
      <CtaBand />
    </>
  );
}
