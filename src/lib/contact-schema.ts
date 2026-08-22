import { z } from "zod";

export const budgets = [
  "Under $5k",
  "$5k – $15k",
  "$15k – $50k",
  "$50k+",
  "Not sure yet",
] as const;

export const serviceOptions = [
  "Web development",
  "Mobile app",
  "Hybrid platform",
  "SEO",
  "Digital marketing",
  "Something else",
] as const;

/**
 * One schema, validated in the browser for fast feedback and again in the
 * server action. Client-side validation is a convenience, never a control —
 * the server never trusts what the form sends.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please tell us your name.")
    .max(80, "That name is too long."),

  email: z
    .string()
    .trim()
    .min(1, "We need an email to reply to.")
    .email("That does not look like a valid email address."),

  company: z.string().trim().max(120).optional().or(z.literal("")),

  service: z.enum(serviceOptions, {
    message: "Pick the closest match.",
  }),

  budget: z.enum(budgets, {
    message: "An approximate range is fine.",
  }),

  message: z
    .string()
    .trim()
    .min(20, "A sentence or two about the project, please.")
    .max(4000, "That is longer than our form can take — email us instead."),

  /**
   * Honeypot. Hidden from humans, irresistible to naive bots. Combined with
   * the rate limiter in the action this replaces Vercel BotID, which would
   * not work on the VPS deployment.
   */
  website: z.string().max(0, "Rejected.").optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
