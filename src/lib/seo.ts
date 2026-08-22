import type { Metadata } from "next";
import { site } from "./site";

type MetaInput = {
  title: string;
  description: string;
  /** Route path with leading slash, e.g. "/services/seo". */
  path?: string;
  /** Set true on pages that must not be indexed (thank-you pages, etc.). */
  noIndex?: boolean;
  type?: "website" | "article";
};

/**
 * Builds page metadata with a canonical URL on every route.
 *
 * Canonicals matter more than usual here: service pages and local landing
 * pages cover overlapping terms, and without them Google picks its own
 * canonical and splits the ranking signal between near-duplicates.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
  type = "website",
}: MetaInput): Metadata {
  const url = new URL(path, site.url).toString();
  const fullTitle = path === "/" ? title : `${title} | ${site.name}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type,
      url,
      siteName: site.name,
      title: fullTitle,
      description,
      locale: site.locale,
      images: [
        {
          url: new URL("/opengraph-image", site.url).toString(),
          width: 1200,
          height: 630,
          alt: `${site.name} — ${site.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
