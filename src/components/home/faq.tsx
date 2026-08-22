import { Section, SectionHeading } from "@/components/ui/section";

/**
 * Native <details> rather than a JS accordion: it is keyboard accessible for
 * free, the answers are in the DOM for crawlers, and it costs zero JS.
 * Pair this with `faqSchema()` wherever it is used.
 */
export function Faq({
  items,
  index,
  eyebrow = "Questions",
  title = "The things clients ask before they",
  accent = "commit",
  lede,
}: {
  items: { q: string; a: string }[];
  /** Omit on pages whose sections are not numbered. */
  index?: string;
  eyebrow?: string;
  title?: string;
  accent?: string;
  lede?: string;
}) {
  return (
    <Section id="faq">
      <SectionHeading
        index={index}
        eyebrow={eyebrow}
        title={title}
        accent={accent}
        lede={lede}
      />

      <div className="mt-12 max-w-3xl">
        {items.map((item) => (
          <details
            key={item.q}
            data-reveal
            className="group border-b border-line"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-display text-[1.05rem] font-medium tracking-tight text-bright transition-colors hover:text-cobalt-lift [&::-webkit-details-marker]:hidden">
              {item.q}

              <span
                aria-hidden="true"
                className="relative mt-2 block h-3 w-3 shrink-0"
              >
                <span className="absolute left-0 top-1/2 block h-px w-3 -translate-y-1/2 bg-current" />
                <span className="absolute left-1/2 top-0 block h-3 w-px -translate-x-1/2 bg-current transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-open:rotate-90" />
              </span>
            </summary>

            <p className="max-w-2xl pb-6 pr-10 text-[0.97rem] leading-relaxed text-body">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
