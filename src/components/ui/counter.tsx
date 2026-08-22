"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Counts a numeric stat up when it scrolls into view.
 *
 * Values arrive as display strings ("+240%", "2.1yr", "99.95%"), so the
 * numeric part is extracted and the prefix/suffix preserved verbatim. Decimal
 * precision is inferred from the source string rather than assumed, so "2.1yr"
 * does not animate to "2yr".
 *
 * The final value is what renders server-side, so a crawler — and anyone with
 * reduced-motion or no JS — sees the real number, never a zero.
 */
export function Counter({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const match = value.match(/-?\d+(\.\d+)?/);
      if (!match) return;

      const target = parseFloat(match[0]);
      const decimals = match[0].includes(".")
        ? match[0].split(".")[1].length
        : 0;
      const prefix = value.slice(0, match.index);
      const suffix = value.slice((match.index ?? 0) + match[0].length);

      const state = { n: 0 };

      gsap.to(state, {
        n: target,
        duration: 1.8,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${state.n.toFixed(decimals)}${suffix}`;
        },
        onComplete: () => {
          // Snap back to the authored string so formatting is exact.
          el.textContent = value;
        },
      });
    },
    { dependencies: [value] },
  );

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value}
    </span>
  );
}
