import { useEffect, useId, useState, type FormEvent } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { WhatsAppIcon } from "../icons/BrandIcons";
import { SectionHeadingUnderline } from "../SectionHeadingUnderline";
import { profile } from "../../data/profile";

type ContactMode = "email" | "whatsapp";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const COOLDOWN_SECONDS = 30;
const whatsappHref = `https://wa.me/${profile.social.whatsapp}`;

const glassCardClass =
  "rounded-2xl border border-border/80 bg-card/55 shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_0%,transparent)] backdrop-blur-md transition duration-300 hover:border-primary/50 hover:shadow-[0_0_36px_-12px_color-mix(in_oklab,var(--primary)_50%,transparent)]";

const inputClassName =
  "mt-1.5 w-full rounded-xl border border-border/80 bg-background/45 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/70 transition duration-200 hover:border-primary/35 focus-visible:border-primary/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues, mode: ContactMode): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }

  if (mode === "email") {
    if (!values.email.trim()) {
      errors.email = "Email is required.";
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      errors.email = "Enter a valid email address.";
    }
  }

  if (!values.message.trim()) {
    errors.message = "Message is required.";
  }

  return errors;
}

export function Contact() {
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const [mode, setMode] = useState<ContactMode>("email");
  const [values, setValues] = useState<FormValues>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  /** Seconds remaining before another email submission is allowed */
  const [cooldownLeft, setCooldownLeft] = useState(0);

  const [formspreeState, handleFormspreeSubmit, resetFormspree] = useForm(import.meta.env.VITE_FORMSPREE_FORM_ID);

  const isSubmitting = formspreeState.submitting;
  const isSuccess = formspreeState.succeeded;
  const isCoolingDown = cooldownLeft > 0;
  const showEmailSuccess = mode === "email" && isSuccess;

  // Tick countdown once per second while rate-limited
  useEffect(() => {
    if (cooldownLeft <= 0) return;
    const timerId = window.setTimeout(() => {
      setCooldownLeft((seconds) => Math.max(0, seconds - 1));
    }, 1000);
    return () => window.clearTimeout(timerId);
  }, [cooldownLeft]);

  const updateField = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const resetEmailForm = () => {
    if (isCoolingDown) return;
    resetFormspree();
    setValues({ name: "", email: "", message: "" });
    setErrors({});
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values, mode);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (mode === "whatsapp") {
      const text = `Hi, I'm ${values.name.trim()}.\n\n${values.message.trim()}`;
      window.open(`${whatsappHref}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
      return;
    }

    if (isCoolingDown || isSubmitting) return;

    await handleFormspreeSubmit({
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
      _gotcha: "",
    });

    // Rate-limit the next email attempt (success or failure)
    setCooldownLeft(COOLDOWN_SECONDS);
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative scroll-mt-5 overflow-hidden border-t border-border/80 bg-background">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-16 h-80 w-80 rounded-full bg-primary/8 blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-14 text-center sm:px-6 md:px-8 md:py-16 lg:min-h-[calc(100svh-4.5rem)] lg:justify-center">
        <div className="mb-7 flex flex-col items-center md:mb-8">
          <span className="mb-2 inline-flex items-center rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">Contact</span>
          <div className="group inline-flex flex-col items-center">
            <h2 id="contact-heading" className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Get in <span className="text-primary">Touch</span>
            </h2>
            <SectionHeadingUnderline className="mt-2.5" />
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">Have a project, role, or collaboration in mind? Send a message — I usually reply within a day.</p>
        </div>

        <div className={`w-full max-w-2xl motion-safe:animate-[fade-up_0.5s_ease-out_both] ${glassCardClass} p-4 sm:p-5`}>
          <div role="tablist" aria-label="Contact method" className="relative grid grid-cols-2 rounded-xl border border-border/80 bg-background/40 p-1">
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-lg bg-primary shadow-[0_0_20px_-6px_color-mix(in_oklab,var(--primary)_55%,transparent)] transition-transform duration-300 ease-out motion-reduce:transition-none ${
                mode === "whatsapp" ? "translate-x-full" : "translate-x-0"
              }`}
            />
            <button
              type="button"
              role="tab"
              aria-selected={mode === "email"}
              onClick={() => {
                setMode("email");
                setErrors({});
              }}
              className={`relative z-10 cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                mode === "email" ? "text-primary-foreground" : "text-muted hover:text-foreground"
              }`}
            >
              Email
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "whatsapp"}
              onClick={() => {
                setMode("whatsapp");
                setErrors((prev) => {
                  const next = { ...prev };
                  delete next.email;
                  return next;
                });
              }}
              className={`relative z-10 cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                mode === "whatsapp" ? "text-primary-foreground" : "text-muted hover:text-foreground"
              }`}
            >
              WhatsApp
            </button>
          </div>

          {showEmailSuccess ? (
            <div className="mt-6 flex flex-col items-center gap-3 px-2 py-6 text-center" role="status">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-primary/35 bg-primary/15 text-primary">
                <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="font-display text-xl font-bold text-foreground">Message sent!</h3>
              <p className="max-w-sm text-sm leading-relaxed text-muted">Thanks for reaching out, I&apos;ll get back to you soon.</p>
              <button
                type="button"
                onClick={resetEmailForm}
                disabled={isCoolingDown}
                aria-live="polite"
                className="mt-2 inline-flex min-w-52 cursor-pointer items-center justify-center rounded-xl border border-border bg-background/40 px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/45 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:border-border disabled:hover:text-foreground"
              >
                {isCoolingDown ? `Please wait (${cooldownLeft}s)` : "Send another message"}
              </button>
            </div>
          ) : (
            <form className="mt-4 space-y-3.5 text-start" onSubmit={handleSubmit} noValidate>
              {/* Honeypot — bots fill this; humans never see it */}
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />

              {mode === "email" ? (
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <div>
                    <label htmlFor={nameId} className="text-sm font-semibold text-foreground">
                      Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id={nameId}
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      value={values.name}
                      onChange={(event) => updateField("name", event.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? `${nameId}-error` : undefined}
                      className={inputClassName}
                    />
                    {errors.name ? (
                      <p id={`${nameId}-error`} className="mt-1 text-xs text-red-400" role="alert">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor={emailId} className="text-sm font-semibold text-foreground">
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      id={emailId}
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={values.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? `${emailId}-error` : undefined}
                      className={inputClassName}
                    />
                    {errors.email ? (
                      <p id={`${emailId}-error`} className="mt-1 text-xs text-red-400" role="alert">
                        {errors.email}
                      </p>
                    ) : null}
                    <ValidationError prefix="Email" field="email" errors={formspreeState.errors} className="mt-1 text-xs text-red-400" />
                  </div>
                </div>
              ) : (
                <div>
                  <label htmlFor={nameId} className="text-sm font-semibold text-foreground">
                    Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id={nameId}
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={values.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? `${nameId}-error` : undefined}
                    className={inputClassName}
                  />
                  {errors.name ? (
                    <p id={`${nameId}-error`} className="mt-1 text-xs text-red-400" role="alert">
                      {errors.name}
                    </p>
                  ) : null}
                </div>
              )}

              <div>
                <label htmlFor={messageId} className="text-sm font-semibold text-foreground">
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  id={messageId}
                  name="message"
                  rows={4}
                  placeholder={mode === "whatsapp" ? "Tell me briefly what you need…" : "Tell me about your project or role…"}
                  value={values.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? `${messageId}-error` : undefined}
                  className={`${inputClassName} resize-y`}
                />
                {errors.message ? (
                  <p id={`${messageId}-error`} className="mt-1 text-xs text-red-400" role="alert">
                    {errors.message}
                  </p>
                ) : null}
                {mode === "email" ? <ValidationError prefix="Message" field="message" errors={formspreeState.errors} className="mt-1 text-xs text-red-400" /> : null}
              </div>

              {mode === "email" && formspreeState.errors && !isSubmitting ? (
                <p className="rounded-xl border border-red-400/30 bg-red-400/10 px-3.5 py-2.5 text-xs leading-relaxed text-red-400" role="alert">
                  Something went wrong. Please try again, or email me directly at{" "}
                  <a href={`mailto:${profile.social.email}`} className="font-semibold underline underline-offset-2 hover:text-red-300">
                    {profile.social.email}
                  </a>
                  .
                </p>
              ) : null}

              <button
                type="submit"
                disabled={mode === "email" && (isSubmitting || isCoolingDown)}
                aria-live="polite"
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-70"
              >
                {mode === "email" ? (
                  isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                      Sending...
                    </>
                  ) : isCoolingDown ? (
                    `Please wait (${cooldownLeft}s)`
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Send Message
                    </>
                  )
                ) : (
                  <>
                    <WhatsAppIcon className="h-4 w-4" />
                    Continue on WhatsApp
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
