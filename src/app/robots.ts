import type { MetadataRoute } from "next";
import { site, allowIndexing } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Until the content is real and the domain is attached, keep everything out
  // of the index. See `allowIndexing` in lib/site.ts.
  if (!allowIndexing) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nothing here should ever be indexed or crawled.
        disallow: ["/api/", "/_next/", "/thank-you"],
      },
    ],
    sitemap: new URL("/sitemap.xml", site.url).toString(),
    host: site.url,
  };
}
