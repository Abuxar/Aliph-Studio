import { testimonials } from "@/lib/content";
import { Section, SectionHeading } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";

export function Testimonials() {
  return (
    <Section>
      <SectionHeading
        index="05"
        eyebrow="What clients say"
        title="Named, attributed, and happy to take the"
        accent="call"
        lede="Anonymous quotes read as invented. Every reference below will speak to you directly if you ask."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {testimonials.map((item, i) => (
          <GlassCard key={item.name} className="p-7">
            <figure
              data-reveal
              data-reveal-delay={`${i * 0.06}`}
              className="flex h-full flex-col justify-between gap-7"
            >
            <blockquote className="text-[1rem] leading-relaxed text-body">
              <span
                aria-hidden="true"
                className="mb-3 block font-accent text-4xl leading-none text-cobalt-lift"
              >
                &ldquo;
              </span>
              {item.quote}
            </blockquote>

            <figcaption className="flex flex-col gap-0.5 border-t border-line pt-5">
              <span className="font-display text-[0.95rem] font-medium tracking-tight text-bright">
                {item.name}
              </span>
              <span className="text-[0.85rem] text-muted">
                {item.role}, {item.company}
              </span>
            </figcaption>
            </figure>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
