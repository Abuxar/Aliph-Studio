import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="relative overflow-hidden border-t border-line glass py-[clamp(5rem,11vw,9rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[40vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] opacity-50 blur-[110px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(47,111,240,0.3), transparent)",
        }}
      />

      <div className="container-page relative z-10 flex flex-col items-center gap-8 text-center">
        <p className="eyebrow" data-reveal>
          Next step
        </p>

        <h2
          className="max-w-[18ch] text-[clamp(2rem,6vw,4rem)]"
          data-reveal
          data-reveal-delay="0.05"
        >
          Tell us what you are trying to{" "}
          <span className="accent text-cobalt-lift">build</span>
        </h2>

        <p
          className="max-w-xl text-[1.05rem] leading-relaxed text-body"
          data-reveal
          data-reveal-delay="0.1"
        >
          A thirty-minute call, no charge and no pitch deck. You will leave it
          with a straight answer on scope, budget and timeline — even if that
          answer is that we are the wrong people for it.
        </p>

        <div
          className="flex flex-wrap justify-center gap-3"
          data-reveal
          data-reveal-delay="0.15"
        >
          <ButtonLink href="/contact" arrow>
            Book a call
          </ButtonLink>
          <ButtonLink href={`mailto:${site.contact.email}`} variant="ghost">
            {site.contact.email}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
