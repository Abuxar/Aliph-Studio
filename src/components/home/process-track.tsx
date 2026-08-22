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
      const mm = gsap.matchMedia();

      /**
       * Pinning is gated on viewport HEIGHT as well as width. A pinned
       * section is locked to one screen, so on a short laptop viewport the
       * heading plus the cards do not fit and the content is cut off with
       * nothing the reader can do about it. Below 700px tall we fall back to
       * the same swipe carousel mobile gets, which scrolls normally.
       */
      mm.add(
        "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = root.current?.querySelector<HTMLElement>("[data-track]");
          if (!track) return;

          // How far the track must travel for its last card to reach the
          // right edge. Clamped at 0 so a track that already fits cannot
          // produce a negative scroll distance.
          const distance = () =>
            Math.max(0, track.scrollWidth - track.clientWidth);

          const shared = {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
          } as const;

          gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: { ...shared, pin: true, anticipatePin: 1 },
          });

          // Progress rail fills with the track.
          gsap.fromTo(
            "[data-track-progress]",
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              transformOrigin: "left center",
              scrollTrigger: shared,
            },
          );
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    /* `min-h` rather than a fixed screen height, and only where the section
       is actually tall enough to pin — otherwise the section sizes to its
       content and scrolls normally. */
    <section
      ref={root}
      className="relative overflow-hidden py-[clamp(4rem,8vw,6rem)] scrub:min-h-[100svh] scrub:py-0"
    >
      <div className="flex flex-col justify-center scrub:min-h-[100svh] scrub:py-16">
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
        <div className="container-page mt-10 hidden scrub:block">
          <div className="relative h-px w-full bg-line">
            <span
              data-track-progress
              className="absolute inset-0 block bg-cobalt-lift"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Track — horizontal on desktop, swipe carousel on mobile. */}
        <div className="mt-8 scrub:mt-10 scrub:overflow-hidden">
          <ol
            data-track
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-[clamp(1.25rem,5vw,4rem)] pb-4 scrub:snap-none scrub:overflow-visible scrub:pb-0"
          >
            {processSteps.map((step, i) => (
              <li
                key={step.title}
                className="flex w-[78vw] shrink-0 snap-start flex-col gap-3.5 glass glass-edge rounded-2xl p-6 sm:w-[62vw] md:w-[44vw] scrub:w-[26rem] scrub:p-8"
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
