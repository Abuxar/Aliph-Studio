"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Position = { top: number; left: number; width: number; dropUp: boolean };

/**
 * Glass select.
 *
 * A native <select> popup is painted by the browser, not the page — it cannot
 * take backdrop-filter, and against our translucent field it renders a white
 * menu under near-white text. So the listbox is rebuilt here.
 *
 * The list is rendered through a PORTAL, and that is load-bearing rather than
 * a preference. The form panel is itself a glass surface, so it establishes a
 * backdrop root; a nested backdrop-filter can only sample that root and
 * therefore cannot blur its own siblings inside the panel. Left in place, the
 * popup renders with no blur at all — the submit button and body copy behind
 * it stay perfectly crisp. Portalling to <body> puts it outside that root,
 * where it blurs the page like every other glass surface.
 *
 * Rebuilding a native control means owning what the native one gave us free,
 * and all of it is implemented below:
 *
 * - Form value: a hidden input carries the selection, so the Server Action
 *   receives it through FormData exactly as a <select> would.
 * - Keyboard: Enter/Space/Arrows open; Arrows, Home and End move; Enter or
 *   Space commits; Escape and Tab close; printable keys jump by first letter.
 * - Screen readers: the button is a combobox with aria-expanded and
 *   aria-activedescendant; the popup is a listbox of options. Focus stays on
 *   the button throughout, which is the ARIA pattern for this control.
 * - Pointer: click outside closes it.
 */
export function SelectField({
  name,
  label,
  options,
  placeholder = "Choose one",
  invalid = false,
  describedBy,
}: {
  name: string;
  label: string;
  options: readonly string[];
  placeholder?: string;
  invalid?: boolean;
  describedBy?: string;
}) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [pos, setPos] = useState<Position | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef({ buffer: "", at: 0 });

  const id = useId();
  const buttonId = `${id}-button`;
  const listId = `${id}-list`;
  const optionId = (i: number) => `${id}-opt-${i}`;

  /** Position the portalled list against the trigger, in viewport space. */
  const measure = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const below = window.innerHeight - r.bottom;

    // Flip above the trigger when there is not enough room beneath it.
    const dropUp = below < 280 && r.top > below;

    setPos({
      top: dropUp ? r.top - 8 : r.bottom + 8,
      left: r.left,
      width: r.width,
      dropUp,
    });
  }, []);

  // The list is fixed-positioned, so it must follow the trigger while the
  // page scrolls or resizes. Capture phase catches nested scrollers too.
  useEffect(() => {
    if (!open) return;

    let frame = 0;
    const onMove = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onMove, { passive: true, capture: true });
    window.addEventListener("resize", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onMove, { capture: true });
      window.removeEventListener("resize", onMove);
    };
  }, [open, measure]);

  // Close on a pointer press outside BOTH the trigger and the portalled list —
  // the list is no longer a DOM descendant of the trigger.
  useEffect(() => {
    if (!open) return;

    const onDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (rootRef.current?.contains(target)) return;
      if (listRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Keep the highlighted option in view when arrowing through a long list.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector(`#${CSS.escape(optionId(highlight))}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, highlight]); // eslint-disable-line react-hooks/exhaustive-deps

  const commit = (i: number) => {
    setValue(options[i]);
    setOpen(false);
  };

  const openAt = () => {
    const i = value ? options.indexOf(value) : 0;
    setHighlight(i < 0 ? 0 : i);
    measure();
    setOpen(true);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        openAt();
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setOpen(false);
        return;
      case "Tab":
        setOpen(false);
        return;
      case "Enter":
      case " ":
        e.preventDefault();
        commit(highlight);
        return;
      case "ArrowDown":
        e.preventDefault();
        setHighlight((h) => Math.min(options.length - 1, h + 1));
        return;
      case "ArrowUp":
        e.preventDefault();
        setHighlight((h) => Math.max(0, h - 1));
        return;
      case "Home":
        e.preventDefault();
        setHighlight(0);
        return;
      case "End":
        e.preventDefault();
        setHighlight(options.length - 1);
        return;
    }

    // Typeahead: consecutive keystrokes within a second build a prefix.
    if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const now = Date.now();
      const t = typeahead.current;
      t.buffer = now - t.at > 1000 ? e.key : t.buffer + e.key;
      t.at = now;

      const match = options.findIndex((o) =>
        o.toLowerCase().startsWith(t.buffer.toLowerCase()),
      );
      if (match >= 0) setHighlight(match);
    }
  };

  const list =
    open && pos ? (
      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={`${id}-label`}
        style={{
          position: "fixed",
          top: pos.top,
          left: pos.left,
          width: pos.width,
          // Anchor the bottom edge to the trigger when flipped upward.
          transform: pos.dropUp ? "translateY(-100%)" : undefined,
        }}
        className="popover glass-edge scroll-slim z-[70] max-h-64 overflow-y-auto overscroll-contain rounded-xl p-1.5"
      >
        {options.map((option, i) => {
          const selected = option === value;
          const active = i === highlight;

          return (
            <li
              key={option}
              id={optionId(i)}
              role="option"
              aria-selected={selected}
              onPointerEnter={() => setHighlight(i)}
              // pointerdown, not click: the outside-close listener also runs
              // on pointerdown and would tear the list down first.
              onPointerDown={(e) => {
                e.preventDefault();
                commit(i);
              }}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-[0.92rem] transition-colors duration-150 ${
                active ? "bg-[var(--glass-bg-strong)] text-bright" : "text-body"
              }`}
            >
              <span>{option}</span>

              {selected ? (
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0 text-cobalt-lift"
                >
                  <path
                    d="M2.5 7.5 5.5 10.5 11.5 4"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}
            </li>
          );
        })}
      </ul>
    ) : null;

  return (
    <div ref={rootRef} className="relative flex flex-col gap-2">
      {/* The real form value. A Server Action reads this from FormData. */}
      <input type="hidden" name={name} value={value} />

      <span
        id={`${id}-label`}
        className="font-display text-[0.85rem] font-medium tracking-tight text-body"
      >
        {label}
      </span>

      <button
        type="button"
        id={buttonId}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-labelledby={`${id}-label ${buttonId}`}
        aria-activedescendant={open ? optionId(highlight) : undefined}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openAt())}
        onKeyDown={onKeyDown}
        className={`glass flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left font-body text-[0.95rem] transition-colors duration-300 ${
          value ? "text-bright" : "text-faint"
        } ${open ? "border-[var(--line-strong)]" : ""}`}
      >
        <span className="truncate">{value || placeholder}</span>

        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
          className={`shrink-0 text-muted transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M3.5 5.25 7 8.75l3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Portalled to <body> so it escapes the form panel's backdrop root. */}
      {list && typeof document !== "undefined"
        ? createPortal(list, document.body)
        : null}
    </div>
  );
}
