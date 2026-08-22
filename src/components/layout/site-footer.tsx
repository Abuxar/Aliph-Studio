import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/lib/content";
import { AlifMark } from "@/components/ui/logo";

const company = [
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const legal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line glass">
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Identity + NAP. This address block is the canonical NAP —
              it must match the Google Business Profile character for character. */}
          <div className="flex flex-col gap-5">
            <AlifMark className="h-9 w-auto text-cobalt-lift" />
            <p className="max-w-xs text-[0.95rem] leading-relaxed text-body">
              A development studio in Lahore building web platforms, mobile
              apps and search programmes for clients across four markets.
            </p>

            <address className="not-italic text-[0.9rem] leading-relaxed text-muted">
              <span className="block font-display text-bright">{site.name}</span>
              {site.contact.street}
              <br />
              {site.contact.locality}, {site.contact.region}{" "}
              {site.contact.postalCode}
              <br />
              {site.contact.countryName}
            </address>
          </div>

          <nav aria-label="Services" className="flex flex-col gap-4">
            <h2 className="eyebrow">Services</h2>
            <ul className="flex flex-col gap-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-[0.9rem] text-body transition-colors hover:text-bright"
                  >
                    {service.short}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="flex flex-col gap-4">
            <h2 className="eyebrow">Company</h2>
            <ul className="flex flex-col gap-2.5">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9rem] text-body transition-colors hover:text-bright"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <h2 className="eyebrow">Get in touch</h2>
            <a
              href={`mailto:${site.contact.email}`}
              className="font-display text-[1.05rem] tracking-tight text-bright underline-offset-4 transition-colors hover:text-cobalt-lift hover:underline"
            >
              {site.contact.email}
            </a>
            <a
              href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
              className="text-[0.9rem] text-body transition-colors hover:text-bright"
            >
              {site.contact.phone}
            </a>
            <p className="text-[0.85rem] text-muted">
              {site.contact.hours}
              <br />
              {site.contact.timezone}
            </p>

            <ul className="mt-2 flex gap-4">
              {Object.entries(site.social).map(([key, href]) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-label text-[0.7rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-cobalt-lift"
                  >
                    {key}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 hairline" />

        <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-label text-[0.72rem] tracking-[0.08em] text-faint">
            © {year} {site.legalName}. All rights reserved.
          </p>

          <ul className="flex gap-6">
            {legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-label text-[0.72rem] tracking-[0.08em] text-faint transition-colors hover:text-body"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
