import { site } from "@/lib/site";
import { stats } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/json-ld";
import { Section } from "@/components/ui/section";
import { Testimonials } from "@/components/home/testimonials";
import { Cta } from "@/components/home/cta";

export const metadata = buildMetadata({
  title: "Client Reviews",
  description:
    "What clients say about working with Aliph Studio — named, attributed references from engagements across Pakistan, the UK, UAE and United States.",
  path: "/reviews",
});

/**
 * NOTE: no Review or AggregateRating structured data here, deliberately.
 *
 * Google does not award review rich results to self-serving reviews — those a
 * business publishes about itself on its own site — and marking up
 * unverifiable testimonials as Review data risks a manual action rather than
 * a star rating. Ratings belong on third-party profiles (Clutch, GoodFirms,
 * Google Business Profile), which is where the `sameAs` links point.
 */
export default function ReviewsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
        ])}
      />

      <section className="border-b border-line pt-36 pb-16 lg:pt-44 lg:pb-24">
        <div className="container-page">
          <p className="eyebrow">Reviews</p>

          <h1 className="mt-6 max-w-[18ch] text-[clamp(2.25rem,6.5vw,4.75rem)]">
            Every reference here will take your{" "}
            <span className="accent text-cobalt-lift">call</span>
          </h1>

          <p className="mt-7 max-w-2xl text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-body">
            Named, attributed, and happy to speak to you directly. Anonymous
            quotes read as invented, so we do not publish them — if you want to
            hear it unfiltered, ask and we will make the introduction.
          </p>

          <dl className="mt-14 grid grid-cols-2 gap-8 border-t border-line pt-10 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1.5">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight text-bright tabular-nums">
                  {stat.value}
                </dd>
                <dd className="text-[0.85rem] text-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Testimonials />

      <Section className="border-t border-line">
        <div className="flex flex-col gap-5" data-reveal>
          <p className="eyebrow">Independent profiles</p>
          <p className="max-w-2xl text-[1rem] leading-relaxed text-body">
            Reviews published on our own site are, unavoidably, ones we chose.
            For ratings we cannot edit, our profiles on the directories where
            buyers actually shortlist are the better source.
          </p>

          <ul className="mt-2 flex flex-wrap gap-3">
            {[
              { label: "Clutch", href: site.social.clutch },
              { label: "LinkedIn", href: site.social.linkedin },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glass-edge relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-[0.9rem] font-medium tracking-tight text-bright transition-colors hover:text-cobalt-lift"
                >
                  {item.label}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 10 10 4M10 4H5.5M10 4v4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Cta />
    </>
  );
}
