import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/services/", "/about/", "/careers/", "/contact/"];
  return [
    ...pages.map((path) => ({
      url: `${SITE.url}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...SERVICES.map((s) => ({
      url: `${SITE.url}/services/${s.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
