import { caseStudies } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/json-ld";
import { FeaturedWork } from "@/components/home/featured-work";
import { Cta } from "@/components/home/cta";

export const metadata = buildMetadata({
  title: "Case Studies",
  description:
    "Selected work from Aliph Studio — web platform rebuilds, hybrid app and web systems, and local SEO programmes across the UK, UAE and United States.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />

      <section className="border-b border-line pt-36 pb-16 lg:pt-44 lg:pb-24">
        <div className="container-page">
          <p className="eyebrow">Case studies</p>
          <h1 className="mt-6 max-w-[16ch] text-[clamp(2.25rem,6.5vw,4.75rem)]">
            {caseStudies.length} engagements, measured in{" "}
            <span className="accent text-cobalt-lift">outcomes</span>
          </h1>
          <p className="mt-7 max-w-2xl text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-body">
            Every number below came from the client&rsquo;s own analytics. Where
            we cannot show a figure, we say so rather than reaching for an
            adjective.
          </p>
        </div>
      </section>

      <FeaturedWork />
      <Cta />
    </>
  );
}
