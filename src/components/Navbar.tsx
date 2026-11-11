"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { NAV_LINKS, SITE } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the mobile menu whenever the route changes.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-white/10 bg-ink/85 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Link href="/" aria-label={`${SITE.name} home`}>
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href) ? "text-white" : "text-mist hover:text-white"
                }`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 lg:flex">
          <a href={SITE.phoneHref} className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white">
            <Phone className="size-4 text-gold" aria-hidden />
            {SITE.phone}
          </a>
          <Link
            href="/contact"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-light"
          >
            Get a quote
          </Link>
        </div>

        <button
          type="button"
          className="-mr-2 rounded-full p-2 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {open ? (
        <div id="mobile-menu" className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/10 bg-ink px-5 pb-10 pt-6 lg:hidden">
          <ul className="flex flex-col">
            {[{ href: "/", label: "Home" }, ...NAV_LINKS].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block border-b border-white/10 py-4 font-display text-2xl font-medium ${
                    pathname === link.href ? "text-gold" : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <Link href="/contact" className="rounded-full bg-gold px-6 py-4 text-center font-semibold text-ink">
              Request a free quote
            </Link>
            <a
              href={SITE.phoneHref}
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-4 font-semibold text-white"
            >
              <Phone className="size-4 text-gold" aria-hidden />
              {SITE.phone}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
