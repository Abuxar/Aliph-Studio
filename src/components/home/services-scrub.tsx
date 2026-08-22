"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { services } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Set piece 2 — the pinned services scrub.
 *
 * The section pins and the five services advance as one gesture. Below the
 * breakpoint, pinning fights the mobile URL bar and costs more than it gives,
 * so it degrades to a plain stacked list.
 *
 * Panel visibility is owned entirely by GSAP, never by Tailwind classes.
 * These panels must NOT carry `data-reveal`: the reveal engine writes an
 * inline `opacity: 1`, inline styles beat classes, and every panel would be
 * forced visible at once — stacking all five on top of each other and making
 * the scrub look broken.
 *
 * `gsap.matchMedia` scopes the desktop behaviour to the breakpoint and
 * reverts every tween it created when the query stops matching, so resizing
 * across the boundary cannot leave a panel stuck hidden.
 *
 * The layout uses the `scrub:` variant, NOT `lg:`, and its query must match
 * the matchMedia query below exactly. If the two ever diverge, a viewport
 * that satisfies one but not the other stacks the panels without running the
 * script that hides them — and all five render on top of each other.
 */
export function ServicesScrub() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        // Height is gated as well as width: a pinned section is locked to
        // one screen, so on a short laptop viewport the heading plus the
        // panel do not fit and the copy is clipped with no way to scroll it.
        "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
        () => {
          const panels = gsap.utils.toArray<HTMLElement>("[data-service-panel]");
          if (panels.length === 0) return;

          // Only the first panel starts visible; the rest are hidden and
          // taken out of the accessibility tree via autoAlpha.
          gsap.set(panels, { autoAlpha: 0 });
          gsap.set(panels[0], { autoAlpha: 1 });

          let current = 0;

          ScrollTrigger.create({
            trigger: root.current,
            start: "top top",
            // Roughly one viewport of scroll per service after the first.
            end: () =>
              `+=${(panels.length - 1) * window.innerHeight * 0.85}`,
            pin: "[data-service-pin]",
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const next = Math.min(
                panels.length - 1,
                Math.max(0, Math.round(self.progress * (panels.length - 1))),
              );
              if (next === current) return;

              gsap.to(panels[current], { autoAlpha: 0, duration: 0.3 });
              gsap.to(panels[next], { autoAlpha: 1, duration: 0.45 });

              current = next;
              setActive(next);
            },
          });

          // matchMedia reverts the gsap.set calls above on cleanup, restoring
          // the stacked-list layout when the query stops matching.
          return () => setActive(0);
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative">
      <div data-service-pin className="scrub:min-h-[100svh] scrub:py-20">
        <div className="container-page py-[clamp(4.5rem,10vw,7rem)] scrub:py-0">
          <SectionHeading
            index="01"
            eyebrow="What we do"
            title="Five services, one"
            accent="team"
            lede="No handoffs between an agency that plans and a contractor that builds. The people who scope your project are the people who ship it."
          />

          <div className="mt-14 grid gap-10 scrub:mt-16 scrub:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] scrub:gap-16">
            {/* Index rail — desktop only; it tracks the scrub. */}
            <ol className="hidden flex-col gap-1 scrub:flex" aria-hidden="true">
              {services.map((service, i) => (
                <li
                  key={service.slug}
                  className={`flex items-center gap-4 border-l py-3.5 pl-5 transition-colors duration-500 ${
                    i === active
                      ? "border-cobalt-lift text-bright"
                      : "border-line text-faint"
                  }`}
                >
                  <span className="font-label text-[0.7rem] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[1.05rem] font-medium tracking-tight">
                    {service.title}
                  </span>
                </li>
              ))}
            </ol>

            {/* Panels. All five are in the DOM and readable without JS — the
                scrub only changes which one is forward. On desktop they share
                one grid cell, so the container tracks the tallest panel and no
                copy can overflow a hard-coded height. */}
            <div className="flex flex-col gap-5 scrub:grid scrub:gap-0">
              {services.map((service, i) => (
                <article
                  key={service.slug}
                  data-service-panel
                  className="glass glass-edge flex flex-col gap-5 rounded-2xl p-7 scrub:[grid-area:1/1] scrub:p-9"
                >
                  <p className="eyebrow scrub:hidden">
                    {String(i + 1).padStart(2, "0")}
                  </p>

                  <h3 className="text-[clamp(1.5rem,3.4vw,2.25rem)]">
                    {service.title}
                  </h3>

                  <p className="max-w-lg text-[1rem] leading-relaxed text-body">
                    {service.summary}
                  </p>

                  <p className="max-w-lg border-l-2 border-line pl-4 text-[0.95rem] italic leading-relaxed text-muted">
                    {service.problem}
                  </p>

                  <ul className="flex flex-wrap gap-2">
                    {service.stack.slice(0, 5).map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-line px-3 py-1 font-label text-[0.68rem] tracking-wide text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/services/${service.slug}`}
                    className="group mt-1 inline-flex w-fit items-center gap-2 font-display text-[0.9rem] font-medium tracking-tight text-cobalt-lift"
                  >
                    Explore {service.short.toLowerCase()}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path
                        d="M2 7h10M8 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
