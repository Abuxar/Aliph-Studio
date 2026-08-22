import { site } from "@/lib/site";
import { Section, SectionHeading } from "@/components/ui/section";

/**
 * The local + international signal in one section.
 *
 * The timezone overlap is the actual objection an overseas buyer has, so it
 * gets stated as a number rather than implied by a map pin.
 *
 * `index` is a prop because this section appears on both the homepage and
 * /about, at a different position in each page's numbered sequence.
 */
export function Location({ index = "07" }: { index?: string }) {
  return (
    <Section id="location">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-20">
        <div>
          <SectionHeading
            index={index}
            eyebrow="Where we work"
            title="Based in Lahore, working across four"
            accent="markets"
            lede="Our day overlaps the Gulf almost entirely, London through the afternoon, and the US East Coast into the evening. Most clients get an answer the same day they ask."
          />

          <address
            className="mt-10 not-italic text-[0.97rem] leading-relaxed text-body"
            data-reveal
          >
            <span className="mb-2 block font-display text-[1.05rem] font-medium text-bright">
              {site.name}
            </span>
            {site.contact.street}
            <br />
            {site.contact.locality}, {site.contact.region}{" "}
            {site.contact.postalCode}
            <br />
            {site.contact.countryName}
            <br />
            <br />
            <a
              href={`mailto:${site.contact.email}`}
              className="text-cobalt-lift underline-offset-4 hover:underline"
            >
              {site.contact.email}
            </a>
            <br />
            <a
              href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
              className="transition-colors hover:text-bright"
            >
              {site.contact.phone}
            </a>
          </address>
        </div>

        <ul className="flex flex-col" data-reveal>
          {site.markets.map((market, i) => (
            <li
              key={market.region}
              className="flex items-baseline justify-between gap-6 border-b border-line py-6 first:border-t"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-label text-[0.7rem] tabular-nums text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="font-display text-[1.1rem] font-medium tracking-tight text-bright">
                    {market.region}
                  </span>
                  <span className="text-[0.85rem] text-muted">
                    {market.city}
                  </span>
                </div>
              </div>

              <span className="font-label text-[0.8rem] tabular-nums text-body">
                {market.offset}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
