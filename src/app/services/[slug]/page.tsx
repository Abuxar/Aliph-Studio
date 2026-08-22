import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/json-ld";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Faq } from "@/components/home/faq";
import { Cta } from "@/components/home/cta";

type Params = { params: Promise<{ slug: string }> };

/** Statically generate all five at build time — no runtime rendering. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return buildMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(service),
          faqSchema(service.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line pt-36 pb-16 lg:pt-44 lg:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[46vh] w-[100vw] -translate-x-1/2 -translate-y-1/3 rounded-[50%] opacity-45 blur-[110px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(47,111,240,0.28), transparent)",
          }}
        />

        <div className="container-page relative z-10">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-label text-[0.7rem] uppercase tracking-[0.14em] text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-bright">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-faint">/</li>
              <li>
                <Link
                  href="/services"
                  className="transition-colors hover:text-bright"
                >
                  Services
                </Link>
              </li>
              <li aria-hidden="true" className="text-faint">/</li>
              <li aria-current="page" className="text-bright">
                {service.short}
              </li>
            </ol>
          </nav>

          <h1 className="max-w-[16ch] text-[clamp(2.25rem,6.5vw,4.75rem)]">
            {service.headline}{" "}
            <span className="accent text-cobalt-lift">
              {service.accentWord}
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-body">
            {service.summary}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/contact" arrow>
              Discuss your project
            </ButtonLink>
            <ButtonLink href="/work" variant="ghost">
              See related work
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Problem framing */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          <p className="eyebrow lg:pt-2" data-reveal>
            The problem
          </p>
          <p
            className="max-w-3xl text-[clamp(1.25rem,3vw,1.9rem)] leading-[1.35] text-bright"
            data-reveal
          >
            {service.problem}
          </p>
        </div>
      </Section>

      {/* Deliverables + stack */}
      <Section className="border-t border-line">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-8">
            <p className="eyebrow" data-reveal>
              What you get
            </p>
            <ul className="flex flex-col">
              {service.deliverables.map((item, i) => (
                <li
                  key={item}
                  data-reveal
                  data-reveal-delay={`${i * 0.04}`}
                  className="flex items-baseline gap-5 border-b border-line py-4 first:border-t"
                >
                  <span className="font-label text-[0.7rem] tabular-nums text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1rem] text-body">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <p className="eyebrow" data-reveal>
              Tools we use
            </p>
            <ul className="flex flex-wrap gap-2" data-reveal>
              {service.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full glass glass-edge px-4 py-2 font-display text-[0.9rem] tracking-tight text-body"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div
              className="mt-2 glass glass-edge rounded-2xl p-7"
              data-reveal
            >
              <p className="text-[0.97rem] leading-relaxed text-body">
                Not sure this is the service you need? Tell us the outcome you
                are after and we will point you at the right one — including
                when that means telling you not to build anything yet.
              </p>
              <div className="mt-6">
                <ButtonLink href="/contact" variant="ghost" arrow>
                  Ask us
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {service.faqs.length > 0 ? (
        <div className="border-t border-line">
          <Faq
            items={service.faqs}
            index="03"
            eyebrow={`${service.short} questions`}
            title="What clients ask about this"
            accent="service"
          />
        </div>
      ) : null}

      {/* Other services */}
      <Section className="border-t border-line">
        <p className="eyebrow" data-reveal>
          Other services
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {others.map((other) => (
            <li key={other.slug} data-reveal>
              <Link
                href={`/services/${other.slug}`}
                className="group flex h-full flex-col gap-3 glass glass-edge rounded-2xl p-6 transition-colors duration-500 hover:border-[var(--line-strong)]"
              >
                <span className="font-display text-[1.15rem] font-medium tracking-tight text-bright transition-colors group-hover:text-cobalt-lift">
                  {other.title}
                </span>
                <span className="text-[0.92rem] leading-relaxed text-muted">
                  {other.summary}
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
