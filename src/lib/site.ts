// Company details used across the site. Replace the placeholders marked
// TODO before launch: they are not real contact details.

export const SITE = {
  name: "Apex Protection Services",
  shortName: "Apex",
  tagline: "Licensed security guards for Toronto and the GTA",
  description:
    "Apex Protection Services provides licensed security guards, mobile patrols and fire watch for construction sites, condos, businesses and events across Toronto and the GTA.",
  // TODO: set NEXT_PUBLIC_SITE_URL in production, or change this to the real domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.apexprotectionservices.ca",
  // TODO: replace with the real phone number (555-01xx numbers are reserved for fiction).
  phone: "(416) 555-0142",
  phoneHref: "tel:+14165550142",
  // TODO: replace with the real inbox.
  email: "info@apexprotectionservices.ca",
  city: "Toronto",
  region: "Ontario",
  regionCode: "ON",
  country: "CA",
  hours: "Dispatch available 24/7",
};

// Prefix for files in /public. next/link adds the base path automatically,
// but plain <img src> does not.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${BASE_PATH}${path}`;

export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export const SERVICE_AREAS = [
  "Downtown Toronto",
  "North York",
  "Scarborough",
  "Etobicoke",
  "East York",
  "Mississauga",
  "Brampton",
  "Vaughan",
  "Markham",
  "Richmond Hill",
  "Oakville",
  "Pickering",
  "Ajax",
  "Whitby",
];

export const TRUST_POINTS = [
  "PSISA-licensed guards",
  "24/7 dispatch",
  "Fully insured",
  "Digital shift reports",
];
