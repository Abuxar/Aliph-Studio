"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { Wordmark } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { WhatsAppLink } from "@/components/ui/whatsapp";

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

      {/* ------------------------------------------------------------------
          Mobile sheet.

          Kept mounted rather than toggled with `hidden`, so the entrance can
          actually transition — a display:none element has nothing to animate
          from. `inert` handles what `hidden` was doing for accessibility:
          while closed, nothing inside is focusable or reachable by a screen
          reader, so the sheet cannot become a keyboard trap behind the page.
          ------------------------------------------------------------------ */}
      <div
        id="mobile-nav"
        inert={!open}
        className={`fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-[var(--ground)]/92 backdrop-blur-2xl transition-[opacity,visibility] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] nav:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* pb-24 keeps the last line clear of the floating chat pill. */}
        <div className="container-page flex min-h-full flex-col pt-24 pb-24">
          <p className="eyebrow mb-5">Menu</p>

          <nav aria-label="Mobile" className="flex flex-col gap-2.5">
            {nav.map((item, i) => {
              const active = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  // Staggered rise. Delay only on the way in; closing snaps
                  // back together so the sheet does not unravel item by item.
                  style={{ transitionDelay: open ? `${80 + i * 55}ms` : "0ms" }}
                  className={`glass glass-edge relative flex items-center gap-4 rounded-2xl p-4 transition-[opacity,transform,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.99] ${
                    open
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  } ${active ? "border-[var(--line-strong)]" : ""}`}
                >
                  <span
                    className={`font-label text-[0.68rem] tabular-nums ${
                      active ? "text-cobalt-lift" : "text-gold"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="font-display text-[1.3rem] font-semibold leading-none tracking-tight text-bright">
                      {item.label}
                    </span>
                    <span className="truncate text-[0.8rem] leading-snug text-muted">
                      {item.hint}
                    </span>
                  </span>

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                    className={`shrink-0 transition-colors duration-300 ${
                      active ? "text-cobalt-lift" : "text-faint"
                    }`}
                  >
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              );
            })}
          </nav>

          {/* Pushed to the bottom of the sheet on tall screens. */}
          <div
            style={{ transitionDelay: open ? "420ms" : "0ms" }}
            className={`mt-auto flex flex-col gap-5 pt-10 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div onClick={() => setOpen(false)}>
              <ButtonLink href="/contact" arrow className="w-full">
                Start a project
              </ButtonLink>
            </div>

            <div className="hairline" />

            <div className="flex flex-col gap-3">
              <WhatsAppLink
                className="text-[0.92rem] text-body"
                label={`WhatsApp ${site.whatsapp.display}`}
              />
              <a
                href={`mailto:${site.contact.email}`}
                className="text-[0.92rem] text-body transition-colors hover:text-bright"
              >
                {site.contact.email}
              </a>
              <p className="font-label text-[0.7rem] uppercase tracking-[0.16em] text-faint">
                {site.contact.street} · {site.contact.locality}
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
