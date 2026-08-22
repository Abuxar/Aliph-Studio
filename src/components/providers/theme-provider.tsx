"use client";

import { ThemeProvider as NextThemes } from "next-themes";

/**
 * Stamps `.light` / `.dark` on <html>, persists the choice, and follows the
 * OS setting until the visitor overrides it.
 *
 * next-themes injects a blocking inline script that runs before first paint,
 * which is what prevents the white flash a dark-mode visitor would otherwise
 * get on every navigation.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemes
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemes>
  );
}
