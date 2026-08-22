import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/ui/whatsapp";

export function Cta() {
  return (
    <section className="relative overflow-hidden border-t border-line glass py-[clamp(5rem,11vw,9rem)]">
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
          <WhatsAppLink
            className="glass glass-edge relative rounded-full px-6 py-3 font-display text-[0.9rem] font-medium tracking-tight text-bright"
            label="WhatsApp"
          />
        </div>
      </div>
    </section>
  );
}
