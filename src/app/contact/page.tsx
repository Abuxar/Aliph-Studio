import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/json-ld";
import { ContactForm } from "@/components/contact/contact-form";
import { WhatsAppLink } from "@/components/ui/whatsapp";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Start a project with Aliph Studio. Based in DHA Phase 3, Lahore, working with clients across Pakistan, the UK, UAE and United States.",
  path: "/contact",
});

const reassurance = [
  {
    k: "You will speak to engineers",
    v: "No account manager relaying messages between you and the people doing the work.",
  },
  {
    k: "A straight answer on scope",
    v: "Including when the answer is that you should not build this, or not yet.",
  },
  {
    k: "One working day",
    v: "Every enquiry gets a reply. Our afternoon overlaps London and the US East Coast.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <section className="pt-36 pb-24 lg:pt-44">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-20">
            {/* Left rail */}
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                <p className="eyebrow">Contact</p>
                <h1 className="max-w-[14ch] text-[clamp(2.25rem,6vw,4rem)]">
                  Tell us what you are trying to{" "}
                  <span className="accent text-cobalt-lift">build</span>
                </h1>
                <p className="max-w-md text-[1.05rem] leading-relaxed text-body">
                  Fill this in and we will come back with questions, a rough
                  shape and an honest view on whether we are the right studio
                  for it.
                </p>
              </div>

              <ul className="flex flex-col">
                {reassurance.map((item, i) => (
                  <li
                    key={item.k}
                    className="flex gap-5 border-b border-line py-5 first:border-t"
                  >
                    <span className="font-label text-[0.7rem] tabular-nums text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="font-display text-[0.98rem] font-medium tracking-tight text-bright">
                        {item.k}
                      </span>
                      <span className="text-[0.9rem] leading-relaxed text-muted">
                        {item.v}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3">
                <p className="eyebrow">Or reach us directly</p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="font-display text-[1.15rem] tracking-tight text-bright underline-offset-4 transition-colors hover:text-cobalt-lift hover:underline"
                >
                  {site.contact.email}
                </a>
                <WhatsAppLink
                  className="text-[0.95rem] text-body"
                  label={`WhatsApp ${site.whatsapp.display}`}
                />

                <address className="mt-1 border-t border-line pt-4 not-italic text-[0.9rem] leading-relaxed text-muted">
                  {site.contact.street}
                  <br />
                  {site.contact.locality}, {site.contact.region}
                  <br />
                  {site.contact.countryName}
                  <br />
                  <span className="text-faint">{site.contact.timezone}</span>
                </address>
              </div>
            </div>

            {/* Form */}
            <div className="glass glass-edge relative rounded-2xl p-6 sm:p-9">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
