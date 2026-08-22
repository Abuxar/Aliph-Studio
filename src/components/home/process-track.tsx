"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { processSteps } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Set piece 3 — the horizontal process track.
 *
 * Vertical scroll drives a horizontal five-step timeline: the metaphor and
 * the motion agree, which is the only reason to use horizontal scroll at all.
 * Below `lg` it becomes a native swipe carousel — no pinning, no hijack.
 */
export function ProcessTrack() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      const wide = window.matchMedia("(min-width: 1024px)");
      if (reduced.matches || !wide.matches) return;

      const track = root.current?.querySelector<HTMLElement>("[data-track]");
      if (!track) return;

      const distance = () => track.scrollWidth - window.innerWidth * 0.82;

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Progress rail fills with the track.
      gsap.fromTo(
        "[data-track-progress]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden py-[clamp(4.5rem,10vw,7rem)] lg:min-h-screen lg:py-0">
      <div className="lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-24">
        <div className="container-page">
          <SectionHeading
            index="03"
            eyebrow="How we work"
            title="Five stages, and you see the work at"
            accent="every one"
            lede="Hiring a team eight time zones away is a risk. This is how we take it off the table."
          />
        </div>

        {/* Rail */}
        <div className="container-page mt-12 hidden lg:block">
          <div className="relative h-px w-full bg-line">
            <span
              data-track-progress
              className="absolute inset-0 block bg-cobalt-lift"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Track — horizontal on desktop, swipe carousel on mobile. */}
        <div className="mt-10 lg:mt-14 lg:overflow-hidden">
          <ol
            data-track
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-[clamp(1.25rem,5vw,4rem)] pb-4 lg:snap-none lg:overflow-visible lg:pb-0"
          >
            {processSteps.map((step, i) => (
              <li
                key={step.title}
                className="flex w-[78vw] shrink-0 snap-start flex-col gap-4 glass glass-edge rounded-2xl p-7 sm:w-[62vw] md:w-[44vw] lg:w-[28rem] lg:p-9"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-label text-[0.72rem] tabular-nums text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-label text-[0.7rem] uppercase tracking-[0.14em] text-faint">
                    {step.duration}
                  </span>
                </div>

                <h3 className="text-[clamp(1.4rem,2.6vw,1.9rem)]">
                  {step.title}
                </h3>

                <p className="text-[0.97rem] leading-relaxed text-body">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
