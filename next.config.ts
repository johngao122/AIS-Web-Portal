import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
    ...(isGitHubPages
        ? {
              output: "export", // Enable static export only for GitHub Pages
              basePath: "/AIS-Web-Portal",
              assetPrefix: "/AIS-Web-Portal",
              images: {
                  unoptimized: true,
              },
          }
        : {
              // Vercel configuration
              reactStrictMode: true,
          }),
    env: {
        NEXT_PUBLIC_MAPBOX: process.env.NEXT_PUBLIC_MAPBOX,
        NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API,
    },
};

export default nextConfig;
