import { buildMetadata } from "@/lib/seo";
import { faqs } from "@/lib/content";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/json-ld";

import { Hero } from "@/components/home/hero";
import { ServicesScrub } from "@/components/home/services-scrub";
import { FeaturedWork } from "@/components/home/featured-work";
import { ProcessTrack } from "@/components/home/process-track";
import { TechMarquee } from "@/components/home/tech-marquee";
import { Testimonials } from "@/components/home/testimonials";
import { Engagement } from "@/components/home/engagement";
import { Faq } from "@/components/home/faq";
import { Location } from "@/components/home/location";
import { Cta } from "@/components/home/cta";

export const metadata = buildMetadata({
  title: "Aliph Studio — Web, App & SEO Agency in Lahore",
  description:
    "Development studio in DHA Phase 3, Lahore. Full-stack web platforms on Next.js and MERN, Flutter apps, and SEO programmes for clients in Pakistan, the UK, UAE and United States.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />

      <Hero />
      <ServicesScrub />
      <FeaturedWork />
      <ProcessTrack />
      <TechMarquee />
      <Testimonials />
      <Engagement />
      <Faq items={faqs} index="06" />
      <Location />
      <Cta />
    </>
  );
}
