"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonLink } from "@/components/ui/button";
import { stats } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Headline lines, split so each can rise out of its own mask. */
const LINES = [
  [{ t: "We build what" }],
  [{ t: "the brief " }, { t: "actually", accent: true }],
  [{ t: "needed." }],
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

      if (reduced.matches) {
        gsap.set("[data-hero]", { opacity: 1, y: 0 });
        gsap.set("[data-hero-line] > span", { y: "0%" });
        return;
      }

      // Intro: the mark draws, the headline rises line by line, the rest
      // settles behind it. One orchestrated moment rather than five fades.
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        "[data-hero-rule]",
        { scaleY: 0 },
        { scaleY: 1, duration: 1.1, transformOrigin: "top center" },
      )
        .fromTo(
          "[data-hero-line] > span",
          { yPercent: 108 },
          { yPercent: 0, duration: 1.15, stagger: 0.09 },
          0.15,
        )
        .fromTo(
          "[data-hero-eyebrow]",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.1,
        )
        .fromTo(
          "[data-hero]",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 },
          0.55,
        );

      // Parallax: the headline drifts up faster than the ground as you leave,
      // which is what gives the section depth on the way out.
      gsap.to("[data-hero-parallax]", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      gsap.to("[data-hero-glow]", {
        yPercent: 22,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[92svh] items-center overflow-hidden pt-32 pb-20 lg:min-h-screen"
    >
      {/* Atmosphere — a cobalt bloom and a faint grid, both purely decorative. */}
      <div
        aria-hidden="true"
        data-hero-glow
        className="pointer-events-none absolute left-1/2 top-[-18%] h-[70vh] w-[110vw] -translate-x-1/2 rounded-[50%] opacity-60 blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(47,111,240,0.28), rgba(47,111,240,0.05) 62%, transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(31,40,54,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(31,40,54,0.7) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 80% 55% at 50% 40%, #000 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 55% at 50% 40%, #000 20%, transparent 75%)",
        }}
      />

      <div className="container-page relative z-10">
        <div data-hero-parallax className="flex flex-col gap-10">
          <div className="flex items-center gap-4">
            {/* The alif, abstracted to the vertical rule it really is. */}
            <span
              data-hero-rule
              aria-hidden="true"
              className="block h-12 w-px bg-gradient-to-b from-cobalt-lift to-transparent"
            />
            <p data-hero-eyebrow className="eyebrow">
              Development studio · Lahore
            </p>
          </div>

          <h1 className="max-w-[16ch] text-[clamp(2.75rem,8.5vw,7rem)] leading-[0.95]">
            {LINES.map((line, i) => (
              <span
                key={i}
                data-hero-line
                className="block overflow-hidden pb-[0.08em]"
              >
                <span className="block">
                  {line.map((part, j) =>
                    part.accent ? (
                      <span key={j} className="accent text-cobalt-lift">
                        {part.t}
                      </span>
                    ) : (
                      <span key={j}>{part.t}</span>
                    ),
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p
            data-hero
            className="max-w-xl text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-body"
          >
            Full-stack web platforms, Flutter apps and search programmes — for
            clients in Lahore and across the UK, UAE and United States.
          </p>

          <div data-hero className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/contact" arrow>
              Start a project
            </ButtonLink>
            <ButtonLink href="/work" variant="ghost">
              See the work
            </ButtonLink>
          </div>

          {/* Proof, immediately after the promise. */}
          <dl
            data-hero
            className="mt-4 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-[1.6rem] font-semibold tracking-tight text-bright tabular-nums">
                  {stat.value}
                </dd>
                <dd className="text-[0.8rem] leading-snug text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-faint">
          Scroll
        </span>
        <span className="block h-10 w-px overflow-hidden bg-line">
          <span className="block h-full w-full origin-top animate-[scroll-cue_2.4s_ease-in-out_infinite] bg-cobalt-lift" />
        </span>
      </div>
    </section>
  );
}
