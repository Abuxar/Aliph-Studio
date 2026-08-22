import { site } from "./site";
import type { CaseStudy, Service } from "./content";

const abs = (path: string) => new URL(path, site.url).toString();

/** Stable @id so every other node can reference one canonical organisation. */
const ORG_ID = `${site.url}/#organization`;

/**
 * ProfessionalService extends LocalBusiness, so this single node covers both
 * the "who are you" and the "where are you" signals. The address here must
 * match the Google Business Profile exactly.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    email: site.contact.email,
    // Local SEO leans on a telephone being present; WhatsApp is the number.
    telephone: `+${site.whatsapp.intl}`,
    foundingDate: site.founded,
    priceRange: "$$",
    image: abs("/opengraph-image"),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.street,
      addressLocality: site.contact.locality,
      addressRegion: site.contact.region,
      addressCountry: site.contact.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.contact.geo.lat,
      longitude: site.contact.geo.lng,
    },
    openingHours: site.contact.hours,
    areaServed: site.markets.map((m) => ({
      "@type": "Country",
      name: m.region,
    })),
    knowsAbout: [
      "Web development",
      "Next.js",
      "React",
      "Flutter",
      "Search engine optimisation",
      "Digital marketing",
    ],
    sameAs: Object.values(site.social),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    url: abs(`/services/${service.slug}`),
    provider: { "@id": ORG_ID },
    areaServed: site.markets.map((m) => ({
      "@type": "Country",
      name: m.region,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} deliverables`,
      itemListElement: service.deliverables.map((d) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: d },
      })),
    },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  };
}

export function caseStudySchema(study: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.headline,
    description: study.summary,
    url: abs(`/work/${study.slug}`),
    datePublished: `${study.year}-01-01`,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}
