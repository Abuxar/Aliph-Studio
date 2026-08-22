import type { ReactNode } from "react";

/**
 * Section shell. Every section on the site is spaced by this component
 * rather than by ad-hoc margins, so vertical rhythm stays consistent and
 * adjacent margins can never collapse into each other.
 */
export function Section({
  children,
  id,
  className = "",
  bleed = false,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Skip the page container — for full-bleed marquees and reels. */
  bleed?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative py-[clamp(4.5rem,10vw,9rem)] ${className}`}
    >
      {bleed ? children : <div className="container-page">{children}</div>}
    </section>
  );
}

/**
 * Section heading. The eyebrow carries an index because these sections read
 * as an ordered argument down the page — it is not decoration.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  lede,
  align = "left",
}: {
  index?: string;
  eyebrow: string;
  title: string;
  /** Serif-italic tail of the headline. */
  accent?: string;
  lede?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <div
      className={`flex flex-col gap-5 ${centered ? "items-center text-center" : "max-w-3xl"}`}
    >
      <div
        className="flex items-center gap-3 eyebrow"
        data-reveal
      >
        {index ? <span className="text-gold">{index}</span> : null}
        <span className="h-px w-8 bg-line" aria-hidden="true" />
        <span>{eyebrow}</span>
      </div>

      <h2
        className="text-[clamp(1.9rem,4.6vw,3.25rem)]"
        data-reveal
        data-reveal-delay="0.05"
      >
        {title}
        {accent ? (
          <>
            {" "}
            <span className="accent text-cobalt-lift">{accent}</span>
          </>
        ) : null}
      </h2>

      {lede ? (
        <p
          className={`text-[1.0625rem] leading-relaxed text-body ${centered ? "max-w-2xl" : "max-w-xl"}`}
          data-reveal
          data-reveal-delay="0.1"
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
