import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Magnetic } from "./magnetic";

type Variant = "primary" | "glass" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-display text-[0.9rem] font-medium tracking-tight transition-[color,border-color,box-shadow,transform] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const sizes = "px-6 py-3";

const variants: Record<Variant, string> = {
  // Gradient fill; the sheen element below sweeps across it on hover.
  primary:
    "text-white shadow-[0_6px_24px_-8px_var(--cobalt)] hover:shadow-[0_10px_32px_-8px_var(--cobalt)]",
  glass:
    "glass glass-edge text-bright hover:border-[var(--line-strong)]",
  ghost:
    "border border-line text-bright hover:border-cobalt-lift hover:text-cobalt-lift",
};

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="relative z-[2] transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
    >
      <path
        d="M2 7h10M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Gradient ground + a specular sheen that sweeps left to right on hover. */
function PrimarySkin() {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(115deg, var(--cobalt), var(--violet) 62%, var(--cobalt-lift))",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-y-0 -left-full z-[1] w-1/2 -skew-x-12 bg-white/25 blur-md transition-[left] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:left-[130%] motion-reduce:hidden"
      />
    </>
  );
}

function Inner({
  children,
  variant,
  arrow,
}: {
  children: ReactNode;
  variant: Variant;
  arrow: boolean;
}) {
  return (
    <>
      {variant === "primary" ? <PrimarySkin /> : null}
      <span className="relative z-[2]">{children}</span>
      {arrow ? <Arrow /> : null}
    </>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
  magnetic = false,
  className = "",
  ...props
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  /** Reserve for primary calls to action — everywhere it becomes noise. */
  magnetic?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "children" | "className">) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const classes = `${base} ${sizes} ${variants[variant]} ${className}`;
  const inner = <Inner variant={variant} arrow={arrow}>{children}</Inner>;

  const node = external ? (
    <a
      href={href}
      className={classes}
      rel="noopener noreferrer"
      target={href.startsWith("http") ? "_blank" : undefined}
    >
      {inner}
    </a>
  ) : (
    <Link href={href} className={classes} {...props}>
      {inner}
    </Link>
  );

  return magnetic ? <Magnetic>{node}</Magnetic> : node;
}

export function Button({
  children,
  variant = "primary",
  arrow = false,
  className = "",
  ...props
}: {
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
} & ComponentProps<"button">) {
  return (
    <button
      className={`${base} ${sizes} ${variants[variant]} ${className}`}
      {...props}
    >
      <Inner variant={variant} arrow={arrow}>{children}</Inner>
    </button>
  );
}
