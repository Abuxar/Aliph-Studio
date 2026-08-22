import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/ui/prose";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: `The terms governing use of the ${site.name} website and our engagements.`,
  path: "/terms",
});

/**
 * NOTE: Working draft, not legal advice. Your signed engagement contract is
 * the operative document — have a lawyer reconcile the two before launch.
 */
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="23 August 2026">
      <p>
        These terms govern your use of {site.url}. They are not a substitute
        for the engagement contract we sign before any project starts — where
        the two conflict, the signed contract governs.
      </p>

      <h2>Use of this site</h2>
      <p>
        You may read, share and quote this site with attribution. You may not
        scrape it at a rate that degrades service for others, or reproduce it
        wholesale as your own.
      </p>

      <h2>Our content</h2>
      <p>
        Copy, design, code and images on this site belong to {site.legalName}{" "}
        unless credited otherwise. Client names and marks belong to their
        respective owners and appear here with permission.
      </p>

      <h2>Enquiries are not a contract</h2>
      <p>
        Submitting the contact form does not create an engagement. Nothing on
        this site — including indicative budget ranges — is a binding offer. Work
        begins only once both parties sign a written agreement.
      </p>

      <h2>Ownership of work we deliver</h2>
      <p>
        Intellectual property in work we produce for you transfers to you on
        full payment, as set out in your engagement contract. We retain the
        right to describe the work publicly unless you ask us not to.
      </p>

      <h2>Accuracy</h2>
      <p>
        We keep this site accurate but make no warranty that it is complete or
        current. Metrics in case studies reflect a specific engagement and are
        not a prediction of your results.
      </p>

      <h2>Liability</h2>
      <p>
        To the extent permitted by law, {site.legalName} is not liable for
        indirect or consequential loss arising from use of this website.
        Liability arising from an engagement is governed by that contract.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of Pakistan, and the courts of
        Lahore have exclusive jurisdiction, unless your engagement contract
        specifies otherwise.
      </p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
      </p>
    </LegalPage>
  );
}
