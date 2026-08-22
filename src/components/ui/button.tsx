import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "quiet";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-display text-[0.9rem] font-medium tracking-tight transition-[background-color,border-color,color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const sizes = "px-6 py-3";

const variants: Record<Variant, string> = {
  primary:
    "bg-bright text-void hover:bg-cobalt-lift",
  ghost:
    "border border-line text-bright hover:border-cobalt-lift hover:text-cobalt-lift",
  quiet:
    "text-body hover:text-bright",
};

/** Trailing arrow that nudges on hover — the site's one repeated flourish. */
function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
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

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
  className = "",
  ...props
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "children" | "className">) {
  const external = href.startsWith("http") || href.startsWith("mailto:");

  const content = (
    <>
      {children}
      {arrow ? <Arrow /> : null}
    </>
  );

  const classes = `${base} ${sizes} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        rel="noopener noreferrer"
        target={href.startsWith("http") ? "_blank" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  );
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
      {children}
      {arrow ? <Arrow /> : null}
    </button>
  );
}
