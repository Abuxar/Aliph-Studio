"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

/**
 * Sun/moon toggle.
 *
 * The icons live in one SVG and cross-fade by rotating — cheaper than
 * swapping nodes, and it survives the theme transition without a flash.
 * Renders a fixed-size placeholder until mounted, because the resolved theme
 * is unknowable on the server and rendering the wrong icon then correcting it
 * is a visible flicker.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  /**
   * Hydration guard. The resolved theme is unknowable on the server, so
   * rendering an icon there and correcting it on the client is a visible
   * flicker. useSyncExternalStore is the right primitive for "has this
   * hydrated" — it returns the server snapshot during SSR and the client
   * snapshot after, with no effect and no state update.
   */
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const isDark = resolvedTheme === "dark";

  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className={`block h-10 w-10 rounded-full border border-line ${className}`}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-line text-bright transition-colors duration-300 hover:border-cobalt-lift hover:text-cobalt-lift ${className}`}
    >
      <span className="relative block h-[18px] w-[18px]">
        {/* sun */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>

        {/* moon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        >
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
        </svg>
      </span>
    </button>
  );
}
