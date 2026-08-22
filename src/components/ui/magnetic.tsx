"use client";

import { useRef, type ReactNode } from "react";

/**
 * Magnetic hover — the element leans toward the cursor as it approaches.
 *
 * Applied only to primary calls to action. Used on everything it becomes
 * noise; used on the two buttons that matter it reads as craft.
 *
 * Disabled for coarse pointers (there is no hover to anticipate on touch)
 * and under reduced-motion.
 */
export function Magnetic({
  children,
  strength = 0.32,
  className = "",
}: {
  children: ReactNode;
  /** Fraction of cursor offset the element travels. Above ~0.4 feels loose. */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef<number>(0);

  const enabled = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !enabled()) return;

    cancelAnimationFrame(frame.current);
    const { clientX, clientY } = e;

    frame.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const dx = (clientX - (rect.left + rect.width / 2)) * strength;
      const dy = (clientY - (rect.top + rect.height / 2)) * strength;
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.transform = "";
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
    >
      {children}
    </span>
  );
}
