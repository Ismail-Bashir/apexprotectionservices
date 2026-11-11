import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { SERVICES } from "@/lib/services";
import { SERVICE_AREAS, SITE } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Security Guards in Toronto & the GTA`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: SITE.name,
    url: SITE.url,
    // Declared here (not via the opengraph-image file convention) so the URL
    // resolves against metadataBase once, without the base path doubled.
    images: [{ url: "opengraph-image.png", width: 1200, height: 630, alt: `${SITE.name}: licensed security guards in Toronto and the GTA` }],
  },
  twitter: { card: "summary_large_image", images: ["opengraph-image.png"] },
};

export const viewport: Viewport = {
  themeColor: "#070b14",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE.url}/#business`,
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  telephone: SITE.phone,
  email: SITE.email,
  image: `${SITE.url}/opengraph-image.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.city,
    addressRegion: SITE.regionCode,
    addressCountry: SITE.country,
  },
  areaServed: SERVICE_AREAS.map((name) => ({ "@type": "Place", name: `${name}, Ontario` })),
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Security services",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, url: `${SITE.url}/services/${s.slug}` },
    })),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-scroll-behavior lets Next turn off smooth scrolling during route changes,
    // so a new page starts at the top instead of gliding up from the old position.
    <html lang="en-CA" data-scroll-behavior="smooth" className={`${inter.variable} ${space.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks the page as JS-enabled before paint so scroll reveals don't flash. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <RevealObserver />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
