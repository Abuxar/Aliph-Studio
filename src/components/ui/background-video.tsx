"use client";

import { useState } from "react";

/**
 * TEMPORARY: third-party CDN asset, used as a placeholder while our own
 * footage is produced. Replace with a self-hosted file (public/bg.mp4)
 * before launch — we do not control this URL, so it can change or vanish
 * without notice.
 */
const BACKGROUND_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4";

/**
 * Site-wide ambient film, fixed behind every page.
 *
 * Mounted once in the root layout rather than per page, so navigating does
 * not restart playback — the background stays continuous the way a native
 * backdrop would.
 *
 * Two deliberate constraints:
 *
 * - It fades in only on `canplay`. A slow or blocked fetch leaves the aurora
 *   field showing rather than a black rectangle, so the page is never broken
 *   by the asset failing.
 * - A themed scrim sits over it. Without one, body copy over arbitrary
 *   footage fails contrast — badly in light mode, where dark video would put
 *   near-black text on a near-black ground.
 */
export function BackgroundVideo() {
  const [ready, setReady] = useState(false);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-20 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onCanPlay={() => setReady(true)}
      >
        <source src={BACKGROUND_VIDEO} type="video/mp4" />
      </video>

      {/* Legibility scrim — tuned per theme in globals.css. */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--video-scrim)" }}
      />
    </div>
  );
}
