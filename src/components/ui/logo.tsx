/**
 * The alif — the first letter of the abjad, and the root of the studio's name.
 *
 * Drawn as SVG rather than set as the character ا. Neither Inter nor
 * Instrument Serif carries Arabic coverage, so a literal ا would fall through
 * to whatever system Arabic face the visitor happens to have — a different
 * shape, weight and vertical alignment on every machine, in the one place the
 * brand can least afford it. As a path it renders identically everywhere,
 * scales cleanly, and takes currentColor.
 *
 * The outline is drawn with calligraphic modulation rather than as a plain
 * bar: a fuller head where a nib would land at the start of the stroke, a
 * gentle taper down the shaft, and a rounded foot on the baseline.
 */
const ALIF_PATH =
  // Top edge is a diagonal — the cut a broad nib leaves entering the stroke.
  // The shaft is fullest just under the head and tapers to the baseline,
  // where it finishes on a rounded foot.
  "M8.3 13.5 15.4 4.8c1.1-.6 1.7.8 1.3 2.8L14 84c-.15 5.9-1.3 9.6-3 9.6-1.8 0-2.85-3.5-2.75-9.1Z";

/** Letterform only, tight bounds, for setting inside text. */
export function AlifGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="5 0 14 100"
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMax meet"
    >
      <path d={ALIF_PATH} fill="currentColor" />
    </svg>
  );
}

/** Standalone mark, including the gold nuqta. Used in the footer. */
export function AlifMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="2 0 26 100"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={ALIF_PATH} fill="currentColor" />
      <rect x="19" y="87" width="5.5" height="5.5" className="fill-gold" />
    </svg>
  );
}

/**
 * The wordmark: "Al·alif·ph Studio", set in the same Instrument Serif italic
 * used for emphasis in headlines, so the logotype and the display voice agree.
 *
 * The alif replaces the "i" and is deliberately taller than the cap height of
 * the surrounding letters, so it reads as the origin of the name rather than
 * as a substituted character.
 *
 * Alignment relies on `items-baseline`: for a replaced element such as an
 * SVG, the flex baseline is its bottom margin edge, so the glyph's foot lands
 * exactly on the text baseline and every bit of its extra height rises above.
 * Sizing is in `em` so the whole lockup scales from one font-size.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline text-[1.5rem] leading-none tracking-tight ${className}`}
      aria-label="Aliph Studio"
      role="img"
    >
      <span className="accent text-bright" aria-hidden="true">
        Al
      </span>

      <AlifGlyph className="mx-[0.05em] h-[1.12em] w-auto text-cobalt-lift" />

      <span className="accent text-bright" aria-hidden="true">
        ph
      </span>

      <span className="accent ml-[0.26em] text-muted" aria-hidden="true">
        Studio
      </span>
    </span>
  );
}
