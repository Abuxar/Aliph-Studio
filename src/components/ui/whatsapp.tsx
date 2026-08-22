"use client";

import { useEffect, useState } from "react";
import { site, whatsappHref } from "@/lib/site";

/**
 * WhatsApp glyph, drawn to take `currentColor` rather than the brand green.
 *
 * The site runs on a neutral greyscale backdrop, and a saturated #25D366
 * badge dropped into it reads as a third-party widget bolted on rather than
 * part of the design. The glyph is set in the same greys as body text and
 * lifts to full contrast on hover, so it behaves like every other control on
 * the page. Taking currentColor means one asset covers both themes; the shape
 * is what makes it recognisable, not the colour.
 */
export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12.04 2C6.6 2 2.17 6.43 2.17 11.87c0 1.74.46 3.44 1.32 4.94L2 22.4l5.74-1.5a9.83 9.83 0 0 0 4.3.98h.01c5.43 0 9.86-4.43 9.86-9.87A9.8 9.8 0 0 0 19 4.9 9.8 9.8 0 0 0 12.04 2Zm0 1.87a7.97 7.97 0 0 1 5.66 2.35 7.93 7.93 0 0 1 2.35 5.65c0 4.42-3.6 8-8.02 8a8.2 8.2 0 0 1-3.83-.99l-.27-.16-2.84.74.76-2.77-.18-.29a7.94 7.94 0 0 1-1.22-4.25c0-4.4 3.6-8 8.02-8h-.43Z" />
      <path d="M9.36 7.28c-.18-.4-.36-.41-.53-.42h-.45c-.16 0-.4.06-.62.29-.21.23-.8.79-.8 1.92s.83 2.23.94 2.38c.11.16 1.6 2.55 3.94 3.48 1.94.77 2.34.61 2.76.57.42-.04 1.36-.55 1.55-1.09.19-.54.19-1 .13-1.1-.06-.09-.21-.15-.45-.27-.23-.12-1.36-.67-1.57-.75-.21-.08-.36-.11-.52.12-.15.23-.59.74-.72.9-.13.15-.27.17-.5.06-.23-.12-.98-.36-1.87-1.15-.69-.61-1.16-1.37-1.29-1.6-.14-.23-.02-.36.1-.47.1-.1.23-.27.35-.4.11-.14.15-.24.23-.39.08-.16.04-.29-.02-.4-.06-.12-.51-1.26-.72-1.72Z" />
    </svg>
  );
}

/** Inline link — used in the footer, the contact rail and the closing CTA. */
export function WhatsAppLink({
  className = "",
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2.5 transition-colors duration-300 hover:text-bright ${className}`}
    >
      <WhatsAppIcon className="h-[1.15em] w-auto shrink-0 text-muted transition-colors duration-300 group-hover:text-bright" />
      <span>{label ?? site.whatsapp.display}</span>
    </a>
  );
}

/**
 * Floating enquiry button — fixed bottom-right, present on every route.
 *
 * Mounted once in the root layout, so it survives navigation rather than
 * remounting per page. It is visible from first paint rather than gated on
 * scroll: a launcher that only appears part-way down a page reads as missing
 * on short pages and on anything the reader has not scrolled yet.
 *
 * Collapsed it is a plain circle; the label expands on hover with the icon
 * held on the right. It sits below the select popup's stacking layer so it can
 * never cover an open dropdown, and it is nudged up on small screens to clear
 * mobile browser chrome.
 */
export function WhatsAppFloat() {
  const [ready, setReady] = useState(false);

  // One frame before fading in, so the entrance plays instead of the button
  // being painted in place on load.
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message us on WhatsApp at ${site.whatsapp.display}`}
      className={`glass glass-edge group fixed bottom-6 right-5 z-40 flex items-center gap-0 overflow-hidden rounded-full p-3.5 transition-[opacity,transform,gap] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:gap-2.5 sm:bottom-7 sm:right-7 ${
        ready ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      {/* Label first, icon on the right. */}
      <span className="max-w-0 whitespace-nowrap font-display text-[0.88rem] font-medium tracking-tight text-bright opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-w-[10rem] group-hover:opacity-100">
        Chat on WhatsApp
      </span>

      <WhatsAppIcon className="h-6 w-6 shrink-0 text-body transition-colors duration-300 group-hover:text-bright" />
    </a>
  );
}
