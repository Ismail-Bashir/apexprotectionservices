"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { SITE } from "@/lib/site";

// The site is static (GitHub Pages), so forms post straight to Web3Forms from
// the browser. Web3Forms access keys are designed to be public: a key can only
// send to the inbox it was created for.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "block w-full min-w-0 rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink placeholder:text-muted/60 transition focus:border-ink focus:outline-none focus:ring-4 focus:ring-gold/25";

function Field({
  label,
  htmlFor,
  required,
  hint,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex min-w-0 flex-col gap-2 ${className}`}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-gold-dark"> *</span> : <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {children}
      {hint ? <p className="text-xs text-muted">{hint}</p> : null}
    </div>
  );
}

// Visually hidden field that only bots fill in.
function Honeypot() {
  return (
    <div className="sr-only" aria-hidden>
      <label htmlFor="website">Leave this field empty</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

function useSubmit() {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(form: FormData, subject: string, fields: Record<string, string>) {
    // Pretend a bot submission worked without sending anything.
    if (String(form.get("website") ?? "").trim()) {
      setStatus("sent");
      return;
    }
    if (!WEB3FORMS_KEY) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject,
          from_name: `${SITE.name} website`,
          replyto: fields.email,
          ...fields,
        }),
      });
      const data = await res.json().catch(() => ({}));
      setStatus(res.ok && data.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return { status, submit };
}

const text = (form: FormData, key: string, fallback = "Not provided") => String(form.get(key) ?? "").trim() || fallback;

function ErrorMessage() {
  return (
    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-red-200">
      Sorry, your message didn&apos;t go through. Please try again, or call us at{" "}
      <a href={SITE.phoneHref} className="font-semibold underline">
        {SITE.phone}
      </a>
      .
    </p>
  );
}

function SubmitButton({ sending, children }: { sending: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={sending}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-navy disabled:cursor-not-allowed disabled:opacity-70"
    >
      {sending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
      {sending ? "Sending..." : children}
    </button>
  );
}

function Success({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col items-start gap-4 py-10" role="status">
      <span className="flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
        <CheckCircle2 className="size-7" aria-hidden />
      </span>
      <h3 className="font-display text-2xl font-semibold text-ink">{title}</h3>
      <p className="max-w-md leading-relaxed text-muted">{body}</p>
    </div>
  );
}

export function ContactForm({ services }: { services: { slug: string; title: string }[] }) {
  const { status, submit } = useSubmit();
  const serviceRef = useRef<HTMLSelectElement>(null);

  // Preselect the service when arriving from a service page (?service=slug).
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("service");
    if (requested && serviceRef.current && services.some((s) => s.slug === requested)) {
      serviceRef.current.value = requested;
    }
  }, [services]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const slug = String(form.get("service") ?? "");
    const service = services.find((s) => s.slug === slug)?.title ?? (slug ? "Not sure / multiple" : "Not specified");
    const name = text(form, "name", "");
    submit(form, `Quote request from ${name} - ${service}`, {
      name,
      email: text(form, "email", ""),
      phone: text(form, "phone"),
      company: text(form, "company"),
      service,
      site_location: text(form, "location"),
      message: text(form, "message", ""),
    });
  }

  if (status === "sent") {
    return (
      <Success
        title="Thanks, we've got your request."
        body={`Someone from our team will be in touch shortly. If it's urgent, call us any time at ${SITE.phone}.`}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative grid grid-cols-1 gap-6 sm:grid-cols-2">
      <Honeypot />
      <Field label="Full name" htmlFor="name" required>
        <input id="name" name="name" type="text" required autoComplete="name" maxLength={120} className={inputClass} />
      </Field>
      <Field label="Company or building" htmlFor="company">
        <input id="company" name="company" type="text" autoComplete="organization" maxLength={160} className={inputClass} />
      </Field>
      <Field label="Email" htmlFor="email" required>
        <input id="email" name="email" type="email" required autoComplete="email" maxLength={254} className={inputClass} />
      </Field>
      <Field label="Phone" htmlFor="phone">
        <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} className={inputClass} />
      </Field>
      <Field label="Service needed" htmlFor="service">
        <select id="service" name="service" defaultValue="" ref={serviceRef} className={inputClass}>
          <option value="">Choose a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
          <option value="other">Not sure / multiple</option>
        </select>
      </Field>
      <Field label="Site location" htmlFor="location">
        <input id="location" name="location" type="text" placeholder="e.g. King St W, Toronto" maxLength={200} className={inputClass} />
      </Field>
      <Field label="How can we help?" htmlFor="message" required className="sm:col-span-2">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          placeholder="Tell us about the property, the hours you need covered and when you'd like to start."
          className={`${inputClass} resize-y`}
        />
      </Field>
      {status === "error" ? (
        <div className="sm:col-span-2">
          <ErrorMessage />
        </div>
      ) : null}
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">We only use your details to respond to your request.</p>
        <SubmitButton sending={status === "sending"}>Send request</SubmitButton>
      </div>
    </form>
  );
}

