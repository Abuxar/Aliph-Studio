"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { Wordmark } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Once past the hero the bar condenses into a floating glass pill.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);

    // Resizing past the breakpoint restores the desktop nav; leaving the
    // sheet mounted would trap scroll behind an invisible overlay.
    const wide = window.matchMedia("(min-width: 901px)");
    const onWide = (e: MediaQueryListEvent) => e.matches && setOpen(false);

    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);

    return () => {
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-cobalt focus:px-5 focus:py-2.5 focus:font-display focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
        <div className="container-page">
          <div
            className={`flex h-[68px] items-center justify-between gap-4 rounded-full px-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-4 ${
              scrolled || open
                ? "glass-nav glass-edge relative"
                : "border border-transparent bg-transparent"
            }`}
          >
            <Link
              href="/"
              aria-label="Aliph Studio — home"
              className="appear appear--scale shrink-0 pl-1"
              style={{ animationDelay: "0.08s" }}
            >
              <Wordmark />
            </Link>

            <nav
              className="hidden items-center gap-0.5 nav:flex"
              aria-label="Primary"
            >
              {nav.map((item, i) => {
                const active = pathname.startsWith(item.href);
                // Alternating variants, 0.16s + 0.12s per item.
                const variant = i % 2 === 0 ? "appear--scale" : "appear--soft";

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    style={{ animationDelay: `${0.16 + i * 0.12}s` }}
                    className={`appear ${variant} group relative rounded-full px-4 py-2 font-display text-[0.875rem] tracking-tight transition-colors duration-300 ${
                      active ? "text-bright" : "text-muted hover:text-bright"
                    }`}
                  >
                    {/* Pill that fades in behind the active or hovered item. */}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-0 rounded-full border transition-opacity duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        active
                          ? "border-[var(--glass-border)] bg-[var(--glass-bg)] opacity-100"
                          : "border-transparent bg-[var(--glass-bg)] opacity-0 group-hover:opacity-100"
                      }`}
                    />
                    <span className="relative">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-2">
              <ThemeToggle />

              <div
                className="appear appear--scale hidden nav:block"
                style={{ animationDelay: "0.34s" }}
              >
                <ButtonLink
                  href="/contact"
                  arrow
                  magnetic
                  className="px-5 py-2.5"
                >
                  Start a project
                </ButtonLink>
              </div>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? "Close menu" : "Open menu"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-bright transition-colors hover:border-cobalt-lift nav:hidden"
              >
                <span className="relative block h-3 w-4">
                  <span
                    className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                      open ? "top-1.5 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                      open ? "top-1.5 -rotate-45" : "top-3"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-[var(--ground)]/92 backdrop-blur-2xl nav:hidden"
      >
        {/* pt-24 clears the fixed header bar — centring alone put the first
            item underneath it once the list grew past the viewport. min-h-full
            keeps it centred when it does fit. */}
        <nav
          className="container-page flex min-h-full flex-col justify-center gap-2 pt-24 pb-28"
          aria-label="Mobile"
        >
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 border-b border-line py-5 font-display text-[1.75rem] font-semibold tracking-tight text-bright"
            >
              <span className="font-label text-[0.72rem] tabular-nums text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                {item.label}
              </span>
            </Link>
          ))}

          <div className="mt-8" onClick={() => setOpen(false)}>
            <ButtonLink href="/contact" arrow className="w-full">
              Start a project
            </ButtonLink>
          </div>
        </nav>
      </div>
    </>
  );
}
