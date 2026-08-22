import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/ui/prose";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and stores personal data.`,
  path: "/privacy",
});

/**
 * NOTE: This is a working draft, not legal advice. Have it reviewed against
 * Pakistan's PECA and — because you sell into the UK and EU — UK GDPR, before
 * you launch.
 */
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="23 August 2026">
      <p>
        This policy explains what personal data {site.name} collects, why we
        collect it, and what you can ask us to do with it. It applies to{" "}
        {site.url} and to enquiries you send us through this site.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Enquiry details.</strong> When you submit the contact form we
          receive your name, email address, company, the service and budget
          range you selected, and the message you wrote.
        </li>
        <li>
          <strong>Technical data.</strong> Your IP address is processed
          transiently to rate-limit the contact form and prevent abuse. It is
          held in memory only and is not written to a database.
        </li>
        <li>
          <strong>Analytics.</strong> Aggregate, non-identifying usage data
          about which pages are visited and how the site performs.
        </li>
      </ul>

      <h2>What we do not collect</h2>
      <p>
        We do not collect payment details through this website, we do not build
        advertising profiles, and we do not sell or share your data with third
        parties for their own marketing.
      </p>

      <h2>Why we process it</h2>
      <p>
        Enquiry details are processed to respond to you and, if we work
        together, to perform our contract. Technical data is processed under
        legitimate interest — keeping the site available and free of spam.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Enquiries that do not become projects are deleted after 24 months.
        Project correspondence is retained for the length of the engagement plus
        seven years, to meet accounting obligations.
      </p>

      <h2>Who processes data for us</h2>
      <ul>
        <li>
          <strong>Resend</strong> — delivers enquiry emails to our inbox.
        </li>
        <li>
          <strong>Our hosting provider</strong> — serves the site and processes
          server logs.
        </li>
      </ul>

      <h2>Your rights</h2>
      <p>
        You can ask us for a copy of your data, ask us to correct or delete it,
        or object to how we process it. Email{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> and we
        will respond within 30 days.
      </p>

      <h2>Contact</h2>
      <p>
        {site.legalName}, {site.contact.street}, {site.contact.locality},{" "}
        {site.contact.region} {site.contact.postalCode},{" "}
        {site.contact.countryName}.
        <br />
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
      </p>
    </LegalPage>
  );
}
