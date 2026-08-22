"use client";

import { useEffect } from "react";

/**
 * Locks in the entrance choreography, and guarantees it can never strand
 * content invisible.
 *
 * Two responsibilities:
 *
 * 1. On each `.appear` element's own `animationend`, add `.is-in` so the
 *    resting state is permanent — later repaints, a theme switch, or a
 *    re-render cannot replay or half-apply the keyframe.
 *
 * 2. After two `requestAnimationFrame` ticks, check whether any animation is
 *    actually running. If none is — CSS failed to load, the browser does not
 *    support the keyframes, reduced-motion stripped them — force `.is-in`
 *    onto everything. Combined with the resting `opacity: 1` in the
 *    stylesheet, this makes it impossible for the animation layer to hide
 *    content by failing.
 */
export function AppearEngine() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".appear, .in-star, .in-em"),
    );
    if (!nodes.length) return;

    const lock = (el: HTMLElement) => el.classList.add("is-in");
    const onEnd = (e: AnimationEvent) => lock(e.currentTarget as HTMLElement);

    nodes.forEach((el) => el.addEventListener("animationend", onEnd));

    // Two frames: one to commit layout, one for animations to have started.
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => {
        const running = nodes.some(
          (el) => el.getAnimations?.().some((a) => a.playState === "running"),
        );
        if (!running) nodes.forEach(lock);
      });
    });

    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
      nodes.forEach((el) => el.removeEventListener("animationend", onEnd));
    };
  }, []);

  return null;
}
