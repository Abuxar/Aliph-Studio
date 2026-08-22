"use client";

import { useRef, Fragment } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

gsap.registerPlugin(ScrollTrigger);

type Props = {
  text: string;
  className?: string;
  /** Words rendered in the serif italic accent face, matched case-insensitively. */
  accentWords?: string[];
  as?: "h1" | "h2" | "h3" | "p";
  /** Play on mount instead of on scroll — for above-the-fold headings. */
  immediate?: boolean;
  delay?: number;
};

/**
 * Word-by-word mask reveal for headings.
 *
 * Each word sits in an overflow-hidden wrapper and rises from below, so the
 * line assembles rather than fading in. Splitting on words rather than
 * characters is deliberate: character splits look impressive on a three-word
 * hero and turn a paragraph into confetti, and they wreck screen-reader
 * output. The full string stays available to assistive tech via aria-label
 * while the visual spans are hidden from it.
 */
export function SplitText({
  text,
  className = "",
  accentWords = [],
  as: Tag = "h2",
  immediate = false,
  delay = 0,
}: Props) {
  const root = useRef<HTMLElement>(null);

  const accents = new Set(accentWords.map((w) => w.toLowerCase()));
  const words = text.split(" ");

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      const targets = root.current?.querySelectorAll("[data-word]");
      if (!targets?.length) return;

      if (reduced.matches) {
        gsap.set(targets, { yPercent: 0, opacity: 1 });
        return;
      }

      const anim = {
        yPercent: 0,
        opacity: 1,
        duration: 1.05,
        ease: "expo.out",
        stagger: 0.045,
        delay,
      };

      gsap.fromTo(
        targets,
        { yPercent: 112, opacity: 0 },
        immediate
          ? anim
          : {
              ...anim,
              scrollTrigger: {
                trigger: root.current,
                start: "top 86%",
                once: true,
              },
            },
      );
    },
    { scope: root, dependencies: [text] },
  );

  return (
    <Tag
      ref={root as React.Ref<HTMLHeadingElement & HTMLParagraphElement>}
      className={className}
      data-split
      aria-label={text}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            aria-hidden="true"
            className="inline-block overflow-hidden pb-[0.06em] align-bottom"
          >
            <span
              data-word
              className={
                accents.has(word.replace(/[^\w]/g, "").toLowerCase())
                  ? "accent text-gradient"
                  : undefined
              }
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
