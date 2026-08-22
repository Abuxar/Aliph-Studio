import type { ReactNode } from "react";

/**
 * Long-form text column for legal and editorial pages.
 *
 * Measure is capped near 68 characters — past that the eye loses the line
 * on return. Styling is applied here rather than per page so every prose
 * page stays typographically identical.
 */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      className="
        flex max-w-[68ch] flex-col gap-5 text-[1rem] leading-[1.75] text-body
        [&_a]:text-cobalt-lift [&_a]:underline [&_a]:underline-offset-4
        [&_h2]:mt-8 [&_h2]:text-[1.4rem]
        [&_h3]:mt-4 [&_h3]:text-[1.1rem]
        [&_li]:pl-1
        [&_strong]:font-medium [&_strong]:text-bright
        [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5
      "
    >
      {children}
    </div>
  );
}

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <section className="pt-36 pb-24 lg:pt-44">
      <div className="container-page">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-6 text-[clamp(2rem,5vw,3.5rem)]">{title}</h1>
        <p className="mt-4 font-label text-[0.75rem] uppercase tracking-[0.14em] text-faint">
          Last updated {updated}
        </p>

        <div className="mt-12 hairline" />

        <div className="mt-12">
          <Prose>{children}</Prose>
        </div>
      </div>
    </section>
  );
}
