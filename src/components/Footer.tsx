import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { Container } from "./ui";
import { SERVICES } from "@/lib/services";
import { NAV_LINKS, SERVICE_AREAS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div className="flex flex-col gap-5">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-mist">{SITE.description}</p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">Services</h2>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-mist transition-colors hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">Company</h2>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            {[{ href: "/", label: "Home" }, ...NAV_LINKS].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-mist transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-white">Areas we serve</h2>
          <p className="mt-4 text-sm leading-relaxed text-mist">{SERVICE_AREAS.slice(5).join(", ")} and all of Toronto.</p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">Contact</h2>
          <ul className="mt-5 flex flex-col gap-4 text-sm">
            <li>
              <a href={SITE.phoneHref} className="flex items-center gap-3 text-white hover:text-gold">
                <Phone className="size-4 shrink-0 text-gold" aria-hidden />
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 break-all text-white hover:text-gold">
                <Mail className="size-4 shrink-0 text-gold" aria-hidden />
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-mist">
              <MapPin className="size-4 shrink-0 text-gold" aria-hidden />
              {SITE.city}, {SITE.region}
            </li>
            <li className="flex items-center gap-3 text-mist">
              <Clock className="size-4 shrink-0 text-gold" aria-hidden />
              {SITE.hours}
            </li>
          </ul>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-light"
          >
            Request a quote
          </Link>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>Licensed security services in Toronto and the GTA.</p>
        </Container>
      </div>
    </footer>
  );
}
