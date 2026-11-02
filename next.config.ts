import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
  cacheComponents: true,
  partialPrefetching: true,
  // Dev only: lets phones on the home Wi-Fi (http://192.168.x.x:3000) load the
  // client bundle and HMR socket. Without it Next 16 answers them with 403, the
  // page never hydrates, and anything client-driven (e.g. the logo theme) is stuck.
  allowedDevOrigins: ["192.168.*.*"],
  images: {
    // AVIF first (smallest), WebP fallback; the original format is served otherwise.
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
