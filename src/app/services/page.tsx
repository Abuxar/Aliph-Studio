import Link from "next/link";
import { services } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/json-ld";
import { Section } from "@/components/ui/section";
import { Cta } from "@/components/home/cta";

export const metadata = buildMetadata({
  title: "Services — Web, Mobile, SEO & Marketing",
  description:
    "Full-stack web development, Flutter apps, hybrid platforms, SEO and digital marketing from a Lahore-based studio working across Pakistan, the UK, UAE and US.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <section className="border-b border-line pt-36 pb-16 lg:pt-44 lg:pb-24">
        <div className="container-page">
          <p className="eyebrow">Services</p>
          <h1 className="mt-6 max-w-[18ch] text-[clamp(2.25rem,6.5vw,4.75rem)]">
            Everything from the first line of code to the last{" "}
            <span className="accent text-cobalt-lift">ranking</span>
          </h1>
          <p className="mt-7 max-w-2xl text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-body">
            Five services that fit together. Most clients start with one and add
            a second within the year — which works because the same team runs
            both.
          </p>
        </div>
      </section>

      <Section>
        <ul className="flex flex-col">
          {services.map((service, i) => (
            <li key={service.slug} data-reveal>
              <Link
                href={`/services/${service.slug}`}
                className="group grid gap-6 border-b border-line py-10 transition-colors lg:grid-cols-[auto_1fr_auto] lg:items-baseline lg:gap-12 first:border-t"
              >
                <span className="font-label text-[0.72rem] tabular-nums text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex flex-col gap-3">
                  <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] transition-colors duration-500 group-hover:text-cobalt-lift">
                    {service.title}
                  </h2>
                  <p className="max-w-2xl text-[0.97rem] leading-relaxed text-body">
                    {service.summary}
                  </p>
                  <ul className="mt-1 flex flex-wrap gap-2">
                    {service.stack.slice(0, 4).map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-line px-3 py-1 font-label text-[0.68rem] text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                <span
                  aria-hidden="true"
                  className="hidden text-muted transition-transform duration-500 group-hover:translate-x-2 group-hover:text-cobalt-lift lg:block"
                >
                  <svg width="28" height="28" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Cta />
    </>
  );
}
