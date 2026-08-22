"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { site } from "@/lib/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Field-level errors keyed by input name. */
  errors?: Record<string, string[]>;
};

/**
 * In-memory sliding window: 5 submissions per IP per 10 minutes.
 *
 * This resets on deploy and is per-instance, which is fine for a contact
 * form — it exists to stop casual flooding, not a determined attacker. If
 * you scale past one instance on the VPS, move this to Redis.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return false;
}

async function clientIp(): Promise<string> {
  const h = await headers();
  // x-forwarded-for is set by Vercel's proxy and by the nginx config in
  // deploy/nginx.conf. First entry is the real client.
  const forwarded = h.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    service: formData.get("service"),
    budget: formData.get("budget"),
    message: formData.get("message"),
    website: formData.get("website"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  // Honeypot tripped — accept silently so the bot does not learn anything.
  if (parsed.data.website) {
    return { status: "success", message: "Thanks — we will be in touch." };
  }

  if (rateLimited(await clientIp())) {
    return {
      status: "error",
      message: `That is a lot of enquiries. Email ${site.contact.email} directly and we will pick it up.`,
    };
  }

  const { name, email, company, service, budget, message } = parsed.data;

  // Without an API key the form still validates — it just cannot deliver.
  // Failing loudly here beats silently dropping a real lead.
  if (!process.env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY is not set; enquiry not delivered.");
    return {
      status: "error",
      message: `Our form is misconfigured. Please email ${site.contact.email} directly — we are sorry.`,
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Aliph Studio <hello@aliph.studio>",
      to: process.env.CONTACT_TO_EMAIL ?? site.contact.email,
      replyTo: email,
      subject: `New enquiry — ${name}${company ? ` (${company})` : ""}`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Company: ${company || "—"}`,
        `Service: ${service}`,
        `Budget:  ${budget}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend rejected the send:", error);
      return {
        status: "error",
        message: `We could not send that. Please email ${site.contact.email} directly.`,
      };
    }

    return {
      status: "success",
      message: "Thanks — we read every enquiry and reply within one working day.",
    };
  } catch (err) {
    console.error("[contact] Unexpected failure:", err);
    return {
      status: "error",
      message: `Something went wrong on our side. Please email ${site.contact.email}.`,
    };
  }
}
