"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
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
 * Keyed on `pathname` — this is load-bearing, not an optimisation. This
 * component is mounted once in the root layout, so with an empty dependency
 * array the batch only ever covers the first page's elements. Every element
 * on a client-side navigation would then stay stuck at `opacity: 0`, and the
 * page would render blank below the fold.
 *
 * Opt-in attributes on any element:
 *   data-reveal          — participate in the reveal
 *   data-reveal-delay    — extra delay in seconds
 */
export function RevealEngine() {
  const pathname = usePathname();

  useEffect(() => {
    // CSS already reveals everything under reduced-motion; do not animate.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
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
    });

    /**
     * Safety net. If an element is already past the trigger point when the
     * batch is created — a deep link, a restored scroll position, a fast
     * navigation — `onEnter` never fires for it and it would stay invisible.
     * Reveal anything already in or above the viewport immediately.
     */
    const rescue = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal-done])")
        .forEach((el) => {
          if (el.getBoundingClientRect().top < window.innerHeight * 0.88) {
            gsap.set(el, { opacity: 1, y: 0 });
            el.setAttribute("data-reveal-done", "");
          }
        });
    };

    ScrollTrigger.refresh();
    rescue();

    // Late-loading fonts, images and the background video change layout.
    const onLoad = () => {
      ScrollTrigger.refresh();
      rescue();
    };
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
