import Link from "next/link";
import { caseStudies } from "@/lib/content";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

export function FeaturedWork({ index }: { index?: string }) {
  return (
    <Section id="work">
      <SectionHeading
        index={index}
        eyebrow="Selected work"
        title="Results we can put a number"
        accent="on"
        lede="Three engagements across three markets. Every figure below came out of the client's own analytics, not ours."
      />

      <div className="mt-14 flex flex-col gap-4">
        {caseStudies.map((study, i) => (
          <article
            key={study.slug}
            data-reveal
            data-reveal-delay={`${i * 0.05}`}
            className="group relative overflow-hidden glass glass-edge rounded-2xl transition-colors duration-500 hover:border-[var(--line-strong)]"
          >
            <Link
              href={`/work/${study.slug}`}
              className="grid gap-8 p-7 lg:grid-cols-[1.6fr_1fr] lg:items-center lg:p-10"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-label text-[0.7rem] uppercase tracking-[0.14em] text-muted">
                  <span className="text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{study.client}</span>
                  <span className="text-faint">/</span>
                  <span>{study.sector}</span>
                  <span className="text-faint">/</span>
                  <span>{study.market}</span>
                </div>

                <h3 className="max-w-2xl text-[clamp(1.35rem,3vw,2rem)] transition-colors duration-500 group-hover:text-cobalt-lift">
                  {study.headline}
                </h3>

                <p className="max-w-2xl text-[0.97rem] leading-relaxed text-body">
                  {study.summary}
                </p>

                <ul className="mt-1 flex flex-wrap gap-2">
                  {study.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-line px-3 py-1 font-label text-[0.68rem] text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <dl className="grid grid-cols-3 gap-4 border-t border-line pt-6 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                {study.metrics.map((metric) => (
                  <div key={metric.label} className="flex flex-col gap-1">
                    <dt className="sr-only">{metric.label}</dt>
                    <dd className="font-display text-[clamp(1.35rem,2.6vw,1.9rem)] font-semibold tracking-tight text-bright tabular-nums">
                      {metric.value}
                    </dd>
                    <dd className="text-[0.78rem] leading-snug text-muted">
                      {metric.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-10" data-reveal>
        <ButtonLink href="/work" variant="ghost" arrow>
          All case studies
        </ButtonLink>
      </div>
    </Section>
  );
}
