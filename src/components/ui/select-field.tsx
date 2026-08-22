"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Glass select.
 *
 * A native <select> popup is painted by the browser, not the page — it cannot
 * take backdrop-filter, and against our translucent field it renders a white
 * menu under near-white text. So the listbox is rebuilt here.
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
  const [dropUp, setDropUp] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef({ buffer: "", at: 0 });

  const id = useId();
  const buttonId = `${id}-button`;
  const listId = `${id}-list`;
  const optionId = (i: number) => `${id}-opt-${i}`;

  // Close on any click that lands outside the control.
  useEffect(() => {
    if (!open) return;

    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
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

    // Flip above the trigger when there is not enough room below, so the
    // list never runs off the bottom of the viewport.
    const rect = rootRef.current?.getBoundingClientRect();
    if (rect) {
      const below = window.innerHeight - rect.bottom;
      setDropUp(below < 280 && rect.top > below);
    }

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

  return (
    <div
      ref={rootRef}
      /* z-40 while open lifts the entire control above form controls that
         come later in the DOM — without it the submit button, which is
         positioned and later, paints over the open list. */
      className={`relative flex flex-col gap-2 ${open ? "z-40" : ""}`}
    >
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

      {open ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={`${id}-label`}
          className={`popover absolute z-50 max-h-64 w-full overflow-y-auto overscroll-contain rounded-xl p-1.5 ${
            dropUp ? "bottom-full mb-2" : "top-full mt-2"
          }`}
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
                  active
                    ? "bg-[var(--line)] text-bright"
                    : "text-body"
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
      ) : null}
    </div>
  );
}
