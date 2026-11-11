import type { Metadata } from "next";
import { ButtonLink, Container } from "@/components/ui";
import { CtaBand, PageHero, Process, ServiceCard } from "@/components/sections";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Security Services in Toronto",
  description:
    "Construction site security, residential and concierge security, mobile patrol, event security, fire watch, loss prevention and remote video monitoring across Toronto and the GTA.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Security services built around your site"
        lead="Every property is different. We combine on-site guards, mobile patrols and monitoring into a plan that fits your risks, your schedule and your budget."
        image="/images/commercial-security.svg"
      >
        <ButtonLink href="/contact" arrow>
          Request a free quote
        </ButtonLink>
      </PageHero>

      <section className="bg-paper py-24 sm:py-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </Container>
      </section>

      <Process tone="dark" />
      <CtaBand title="Not sure what coverage you need?" body="Tell us about your property and we'll recommend the right mix of guards, patrols and monitoring." />
    </>
  );
}
