"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { budgets, serviceOptions } from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/select-field";

const initial: ContactState = { status: "idle" };

/**
 * `glass-edge` is deliberately absent: inputs cannot render pseudo-elements,
 * so the specular top edge would be dead weight on them.
 *
 * No `focus:outline-none` either — it matches on pointer focus AND keyboard
 * focus, and at higher specificity than the global :focus-visible rule, so it
 * would strip the keyboard focus ring from every field on the form.
 */
const field =
  "w-full rounded-xl glass px-4 py-3 font-body text-[0.95rem] text-bright placeholder:text-faint transition-colors duration-300 focus:border-[var(--line-strong)]";

function Label({
  htmlFor,
  children,
  optional = false,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-baseline justify-between gap-2 font-display text-[0.85rem] font-medium tracking-tight text-body"
    >
      {children}
      {optional ? (
        <span className="font-label text-[0.65rem] uppercase tracking-[0.12em] text-faint">
          Optional
        </span>
      ) : null}
    </label>
  );
}

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={`${id}-error`} className="text-[0.82rem] text-gold" role="alert">
      {errors[0]}
    </p>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} arrow={!pending} className="w-full sm:w-auto">
      {pending ? "Sending…" : "Send enquiry"}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initial);

  if (state.status === "success") {
    return (
      <div
        className="flex flex-col items-start gap-4 rounded-2xl border border-[var(--line-strong)] glass p-8"
        role="status"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cobalt-lift text-cobalt-lift">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
              d="M3.5 9.5l3.5 3.5 7.5-8"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2 className="text-[1.4rem]">Enquiry received</h2>
        <p className="max-w-md text-[0.97rem] leading-relaxed text-body">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      {/* Honeypot — hidden from people, visible to naive bots. Kept out of the
          tab order and out of the accessibility tree. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Your name</Label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Ayesha Khan"
            className={field}
            aria-invalid={!!state.errors?.name}
            aria-describedby={state.errors?.name ? "name-error" : undefined}
          />
          <FieldError id="name" errors={state.errors?.name} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={field}
            aria-invalid={!!state.errors?.email}
            aria-describedby={state.errors?.email ? "email-error" : undefined}
          />
          <FieldError id="email" errors={state.errors?.email} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="company" optional>
          Company
        </Label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Acme Ltd"
          className={field}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <SelectField
            name="service"
            label="What do you need?"
            options={serviceOptions}
            placeholder="Choose one"
            invalid={!!state.errors?.service}
            describedBy={state.errors?.service ? "service-error" : undefined}
          />
          <FieldError id="service" errors={state.errors?.service} />
        </div>

        <div className="flex flex-col gap-2">
          <SelectField
            name="budget"
            label="Approximate budget"
            options={budgets}
            placeholder="Choose a range"
            invalid={!!state.errors?.budget}
            describedBy={state.errors?.budget ? "budget-error" : undefined}
          />
          <FieldError id="budget" errors={state.errors?.budget} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">About the project</Label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="What are you building, who is it for, and what does done look like?"
          className={`${field} resize-y`}
          aria-invalid={!!state.errors?.message}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
        />
        <FieldError id="message" errors={state.errors?.message} />
      </div>

      {state.status === "error" && state.message ? (
        <p
          className="rounded-xl border border-gold/40 glass px-4 py-3 text-[0.9rem] text-gold"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}

      <SubmitButton />

      <p className="text-[0.82rem] leading-relaxed text-muted">
        We reply within one working day. Your details stay with us — we do not
        share or sell them, and we will not add you to a mailing list.
      </p>
    </form>
  );
}
