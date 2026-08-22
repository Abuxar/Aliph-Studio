import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * `standalone` emits a self-contained server bundle in .next/standalone,
   * which the Docker/VPS target depends on.
   *
   * It must NOT be set on Vercel. Vercel runs its own file tracing and the
   * two collide — the build fails looking for next-server.js.nft.json. So the
   * option is applied only when building off-platform.
   */
  output: process.env.VERCEL ? undefined : "standalone",

  images: {
    formats: ["image/avif", "image/webp"],
    // Self-hosted optimization runs through `sharp` (installed as a dependency).
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },

  poweredByHeader: false,
  compress: true,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
