import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    output: "export",
    basePath: process.env.NODE_ENV === "production" ? "/AIS-Web-Portal" : "",
    assetPrefix:
        process.env.NODE_ENV === "production" ? "/AIS-Web-Portal/" : "",
    images: {
        unoptimized: true,
    },
    env: {
        NEXT_PUBLIC_MAPBOX: process.env.NEXT_PUBLIC_MAPBOX,
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "@": path.resolve(__dirname, "src"),
        };
        return config;
    },
};

export default nextConfig;
