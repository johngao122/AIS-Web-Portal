import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    basePath: process.env.NODE_ENV === "production" ? "/AIS-Web-Portal" : "",
    assetPrefix:
        process.env.NODE_ENV === "production" ? "/AIS-Web-Portal/" : "",
    images: {
        unoptimized: true,
    },
    webpack(config: any) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
};

export default nextConfig;