"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * One ScrollTrigger batch for every `[data-reveal]` element on the page.
 *
 * Registering a trigger per component would mean dozens of independent
 * observers; batching keeps it to a single pass and staggers elements that
 * enter together, which is what makes the reveal read as one movement rather
 * than as many unrelated fades.
 *
 * Opt-in attributes on any element:
 *   data-reveal          — participate in the reveal
 *   data-reveal-delay    — extra delay in seconds
 *   data-reveal-x        — horizontal offset in px instead of vertical
 */
export function RevealEngine() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    // CSS already reveals everything under reduced-motion; do not animate.
    if (reduced.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.08,
            delay: (i, target: Element) =>
              Number((target as HTMLElement).dataset.revealDelay ?? 0),
            onComplete: () => {
              batch.forEach((el) =>
                (el as HTMLElement).setAttribute("data-reveal-done", ""),
              );
            },
          });
        },
      });

      // Elements that slide in horizontally start offset on the x axis.
      gsap.set("[data-reveal][data-reveal-x]", {
        x: (i, target: Element) =>
          Number((target as HTMLElement).dataset.revealX ?? 0),
        y: 0,
      });
    });

    // Late-loading fonts and images change layout; recalculate once settled.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, []);

  return null;
}
