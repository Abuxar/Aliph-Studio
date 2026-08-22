import { engagementModels } from "@/lib/content";
import { Section, SectionHeading } from "@/components/ui/section";

/**
 * International buyers filter on engagement model before they enquire.
 * Stating it plainly on the homepage removes a round trip.
 */
export function Engagement() {
  return (
    <Section id="engagement">
      <SectionHeading
        index="06"
        eyebrow="How to hire us"
        title="Three ways to work together, priced"
        accent="openly"
        lede="Pick the shape that matches your situation. We will tell you in discovery if you have picked the wrong one."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {engagementModels.map((model, i) => (
          <article
            key={model.name}
            data-reveal
            data-reveal-delay={`${i * 0.06}`}
            className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-7 transition-colors duration-500 hover:border-cobalt-dim"
          >
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[0.7rem] tabular-nums text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[1.35rem]">{model.name}</h3>
              <p className="text-[0.85rem] text-cobalt-lift">
                Best for: {model.best}
              </p>
            </div>

            <p className="flex-1 text-[0.95rem] leading-relaxed text-body">
              {model.body}
            </p>

            <ul className="flex flex-wrap gap-2 border-t border-line pt-5">
              {model.terms.map((term) => (
                <li
                  key={term}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[0.68rem] text-muted"
                >
                  {term}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
