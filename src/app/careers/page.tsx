import type { Metadata } from "next";
import { Check } from "lucide-react";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { PageHero } from "@/components/sections";
import { ApplyForm } from "@/components/forms";
import { PERKS, REQUIREMENTS, ROLES } from "@/lib/careers";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security Guard Jobs in Toronto",
  description: `Join ${SITE.name}. We're hiring licensed security guards, concierge officers, mobile patrol officers and supervisors across Toronto and the GTA.`,
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Join a team that has your back"
        lead="We're always looking for licensed, reliable security professionals across Toronto and the GTA. Steady shifts, real training and supervisors who pick up the phone."
        image="/images/team.svg"
      >
        <ButtonLink href="#apply" arrow>
          Apply now
        </ButtonLink>
      </PageHero>

      <section className="bg-paper py-24 sm:py-28">
        <Container>
          <SectionHeading tone="light" eyebrow="Why Apex" title="What you can expect from us" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PERKS.map((perk, i) => (
              <div
                key={perk.title}
                className="rounded-3xl bg-white p-7 ring-1 ring-ink/10"
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              >
                <span className="font-display text-sm font-semibold tracking-widest text-gold-dark">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">{perk.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{perk.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-24 sm:py-28">
        <Container className="grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHeading eyebrow="Open roles" title="Roles we hire for" lead="We hire year-round. Apply once and we'll match you with the roles and sites that fit." />
            <ul className="mt-12 divide-y divide-white/10 border-y border-white/10">
              {ROLES.map((role) => (
                <li key={role.title} className="flex flex-col gap-2 py-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8" data-reveal>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white">{role.title}</h3>
                    <p className="mt-2 max-w-lg leading-relaxed text-mist">{role.body}</p>
                  </div>
                  <span className="shrink-0 self-start rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                    {role.type}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:pt-24">
            <div className="rounded-3xl border border-white/10 bg-night p-8 lg:sticky lg:top-28" data-reveal>
              <h3 className="font-display text-xl font-semibold text-white">What you&apos;ll need</h3>
              <ul className="mt-6 flex flex-col gap-4">
                {REQUIREMENTS.map((req) => (
                  <li key={req} className="flex gap-3 text-white/85">
                    <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                    <span className="leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section id="apply" className="scroll-mt-20 bg-paper py-24 sm:py-28">
        <Container className="max-w-4xl">
          <div className="rounded-[2rem] bg-white p-6 ring-1 ring-ink/10 sm:p-12">
            <Eyebrow tone="light">Apply</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Start your application</h2>
            <p className="mt-3 text-muted">It takes about two minutes. Fields marked * are required.</p>
            <div className="mt-10">
              <ApplyForm roles={ROLES.map((r) => r.title)} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
