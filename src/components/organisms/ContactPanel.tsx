"use client";

import { SITE } from "@/data/site";
import { useId, useRef, useState } from "react";

/**
 * The /contact page body.
 *
 * Deliberately separate from `ContactSection`, which still renders the legacy
 * sky/purple design on the home page. This one is in the current system, and the
 * home page was left alone on purpose — see docs/DESIGN_SYSTEM.md. When the home
 * page section is eventually converted, it should adopt this form and the old
 * inline one should go.
 *
 * What this form does that the old one did not: validates before posting, shows
 * the server's actual message instead of a generic one, announces its state to
 * screen readers, cannot be double-submitted, and never uses `alert()`.
 */

type Status = "idle" | "submitting" | "success" | "error";

interface FieldErrors {
    email?: string;
    message?: string;
}

/** Mirrors the Zod schema in src/app/api/contact/route.ts. Keep the two in step. */
const LIMITS = { name: 120, email: 254, subject: 200, message: 5000 };

const CHANNELS = [
    { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { label: "WhatsApp", value: SITE.phoneLabel, href: `https://wa.me/${SITE.whatsapp}` },
    { label: "LinkedIn", value: "linkedin.com/in/umer-farooq", href: SITE.linkedin },
    { label: "GitHub", value: "github.com/umerfarooque00786", href: SITE.github },
];

export const ContactPanel = () => {
    const [status, setStatus] = useState<Status>("idle");
    const [serverError, setServerError] = useState("");
    const [errors, setErrors] = useState<FieldErrors>({});
    const formRef = useRef<HTMLFormElement>(null);
    const uid = useId();

    const fieldId = (name: string) => `${uid}-${name}`;
    const errorId = (name: string) => `${uid}-${name}-error`;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (status === "submitting") return;

        const form = event.currentTarget;
        const data = new FormData(form);
        const body = {
            name: String(data.get("name") ?? "").trim(),
            email: String(data.get("email") ?? "").trim(),
            subject: String(data.get("subject") ?? "").trim(),
            message: String(data.get("message") ?? "").trim(),
        };

        // Catch the obvious problems here so a visitor is not waiting on a round
        // trip to be told their email has no @ in it.
        const next: FieldErrors = {};
        if (!body.email) next.email = "Enter your email so I can reply.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) next.email = "That does not look like a valid email address.";
        else if (body.email.length > LIMITS.email) next.email = "That email address is too long.";
        if (!body.message) next.message = "Tell me a little about the project.";
        else if (body.message.length > LIMITS.message) next.message = `Keep it under ${LIMITS.message} characters.`;

        setErrors(next);
        if (Object.keys(next).length) {
            const first = form.querySelector<HTMLElement>("[aria-invalid='true']");
            first?.focus();
            return;
        }

        setStatus("submitting");
        setServerError("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                form.reset();
                setStatus("success");
                return;
            }

            // The route returns a human-readable reason — rate limiting, a field
            // that failed validation, email not configured. Show it.
            const payload = (await res.json().catch(() => null)) as { error?: string } | null;
            setServerError(payload?.error ?? "Something went wrong. Please try again.");
            setStatus("error");
        } catch {
            setServerError("Could not reach the server. Check your connection and try again.");
            setStatus("error");
        }
    };

    const field =
        "w-full rounded-sm border bg-surface px-4 py-3 text-small text-ink transition-colors placeholder:text-ink/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

    return (
        <>
            <header className="w-full max-w-full overflow-hidden pb-[clamp(48px,6vw,96px)] pt-40 md:pt-56">
                <div className="mx-auto w-full max-w-[var(--container-grid)] px-[var(--gutter)]">
                    <span className="mb-8 block font-mono text-label uppercase tracking-wider text-muted">
                        Contact
                    </span>
                    <h1 className="max-w-[16ch] text-balance text-h1 font-medium">
                        Tell me what is broken, or what you want built.
                    </h1>
                    <p className="mt-8 max-w-[56ch] text-body leading-relaxed text-muted">
                        The first look costs nothing. If what you have asked for is the wrong fix, that
                        is the cheapest possible moment for me to say so. Replies usually within 24
                        hours, {SITE.timeZoneLabel}.
                    </p>
                </div>
            </header>

            <section
                aria-label="Contact details and form"
                className="border-t border-line py-[clamp(48px,6vw,96px)]"
            >
                <div className="mx-auto grid w-full max-w-[var(--container-grid)] grid-cols-1 gap-12 px-[var(--gutter)] lg:grid-cols-12 lg:gap-16">
                    {/* Direct channels */}
                    <div className="lg:col-span-5">
                        <h2 className="font-mono text-label uppercase tracking-wider text-muted">
                            Direct
                        </h2>
                        <ul className="mt-6 flex flex-col">
                            {CHANNELS.map((c) => (
                                <li key={c.label} className="border-b border-line">
                                    <a
                                        href={c.href}
                                        target={c.href.startsWith("http") ? "_blank" : undefined}
                                        rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className="group flex items-baseline justify-between gap-6 py-5 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                    >
                                        <span className="font-mono text-label uppercase tracking-wider text-muted">
                                            {c.label}
                                        </span>
                                        <span className="truncate text-small">{c.value}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <dl className="mt-10 flex flex-col gap-5">
                            <div>
                                <dt className="font-mono text-label uppercase tracking-wider text-muted">
                                    Based in
                                </dt>
                                <dd className="mt-2 text-small">
                                    {SITE.location} · {SITE.timeZoneLabel}
                                </dd>
                            </div>
                            <div>
                                <dt className="font-mono text-label uppercase tracking-wider text-muted">
                                    Availability
                                </dt>
                                <dd className="mt-2 flex items-center gap-2 text-small">
                                    <span
                                        aria-hidden="true"
                                        className="h-2 w-2 shrink-0 rounded-full bg-accent"
                                    />
                                    Open to freelance and full-time
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-7">
                        {status === "success" ? (
                            <div
                                role="status"
                                className="rounded-sm border border-accent/40 bg-accent-dim p-8 md:p-10"
                            >
                                <h2 className="text-h3 font-medium">Message sent.</h2>
                                <p className="mt-4 max-w-[48ch] text-small leading-relaxed text-muted">
                                    It is in my inbox. I reply to everything within about 24 hours — if
                                    it is urgent, WhatsApp is faster.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setStatus("idle")}
                                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-mono text-label uppercase tracking-wider transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                                >
                                    Send another
                                </button>
                            </div>
                        ) : (
                            <form
                                ref={formRef}
                                noValidate
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-6 rounded-sm border border-line bg-surface/40 p-6 md:p-10"
                            >
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor={fieldId("name")}
                                            className="mb-3 block font-mono text-label uppercase tracking-wider text-muted"
                                        >
                                            Name
                                        </label>
                                        <input
                                            id={fieldId("name")}
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            maxLength={LIMITS.name}
                                            placeholder="Your name"
                                            className={`${field} border-line`}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor={fieldId("email")}
                                            className="mb-3 block font-mono text-label uppercase tracking-wider text-muted"
                                        >
                                            Email <span className="text-accent">*</span>
                                        </label>
                                        <input
                                            id={fieldId("email")}
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            maxLength={LIMITS.email}
                                            placeholder="you@company.com"
                                            aria-invalid={errors.email ? "true" : undefined}
                                            aria-describedby={errors.email ? errorId("email") : undefined}
                                            className={`${field} ${errors.email ? "border-red-400" : "border-line"}`}
                                        />
                                        {errors.email && (
                                            <p id={errorId("email")} className="mt-2 text-small text-red-400">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor={fieldId("subject")}
                                        className="mb-3 block font-mono text-label uppercase tracking-wider text-muted"
                                    >
                                        Subject
                                    </label>
                                    <input
                                        id={fieldId("subject")}
                                        name="subject"
                                        type="text"
                                        maxLength={LIMITS.subject}
                                        placeholder="Shopify speed, a Laravel dashboard, a migration…"
                                        className={`${field} border-line`}
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor={fieldId("message")}
                                        className="mb-3 block font-mono text-label uppercase tracking-wider text-muted"
                                    >
                                        Message <span className="text-accent">*</span>
                                    </label>
                                    <textarea
                                        id={fieldId("message")}
                                        name="message"
                                        rows={6}
                                        required
                                        maxLength={LIMITS.message}
                                        placeholder="What is the site, what is going wrong, and what does done look like?"
                                        aria-invalid={errors.message ? "true" : undefined}
                                        aria-describedby={errors.message ? errorId("message") : undefined}
                                        className={`${field} resize-y ${errors.message ? "border-red-400" : "border-line"}`}
                                    />
                                    {errors.message && (
                                        <p id={errorId("message")} className="mt-2 text-small text-red-400">
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                {/*
                                    One live region for the whole form, so a screen reader is told
                                    what happened without the focus being moved out from under the
                                    person using it.
                                */}
                                <p aria-live="polite" className="sr-only">
                                    {status === "submitting" ? "Sending your message." : serverError}
                                </p>

                                {status === "error" && serverError && (
                                    <p className="rounded-sm border border-red-400/40 bg-red-400/10 px-4 py-3 text-small text-red-300">
                                        {serverError}
                                    </p>
                                )}

                                <div className="flex flex-wrap items-center gap-5">
                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-mono text-label uppercase tracking-wider text-bg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {status === "submitting" ? "Sending…" : "Send message"}
                                        {status !== "submitting" && <span aria-hidden="true">&rarr;</span>}
                                    </button>
                                    <span className="font-mono text-label uppercase tracking-wider text-muted">
                                        Or just email me
                                    </span>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};
