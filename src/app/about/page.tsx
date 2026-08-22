import { site } from "@/lib/site";
import { stats, techStack } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/json-ld";
import { Section, SectionHeading } from "@/components/ui/section";
import { Location } from "@/components/home/location";
import { Cta } from "@/components/home/cta";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Aliph Studio is a development agency in DHA Phase 3, Lahore, building web platforms, Flutter apps and search programmes for clients across four markets.",
  path: "/about",
});

const principles = [
  {
    title: "Say the unwelcome thing early",
    body: "If the plan is wrong, the budget is short, or the feature is not worth building, you hear it in week one rather than at handover. It costs us work occasionally. It has never cost us a client.",
  },
  {
    title: "Ship the smallest thing that works",
    body: "Every line of code is a line someone maintains. We reach for the lightest solution that solves the problem, and we are suspicious of our own instinct to over-engineer.",
  },
  {
    title: "You own everything",
    body: "Code, accounts, infrastructure and documentation, from the first commit. No proprietary layer, no licence, no reason you cannot leave.",
  },
  {
    title: "Measure what the client cares about",
    body: "Not impressions, not lines of code, not story points. Load times, enquiries, revenue — the numbers that show up in your board pack.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <section className="border-b border-line pt-36 pb-16 lg:pt-44 lg:pb-24">
        <div className="container-page">
          <p className="eyebrow">About</p>
          <h1 className="mt-6 max-w-[16ch] text-[clamp(2.25rem,6.5vw,4.75rem)]">
            A small studio that would rather be{" "}
            <span className="accent text-cobalt-lift">useful</span> than large
          </h1>
          <p className="mt-7 max-w-2xl text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-body">
            {site.name} builds web platforms, mobile apps and search programmes
            from {site.contact.locality}. We have deliberately stayed small
            enough that the people you meet in the first call are the people who
            write your code.
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

      <Section>
        <SectionHeading
          index="01"
          eyebrow="How we operate"
          title="Four things we will not"
          accent="trade away"
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {principles.map((principle, i) => (
            <article
              key={principle.title}
              data-reveal
              data-reveal-delay={`${i * 0.05}`}
              className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-7"
            >
              <span className="font-mono text-[0.7rem] tabular-nums text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[1.3rem]">{principle.title}</h3>
              <p className="text-[0.95rem] leading-relaxed text-body">
                {principle.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line">
        <SectionHeading
          index="02"
          eyebrow="What we work in"
          title="The tools we reach for, and the ones we"
          accent="argue about"
          lede="We are not religious about any of these. The stack follows the problem, and we will tell you when the interesting choice is the wrong one."
        />

        <ul className="mt-12 flex flex-wrap gap-2" data-reveal>
          {techStack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line bg-surface px-4 py-2 font-display text-[0.9rem] tracking-tight text-body"
            >
              {tech}
            </li>
          ))}
        </ul>
      </Section>

      <div className="border-t border-line">
        <Location />
      </div>

      <Cta />
    </>
  );
}
