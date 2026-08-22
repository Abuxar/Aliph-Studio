/**
 * The ambient colour field every glass surface blurs against.
 *
 * Frosted glass over a flat background reads as nothing — the effect only
 * exists where there is colour and contrast behind it to refract. These three
 * slow-drifting blobs supply that, and they are the reason the panels look
 * like glass rather than grey rectangles.
 *
 * Deliberately CSS, not canvas: three composited layers cost far less than a
 * per-frame paint, and the whole thing is inert under reduced-motion.
 *
 * Colour only — no grid overlay. The blobs alone give the glass something to
 * refract without imposing a visible structure on every page.
 */
export function Aurora() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ opacity: "var(--aurora-opacity)" }}
    >
      <div
        data-aurora
        className="absolute -left-[18vw] -top-[22vh] h-[62vh] w-[62vw] rounded-full blur-[110px] animate-[aurora-drift-a_26s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(closest-side, var(--aurora-1), transparent 72%)",
        }}
      />
      <div
        data-aurora
        className="absolute -right-[14vw] top-[8vh] h-[56vh] w-[54vw] rounded-full blur-[120px] animate-[aurora-drift-b_32s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(closest-side, var(--aurora-2), transparent 72%)",
        }}
      />
      <div
        data-aurora
        className="absolute bottom-[-18vh] left-[22vw] h-[52vh] w-[58vw] rounded-full blur-[130px] animate-[aurora-drift-c_38s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(closest-side, var(--aurora-3), transparent 72%)",
        }}
      />

    </div>
  );
}
