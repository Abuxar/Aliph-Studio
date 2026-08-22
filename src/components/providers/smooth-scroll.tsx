"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * The single scroll authority for the whole site.
 *
 * Lenis owns the scroll position and drives GSAP's ticker, and ScrollTrigger
 * is told to read from Lenis rather than the native scroll event. Running two
 * smooth-scroll implementations at once produces jitter that cannot be tuned
 * out, so nothing else in the app may install a scroll smoother.
 *
 * Users who ask for reduced motion get native scrolling — Lenis never starts.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.05,
      // Expo-out: quick to respond, long settle. This is most of the
      // "expensive" feel — it is worth tuning by hand rather than by preset.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Never smooth touch: it fights the OS scroller and feels broken.
      syncTouch: false,
      touchMultiplier: 1.8,
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links must keep working — Lenis owns the scroll, so hand them over.
    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /**
   * Jump to the top on navigation.
   *
   * Lenis holds its own scroll position, so Next's default restoration does
   * not reach it — without this you land at the previous page's offset,
   * typically part-way down a page whose content has not revealed yet.
   * Triggers are refreshed afterwards because the new page's height differs.
   */
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  return <>{children}</>;
}
