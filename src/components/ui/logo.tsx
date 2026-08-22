/**
 * The Aliph Studio logotype, redrawn from the supplied artwork as vector.
 *
 * The original is a silver-on-black raster. Rebuilt as SVG plus live text it
 * stays crisp at any size, weighs almost nothing, and — the reason that
 * matters here — takes `currentColor`, so one asset serves the dark theme,
 * the light theme, and glass surfaces alike. A black-background JPEG would
 * have needed masking or a separate file for each.
 *
 * The alif is the mark: a tapering blade, fine at both ends and fullest
 * through the upper middle, leaning left as it descends, with a tilted square
 * nuqta floating above it.
 */

const ALIF_PATH =
  "M28.6 33c2.6 20 2.2 43-.2 63-2.6 22-9.6 48-22.4 67 4-25 7.6-48 10.4-70 2.8-22 8-46 12.2-60Z";

/** Bounds are tight to the ink, so the glyph's foot lands on the baseline. */
const ALIF_VIEWBOX = "4 9 35 156";

export function AlifGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={ALIF_VIEWBOX}
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMax meet"
    >
      <rect
        x="21"
        y="13.5"
        width="13"
        height="13"
        rx="1"
        transform="rotate(38 27.5 20)"
        fill="currentColor"
      />
      <path d={ALIF_PATH} fill="currentColor" />
    </svg>
  );
}

/** Alias so the footer's existing import keeps resolving. */
export const AlifMark = AlifGlyph;

/**
 * "Al·alif·ph" over a ruled STUDIO line, as in the supplied artwork.
 *
 * The alif is sized to tower over the cap height the way the original does.
 * Alignment relies on `items-baseline`: for a replaced element such as an SVG
 * the flex baseline is its bottom margin edge, so the blade's tip sits on the
 * text baseline and every bit of its extra height rises above — no hand-tuned
 * offsets to re-derive whenever the size changes.
 *
 * Everything is in `em`, so the whole lockup scales from one font-size.
 */
export function Wordmark({
  className = "",
  showStudio = true,
}: {
  className?: string;
  /** Drop the ruled STUDIO line where vertical room is tight. */
  showStudio?: boolean;
}) {
  return (
    <span
      className={`inline-flex flex-col items-center leading-none ${className}`}
      aria-label="Aliph Studio"
      role="img"
    >
      <span
        className="serif inline-flex items-baseline text-[1.5rem] tracking-[0.01em] text-bright"
        aria-hidden="true"
      >
        Al
        <AlifGlyph className="mx-[0.06em] h-[1.6em] w-auto" />
        ph
      </span>

      {showStudio ? (
        <span
          className="mt-[0.3em] flex w-full items-center gap-[0.55em]"
          aria-hidden="true"
        >
          <span className="h-px flex-1 bg-[var(--line-strong)]" />
          <span className="serif text-[0.5rem] uppercase leading-none tracking-[0.42em] text-muted">
            {/* The trailing letter-space would otherwise push STUDIO off centre. */}
            <span className="-mr-[0.42em] inline-block">Studio</span>
          </span>
          <span className="h-px flex-1 bg-[var(--line-strong)]" />
        </span>
      ) : null}
    </span>
  );
}
