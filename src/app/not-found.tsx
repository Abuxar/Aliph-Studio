import Link from "next/link";
import { services } from "@/lib/content";
import { ButtonLink } from "@/components/ui/button";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center pt-36 pb-24">
      <div className="container-page">
        <p className="eyebrow">Error 404</p>

        <h1 className="mt-6 max-w-[14ch] text-[clamp(2.25rem,6.5vw,4.5rem)]">
          That page is not{" "}
          <span className="accent text-cobalt-lift">here</span>
        </h1>

        <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-body">
          It may have moved, or the link may be wrong. Here is where most people
          are heading.
        </p>

        <ul className="mt-10 flex flex-wrap gap-2">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="inline-block rounded-full glass glass-edge relative px-4 py-2 font-display text-[0.9rem] tracking-tight text-body transition-colors hover:border-cobalt-lift hover:text-cobalt-lift"
              >
                {service.short}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
