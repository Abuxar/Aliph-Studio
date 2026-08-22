/**
 * Single source of truth for identity, contact details and NAP.
 *
 * NAP (name / address / phone) must be byte-identical here, in your Google
 * Business Profile and in every directory listing. Inconsistent NAP is the
 * most common cause of weak local ranking.
 *
 * TODO(aliph): replace the PLACEHOLDER values before launch.
 */
export const site = {
  name: "Aliph Studio",
  legalName: "Aliph Studio",
  tagline: "Web, mobile and search — built to perform",
  description:
    "Aliph Studio is a development agency in Lahore building full-stack web platforms, Flutter apps and search strategies for clients in Pakistan, the US, UK and UAE.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aliph.studio",
  locale: "en_PK",
  founded: "2024",

  contact: {
    email: "hello@aliph.studio",
    // PLACEHOLDER — use full international format, e.g. "+92 300 1234567"
    phone: "+92 300 0000000",
    // PLACEHOLDER — the exact street address registered on your Google Business Profile
    street: "DHA Phase 3",
    locality: "Lahore",
    region: "Punjab",
    postalCode: "54792",
    country: "PK",
    countryName: "Pakistan",
    // DHA Phase 3, Lahore — refine to your exact pin
    geo: { lat: 31.4783, lng: 74.3927 },
    hours: "Mo-Sa 10:00-19:00",
    timezone: "Asia/Karachi (UTC+5)",
  },

  /**
   * WhatsApp is the primary enquiry channel for local clients, so it is
   * surfaced alongside email rather than buried.
   *
   * `intl` is the only form wa.me accepts: country code, no leading zero, no
   * plus, no spaces. The local 0323... form silently fails to resolve, so the
   * two are stored separately rather than derived at each call site.
   */
  whatsapp: {
    local: "0323 0708000",
    display: "+92 323 0708000",
    intl: "923230708000",
    prefill: "Hi Aliph Studio - I would like to discuss a project.",
  },

  social: {
    linkedin: "https://www.linkedin.com/company/aliph-studio",
    github: "https://github.com/Abuxar",
    instagram: "https://www.instagram.com/aliph.studio",
    clutch: "https://clutch.co/profile/aliph-studio",
  },

  /** Markets we actively sell into — drives the "where we work" section. */
  markets: [
    { region: "Pakistan", city: "Lahore", offset: "Local" },
    { region: "United Arab Emirates", city: "Dubai", offset: "−1h" },
    { region: "United Kingdom", city: "London", offset: "−4h" },
    { region: "United States", city: "New York", offset: "−9h" },
  ],
} as const;

/** wa.me deep link, with the enquiry message pre-filled. */
export const whatsappHref = `https://wa.me/${site.whatsapp.intl}?text=${encodeURIComponent(
  site.whatsapp.prefill,
)}`;

/**
 * Header navigation. /work is deliberately absent — the page stays live, is
 * linked from the footer and the hero, and remains in the sitemap; it is just
 * not carried in the top bar.
 */
export const nav = [
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
