/**
 * The alif — the first letter of the abjad, and the studio's name.
 *
 * A single vertical stroke is the whole identity: it appears as the mark
 * here, as the rule running down section spines, and as the line that draws
 * itself in on the hero. The gold nuqta is the only place gold is used.
 */
export function AlifMark({
  className = "",
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
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
        className={animated ? "alif-stroke" : undefined}
      />
      <rect x="18" y="80" width="5" height="5" className="fill-gold" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`flex items-center gap-2.5 font-display text-bright ${className}`}
    >
      <AlifMark className="h-6 w-auto text-cobalt-lift" />
      <span className="text-[0.95rem] font-semibold tracking-tight">
        Aliph<span className="text-muted"> Studio</span>
      </span>
    </span>
  );
}
