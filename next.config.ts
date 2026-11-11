import type { NextConfig } from "next";

// The site is exported as static files for GitHub Pages. A project Pages site
// is served from /<repo>/, so the deploy workflow sets NEXT_PUBLIC_BASE_PATH.
// Leave it empty for local development or a custom domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  devIndicators: false,
};

export default nextConfig;
