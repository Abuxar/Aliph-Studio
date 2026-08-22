"use client";

import { useRef, type ReactNode } from "react";

/**
 * Glass panel with a cursor-tracked spotlight and optional 3D tilt.
 *
 * Pointer position is written straight to CSS custom properties rather than
 * to React state — a state update per mousemove would re-render the subtree
 * sixty times a second for a purely visual effect. Writing to the style
 * object skips React entirely and stays on the compositor.
 *
 * Everything here is progressive: with no pointer (touch, keyboard) the card
 * is simply a static glass panel.
 */
export function GlassCard({
  children,
  className = "",
  contentClassName = "",
  tilt = false,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Applied to the inner flex column that holds the content. */
  contentClassName?: string;
  tilt?: boolean;
  as?: "div" | "article" | "li";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const frame = useRef<number>(0);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    // Coalesce to one write per frame; mousemove fires far more often.
    cancelAnimationFrame(frame.current);
    const { clientX, clientY } = e;

    frame.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);

      if (tilt) {
        const rx = ((y - rect.height / 2) / rect.height) * -5;
        const ry = ((x - rect.width / 2) / rect.width) * 5;
        el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      }
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    if (tilt) el.style.transform = "";
  };

  return (
    <Tag
      // Callback ref: the three allowed tags have incompatible element types,
      // and a callback accepts all of them where an object ref cannot.
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`glass glass-edge relative spotlight rounded-2xl transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
    >
      {/* Content sits above the ::after spotlight layer. */}
      <div className={`relative z-[1] flex h-full flex-col ${contentClassName}`}>
        {children}
      </div>
    </Tag>
  );
}