export function ApplyForm({ roles }: { roles: string[] }) {
  const { status, submit } = useSubmit();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const role = String(form.get("role") ?? "");
    const roleTitle = roles.includes(role) ? role : "General application";
    const availability = form.getAll("availability").map(String);
    const name = text(form, "name", "");
    submit(form, `Job application from ${name} - ${roleTitle}`, {
      name,
      email: text(form, "email", ""),
      phone: text(form, "phone", ""),
      city: text(form, "city"),
      role: roleTitle,
      security_licence_number: text(form, "licence"),
      availability: availability.length ? availability.join(", ") : "Not specified",
      experience: text(form, "experience"),
    });
  }

  if (status === "sent") {
    return (
      <Success
        title="Application received."
        body="Thanks for your interest in joining Apex. If your experience matches an open role, our hiring team will contact you to set up an interview."
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative grid grid-cols-1 gap-6 sm:grid-cols-2">
      <Honeypot />
      <Field label="Full name" htmlFor="name" required>
        <input id="name" name="name" type="text" required autoComplete="name" maxLength={120} className={inputClass} />
      </Field>
      <Field label="Email" htmlFor="email" required>
        <input id="email" name="email" type="email" required autoComplete="email" maxLength={254} className={inputClass} />
      </Field>
      <Field label="Phone" htmlFor="phone" required>
        <input id="phone" name="phone" type="tel" required autoComplete="tel" maxLength={40} className={inputClass} />
      </Field>
      <Field label="City" htmlFor="city">
        <input id="city" name="city" type="text" autoComplete="address-level2" maxLength={120} className={inputClass} />
      </Field>
      <Field label="Role you're applying for" htmlFor="role">
        <select id="role" name="role" defaultValue="" className={inputClass}>
          <option value="">Any open role</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Security guard licence number" htmlFor="licence" hint="Your Ontario PSISA licence number, if you have one.">
        <input id="licence" name="licence" type="text" maxLength={40} className={inputClass} />
      </Field>
      <fieldset className="flex min-w-0 flex-col gap-3 sm:col-span-2">
        <legend className="text-sm font-medium text-ink">
          Availability <span className="font-normal text-muted">(choose any)</span>
        </legend>
        <div className="mt-1 flex flex-wrap gap-3">
          {["Full-time", "Part-time", "Nights", "Weekends"].map((a) => (
            <label
              key={a}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink transition has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-white has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-gold/40"
            >
              <input type="checkbox" name="availability" value={a} className="sr-only" />
              {a}
            </label>
          ))}
        </div>
      </fieldset>
      <Field label="Tell us about your experience" htmlFor="experience" className="sm:col-span-2">
        <textarea
          id="experience"
          name="experience"
          rows={5}
          maxLength={5000}
          placeholder="Previous security work, certifications (First Aid, CPR, etc.) and anything else you'd like us to know."
          className={`${inputClass} resize-y`}
        />
      </Field>
      {status === "error" ? (
        <div className="sm:col-span-2">
          <ErrorMessage />
        </div>
      ) : null}
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">We&apos;ll ask for your resume and licence copy if we move forward.</p>
        <SubmitButton sending={status === "sending"}>Submit application</SubmitButton>
      </div>
    </form>
  );
}
