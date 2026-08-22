/**
 * The alif — the first letter of the abjad, and the root of the studio's name.
 *
 * A single vertical stroke is the whole identity: it stands in for the "l" in
 * the wordmark, appears as the mark on its own, and repeats as the rule
 * running down section spines.
 *
 * Drawn as SVG rather than set as the character ا. Neither Inter nor
 * Instrument Serif carries Arabic coverage, so a literal ا would fall through
 * to whatever system Arabic face the visitor happens to have — a different
 * shape, weight and vertical alignment on every machine, in the one place the
 * brand can least afford it. As a path it renders identically everywhere,
 * scales cleanly, and takes currentColor.
 */

/** Letterform only, tight bounds, for setting inside text. */
export function AlifGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="4 0 12 92"
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMax meet"
    >
      <path
        d="M9 2c3.4 0 5.6 1.1 5.6 3.4 0 1.2-.5 2.3-.9 4.2-.5 2.4-.7 5-.7 8.4v56c0 2.6.3 4.4.3 5.6 0 2.2-1.3 3.4-3.4 3.4S6.5 81.8 6.5 79c0-1.4.3-3.2.3-5.9V18c0-4.2-.3-7-.9-9.3C5.4 6.4 5 5.3 5 4.4 5 2.9 6.5 2 9 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Standalone mark, including the gold nuqta. Used in the footer. */
export function AlifMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 26 92"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M9 2c3.4 0 5.6 1.1 5.6 3.4 0 1.2-.5 2.3-.9 4.2-.5 2.4-.7 5-.7 8.4v56c0 2.6.3 4.4.3 5.6 0 2.2-1.3 3.4-3.4 3.4S6.5 81.8 6.5 79c0-1.4.3-3.2.3-5.9V18c0-4.2-.3-7-.9-9.3C5.4 6.4 5 5.3 5 4.4 5 2.9 6.5 2 9 2Z"
        fill="currentColor"
      />
      <rect x="18" y="80" width="5" height="5" className="fill-gold" />
    </svg>
  );
}

/**
 * The wordmark: "A·alif·iph Studio", set in the same Instrument Serif italic
 * used for emphasis in headlines, so the logotype and the display voice agree.
 *
 * The alif is sized in `em` so it tracks the font size, and the whole lockup
 * carries an aria-label — the glyph is decorative markup, and without one a
 * screen reader would announce "A iph Studio".
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline text-[1.45rem] leading-none tracking-tight ${className}`}
      aria-label="Aliph Studio"
      role="img"
    >
      <span className="accent text-bright" aria-hidden="true">
        A
      </span>

      {/* Sits on the baseline with the letters; nudged for optical spacing. */}
      <AlifGlyph
        className="mx-[0.045em] h-[0.86em] w-auto self-end translate-y-[-0.04em] text-cobalt-lift"
      />

      <span className="accent text-bright" aria-hidden="true">
        iph
      </span>

      <span className="accent ml-[0.26em] text-muted" aria-hidden="true">
        Studio
      </span>
    </span>
  );
}
