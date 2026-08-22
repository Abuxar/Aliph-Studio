"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { Wordmark } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Condense the bar once the hero is behind us.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the open sheet, and restore on close.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the sheet.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-bright focus:px-5 focus:py-2.5 focus:font-display focus:text-sm focus:text-void"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled || open
            ? "border-b border-line bg-void/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-page flex h-[72px] items-center justify-between gap-6">
          <Link href="/" aria-label={`Aliph Studio — home`}>
            <Wordmark />
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2 font-display text-[0.875rem] tracking-tight transition-colors duration-300 ${
                    active
                      ? "text-bright"
                      : "text-muted hover:text-bright"
                  }`}
                >
                  {item.label}
                  {active ? (
                    <span
                      className="absolute inset-x-4 -bottom-px h-px bg-cobalt-lift"
                      aria-hidden="true"
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <ButtonLink href="/contact" arrow className="px-5 py-2.5">
              Start a project
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-bright lg:hidden"
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
      </header>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-0 z-40 bg-void/95 backdrop-blur-xl lg:hidden"
      >
        <nav
          className="container-page flex h-full flex-col justify-center gap-1 pb-24"
          aria-label="Mobile"
        >
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line-soft py-5 font-display text-[1.75rem] font-semibold tracking-tight text-bright"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {item.label}
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
