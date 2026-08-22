import { processSteps, faqs } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/json-ld";
import { Section } from "@/components/ui/section";
import { Faq } from "@/components/home/faq";
import { Cta } from "@/components/home/cta";

export const metadata = buildMetadata({
  title: "Our Process",
  description:
    "How Aliph Studio runs a project — discovery, design, build, launch and scale, with a deployed preview on every push and no surprises at the end.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Process", path: "/process" },
          ]),
          faqSchema(faqs),
        ]}
      />

      <section className="border-b border-line pt-36 pb-16 lg:pt-44 lg:pb-24">
        <div className="container-page">
          <p className="eyebrow">Process</p>
          <h1 className="mt-6 max-w-[16ch] text-[clamp(2.25rem,6.5vw,4.75rem)]">
            You see the work at every{" "}
            <span className="accent text-cobalt-lift">stage</span>
          </h1>
          <p className="mt-7 max-w-2xl text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-body">
            Hiring a team several time zones away is a real risk. Our process
            exists to take that risk off the table — mostly by removing the
            moments where you would otherwise be waiting in the dark.
          </p>
        </div>
      </section>

      <Section>
        <ol className="flex flex-col">
          {processSteps.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              className="grid gap-5 border-b border-line py-10 lg:grid-cols-[auto_1fr_auto] lg:gap-12 first:border-t"
            >
              <span className="font-mono text-[0.72rem] tabular-nums text-gold lg:pt-3">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex flex-col gap-3">
                <h2 className="text-[clamp(1.5rem,4vw,2.5rem)]">{step.title}</h2>
                <p className="max-w-2xl text-[1rem] leading-relaxed text-body">
                  {step.body}
                </p>
              </div>

              <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted lg:pt-4">
                {step.duration}
              </span>
            </li>
          ))}
        </ol>
      </Section>

      <div className="border-t border-line">
        <Faq items={faqs} index="02" />
      </div>

      <Cta />
    </>
  );
}
