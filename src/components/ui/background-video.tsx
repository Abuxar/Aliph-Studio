"use client";

import { useState, useSyncExternalStore } from "react";

/**
 * TEMPORARY: third-party CDN asset, used as a placeholder while our own
 * footage is produced. Replace with a self-hosted file (public/bg.mp4)
 * before launch — we do not control this URL, so it can change or vanish
 * without notice.
 */
const BACKGROUND_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4";

/** Subscribes to a media query without a mount effect or a state update. */
function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => false, // server: assume the narrow case and render no video
  );
}

/**
 * Site-wide ambient film, fixed behind every page.
 *
 * Mounted once in the root layout rather than per page, so navigating does
 * not restart playback — the backdrop stays continuous the way a native one
 * would.
 *
 * DESKTOP ONLY, deliberately. On phones this was costing a multi-megabyte
 * download over mobile data for a decorative layer, and mobile browsers —
 * Brave on Android among them — block autoplay by default, so most visitors
 * paid for the download and then saw a flat background anyway. Below 768px
 * the video is never requested and the aurora field carries the backdrop on
 * its own; it is built to look finished without the film behind it.
 *
 * It also fades in only on `canplay`, so a slow or blocked fetch leaves the
 * aurora showing rather than a black rectangle.
 */
export function BackgroundVideo() {
  const [ready, setReady] = useState(false);
  const wide = useMediaQuery("(min-width: 768px)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (!wide || reduced) return null;

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
