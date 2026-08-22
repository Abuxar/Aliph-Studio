import { comparison, comparisonCaveat } from "@/lib/content";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

function Tick() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="mt-[0.3em] shrink-0 text-cobalt-lift"
    >
      <path
        d="M3 8.5 6.3 11.8 13 4.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Dash() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="mt-[0.3em] shrink-0 text-faint"
    >
      <path d="M4 8h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/**
 * A real <table>, not a grid of divs. This is genuinely tabular data — two
 * alternatives compared across eight criteria — so the semantics matter: a
 * screen reader announces the column heading with each cell, which is the
 * whole point of a comparison.
 *
 * The `cmp` class carries a stacking treatment (see globals.css) that turns
 * each row into a card below the `md` breakpoint, rather than forcing a
 * horizontal scroll through a three-column table on a phone.
 */
export function Comparison({ index }: { index?: string }) {
  return (
    <Section id="why-us">
      <SectionHeading
        index={index}
        eyebrow="Why us"
        title="What actually differs when you hire"
        accent="a small team"
        lede="Most agency pages compare on adjectives. Here is the comparison as things you can hold us to in week one."
      />

      <div className="mt-14 glass glass-edge relative overflow-hidden rounded-2xl">
        <table className="cmp w-full border-collapse text-left">
          <caption className="sr-only">
            Aliph Studio compared with a typical agency, across eight criteria
          </caption>

          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="eyebrow px-6 py-5 font-normal md:w-[30%]">
                What differs
              </th>
              <th
                scope="col"
                className="px-6 py-5 font-display text-[0.95rem] font-semibold tracking-tight text-bright md:w-[35%]"
              >
                Aliph Studio
              </th>
              <th
                scope="col"
                className="px-6 py-5 font-display text-[0.95rem] font-semibold tracking-tight text-muted md:w-[35%]"
              >
                A typical agency
              </th>
            </tr>
          </thead>

          <tbody>
            {comparison.map((row, i) => (
              <tr
                key={row.criterion}
                data-reveal
                data-reveal-delay={`${Math.min(i, 5) * 0.04}`}
                className="border-b border-line last:border-b-0"
              >
                <th
                  scope="row"
                  className="px-6 pt-5 pb-2 font-display text-[0.95rem] font-medium tracking-tight text-bright md:py-5 md:align-top"
                >
                  {row.criterion}
                </th>

                <td
                  data-col="Aliph Studio"
                  className="px-6 py-2 text-[0.92rem] leading-relaxed text-body md:py-5 md:align-top"
                >
                  <span className="flex gap-2.5">
                    <Tick />
                    <span>{row.ours}</span>
                  </span>
                </td>

                <td
                  data-col="A typical agency"
                  className="px-6 pt-2 pb-5 text-[0.92rem] leading-relaxed text-muted md:py-5 md:align-top"
                >
                  <span className="flex gap-2.5">
                    <Dash />
                    <span>{row.theirs}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* The honest counterweight. A page that wins on every axis persuades
          nobody, and this is the same principle as "say the unwelcome thing
          early" on /about. */}
      <div
        className="mt-6 flex flex-col gap-5 border-l-2 border-gold pl-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
        data-reveal
      >
        <p className="max-w-2xl text-[0.92rem] leading-relaxed text-muted">
          {comparisonCaveat}
        </p>

        <ButtonLink href="/contact" variant="glass" arrow className="shrink-0">
          Talk it through
        </ButtonLink>
      </div>
    </Section>
  );
}
