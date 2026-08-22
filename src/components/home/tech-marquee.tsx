import { techStack } from "@/lib/content";

/**
 * The tech marquee. This is where the MERN credibility actually lands —
 * scanned in a second, and it costs nothing to render.
 *
 * The list is duplicated so the CSS translate can loop seamlessly at -50%.
 * The duplicate is hidden from assistive tech so it is not read twice.
 */
export function TechMarquee() {
  return (
    <section
      className="border-y border-line glass py-10"
      aria-label="Technologies we work with"
    >
      <div className="marquee-mask overflow-hidden">
        <div
          className="marquee-track flex w-max gap-3 hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:overflow-x-auto"
          style={{ "--marquee-duration": "48s" } as React.CSSProperties}
        >
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="flex shrink-0 gap-3"
              aria-hidden={copy === 1 ? "true" : undefined}
            >
              {techStack.map((tech) => (
                <li
                  key={`${copy}-${tech}`}
                  className="whitespace-nowrap rounded-full border border-line px-5 py-2.5 font-display text-[0.9rem] tracking-tight text-body"
                >
                  {tech}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
