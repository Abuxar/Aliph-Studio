import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { caseStudySchema, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/json-ld";
import { Section } from "@/components/ui/section";
import { Cta } from "@/components/home/cta";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};

  return buildMetadata({
    title: `${study.client} — ${study.headline}`,
    description: study.summary,
    path: `/work/${study.slug}`,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();

  const next =
    caseStudies[(caseStudies.findIndex((s) => s.slug === slug) + 1) % caseStudies.length];

  return (
    <>
      <JsonLd
        data={[
          caseStudySchema(study),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: study.client, path: `/work/${study.slug}` },
          ]),
        ]}
      />

      <section className="border-b border-line pt-36 pb-16 lg:pt-44 lg:pb-24">
        <div className="container-page">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-bright">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-faint">/</li>
              <li>
                <Link href="/work" className="transition-colors hover:text-bright">
                  Work
                </Link>
              </li>
              <li aria-hidden="true" className="text-faint">/</li>
              <li aria-current="page" className="text-bright">
                {study.client}
              </li>
            </ol>
          </nav>

          <h1 className="max-w-[18ch] text-[clamp(2rem,5.5vw,4rem)]">
            {study.headline}
          </h1>

          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
            {[
              { k: "Client", v: study.client },
              { k: "Sector", v: study.sector },
              { k: "Market", v: study.market },
              { k: "Year", v: study.year },
            ].map((item) => (
              <div key={item.k} className="flex flex-col gap-1.5">
                <dt className="eyebrow">{item.k}</dt>
                <dd className="font-display text-[1rem] font-medium tracking-tight text-bright">
                  {item.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div className="flex flex-col gap-6">
            <p className="eyebrow" data-reveal>
              Overview
            </p>
            <p
              className="max-w-2xl text-[clamp(1.1rem,2.4vw,1.45rem)] leading-[1.45] text-bright"
              data-reveal
            >
              {study.summary}
            </p>

            <div className="mt-4 flex flex-col gap-3" data-reveal>
              <p className="eyebrow">Services</p>
              <ul className="flex flex-wrap gap-2">
                {study.services.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-line bg-surface px-4 py-2 font-display text-[0.88rem] text-body"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-2 flex flex-col gap-3" data-reveal>
              <p className="eyebrow">Stack</p>
              <ul className="flex flex-wrap gap-2">
                {study.stack.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-line px-3 py-1 font-mono text-[0.68rem] text-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <dl className="flex flex-col" data-reveal>
            {study.metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex flex-col gap-1 border-b border-line py-6 first:border-t"
              >
                <dt className="sr-only">{metric.label}</dt>
                <dd className="font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-tight text-cobalt-lift tabular-nums">
                  {metric.value}
                </dd>
                <dd className="text-[0.88rem] text-muted">{metric.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section className="border-t border-line">
        <p className="eyebrow" data-reveal>
          Next case study
        </p>
        <Link
          href={`/work/${next.slug}`}
          className="group mt-6 flex flex-col gap-3"
          data-reveal
        >
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
            {next.client} · {next.market}
          </span>
          <span className="max-w-3xl font-display text-[clamp(1.5rem,4vw,2.5rem)] font-semibold leading-tight tracking-tight text-bright transition-colors duration-500 group-hover:text-cobalt-lift">
            {next.headline}
          </span>
        </Link>
      </Section>

      <Cta />
    </>
  );
}
