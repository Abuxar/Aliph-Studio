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
 * The section pins and the five services advance as one gesture. On narrow
 * screens pinning fights the mobile URL bar and costs more than it gives, so
 * below the `lg` breakpoint this degrades to a plain stacked list.
 */
export function ServicesScrub() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      const wide = window.matchMedia("(min-width: 1024px)");
      if (reduced.matches || !wide.matches) return;

      const panels = gsap.utils.toArray<HTMLElement>("[data-service-panel]");

      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        // One viewport of scroll per service after the first.
        end: () => `+=${(panels.length - 1) * window.innerHeight * 0.85}`,
        pin: "[data-service-pin]",
        scrub: 0.5,
        onUpdate: (self) => {
          const next = Math.min(
            panels.length - 1,
            Math.round(self.progress * (panels.length - 1)),
          );
          setActive(next);
        },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative">
      <div data-service-pin className="lg:min-h-screen lg:py-24">
        <div className="container-page py-[clamp(4.5rem,10vw,7rem)] lg:py-0">
          <SectionHeading
            index="01"
            eyebrow="What we do"
            title="Five services, one"
            accent="team"
            lede="No handoffs between an agency that plans and a contractor that builds. The people who scope your project are the people who ship it."
          />

          <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-16">
            {/* Index rail — desktop only; it tracks the scrub. */}
            <ol className="hidden flex-col gap-1 lg:flex" aria-hidden="true">
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

            {/* Panels. All five are in the DOM and readable without JS —
                the scrub only changes which one is visually forward. */}
            <div className="flex flex-col gap-5 lg:relative lg:h-[26rem] lg:gap-0">
              {services.map((service, i) => (
                <article
                  key={service.slug}
                  data-service-panel
                  data-reveal
                  className={`flex flex-col gap-5 glass glass-edge rounded-2xl p-7 transition-opacity duration-500 lg:absolute lg:inset-0 lg:border-0 lg:bg-transparent lg:p-0 ${
                    i === active
                      ? "lg:opacity-100"
                      : "lg:pointer-events-none lg:opacity-0"
                  }`}
                >
                  <p className="eyebrow lg:hidden">
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
