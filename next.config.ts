import type { NextConfig } from "next";
import path from "path";
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
    output: "export", // Needed for static exports (GitHub Pages)
    basePath: isGitHubPages ? "/AIS-Web-Portal" : "", // Set subpath for GitHub Pages
    assetPrefix: isGitHubPages ? "/AIS-Web-Portal" : "", // Set asset prefix for GitHub Pages
    images: {
        unoptimized: true, // Required for static export when using Next.js Image component
    },
    env: {
        NEXT_PUBLIC_MAPBOX: process.env.NEXT_PUBLIC_MAPBOX,
        NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API,
    },
};

export default nextConfig;
