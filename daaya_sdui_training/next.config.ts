import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
      remotePatterns: [{
        protocol: "https",
        hostname: "syrpoc.pockethost.io",
        port: "",
        pathname: "/**"
      }]
  },
  reactStrictMode: false,
};

export default nextConfig;
