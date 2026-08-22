"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonLink } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { stats } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Icons for the three stats surfaced in the hero, keyed by the label in
 * `content.ts`. The values themselves are never duplicated here — a second
 * copy would drift out of step with the same figures shown on /about.
 */
const statIcons: Record<string, React.ReactNode> = {
  "Projects delivered": (
    <path d="M3 7.5 12 3l9 4.5-9 4.5-9-4.5ZM3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
  ),
  "Client retention": <path d="M3 17.5 9 11l4 4 8-8.5M21 6.5h-5m5 0v5" />,
  "Markets served": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 9h17M3.5 15h17M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z" />
    </>
  ),
};

/** The three that earn hero space, in the order they read best. */
const heroStats = ["Projects delivered", "Client retention", "Markets served"]
  .map((label) => stats.find((s) => s.label === label))
  .filter((s): s is (typeof stats)[number] => Boolean(s));

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // The entrance is pure CSS (.appear). GSAP only owns the scroll-linked
      // exit, so the two systems never animate the same property.
      gsap.to("[data-hero-parallax]", {
        yPercent: -11,
        opacity: 0.5,
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
      id="top"
      className="relative flex min-h-[94svh] items-center overflow-hidden pt-32 pb-16 lg:min-h-screen"
    >
      <div className="container-page relative z-10">
        <div data-hero-parallax className="flex flex-col items-start gap-7">
          {/* Badge */}
          <span
            className="appear appear--pop glass glass-edge inline-flex items-center gap-2.5 rounded-full py-2 pl-3 pr-4"
            style={{ animationDelay: "0.22s" }}
          >
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="currentColor"
              aria-hidden="true"
              className="in-star text-gold"
              style={{ animationDelay: "0.28s" }}
            >
              <path d="M12 2.2l2.1 5.9 5.9 2.1-5.9 2.1-2.1 5.9-2.1-5.9L4 10.2l5.9-2.1L12 2.2Z" />
            </svg>
            <span className="font-label text-[0.68rem] uppercase tracking-[0.15em] text-body">
              Development studio · Lahore
            </span>
          </span>

          {/* Two-line headline, each line masked and released in sequence. */}
          <h1 className="max-w-[15ch] text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.96]">
            <span
              className="appear appear--mask"
              style={{ animationDelay: "0.42s" }}
            >
              <span>
                We build what the{" "}
                <em
                  className="in-em accent not-italic text-gradient"
                  style={{ animationDelay: "0.72s", fontStyle: "italic" }}
                >
                  brief
                </em>
              </span>
            </span>
            <span
              className="appear appear--mask"
              style={{ animationDelay: "0.62s" }}
            >
              <span>actually needed.</span>
            </span>
          </h1>

          <p
            className="appear appear--soft max-w-xl text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-body"
            style={{ animationDelay: "0.82s", animationDuration: "1.25s" }}
          >
            Full-stack web platforms, Flutter apps and search programmes — for
            clients in Lahore and across the UK, UAE and United States.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <span
              className="appear appear--btn"
              style={{ animationDelay: "0.96s" }}
            >
              <ButtonLink href="/contact" arrow magnetic>
                Start a project
              </ButtonLink>
            </span>
            <span
              className="appear appear--side"
              style={{ animationDelay: "1.10s" }}
            >
              <ButtonLink href="/work" variant="glass">
                See it in action
              </ButtonLink>
            </span>
          </div>

          {/* Stats footer */}
          <dl className="mt-6 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {heroStats.map((stat, i) => (
              <div
                key={stat.label}
                className="appear appear--stat glass glass-edge flex items-center gap-4 rounded-2xl p-5"
                style={{ animationDelay: `${1.12 + i * 0.16}s` }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-cobalt-lift">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {statIcons[stat.label]}
                  </svg>
                </span>

                <div className="flex flex-col">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-[1.35rem] font-semibold leading-tight tracking-tight text-bright">
                    <Counter value={stat.value} />
                  </dd>
                  <dd className="text-[0.8rem] leading-snug text-muted">
                    {stat.label}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
      >
        <span className="font-label text-[0.65rem] uppercase tracking-[0.2em] text-faint">
          Scroll
        </span>
        <span className="block h-10 w-px overflow-hidden bg-line">
          <span
            className="block h-full w-full origin-top animate-[scroll-cue_2.4s_ease-in-out_infinite]"
            style={{ background: "var(--cobalt-lift)" }}
          />
        </span>
      </div>
    </section>
  );
}
