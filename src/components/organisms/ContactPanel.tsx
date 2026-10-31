"use client";

import { CONTACT_CHANNELS, CONTACT_COPY as copy, CONTACT_LIMITS, CONTACT_SERVICES } from "@/data/contact";
import { SITE } from "@/data/site";
import { contactSchema } from "@/lib/contact-validation";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { useId, useRef, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";
type FieldName = "name" | "email" | "service" | "subject" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

/** Single contact form, with the same validation and service catalogue as the API. */
export const ContactPanel = ({ compact = false, initialService = "" }: { compact?: boolean; initialService?: string } = {}) => {
    const [status, setStatus] = useState<Status>("idle");
    const [serverError, setServerError] = useState("");
    const [errors, setErrors] = useState<FieldErrors>({});
    const pending = useRef(false);
    const uid = useId();
    const id = (name: string) => `${uid}-${name}`;
    const errorId = (name: string) => `${uid}-${name}-error`;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (pending.current) return;
        setServerError("");
        if (status === "error") setStatus("idle");
        const form = event.currentTarget;
        const data = new FormData(form);
        const body = Object.fromEntries(["name", "email", "service", "subject", "message"].map(name => [name, String(data.get(name) ?? "").trim()]));
        const parsed = contactSchema.safeParse(body);
        const next: FieldErrors = {};
        if (!parsed.success) {
            for (const issue of parsed.error.issues) {
                const field = issue.path[0] as FieldName;
                next[field] ??= issue.message;
            }
            setErrors(next);
            const first = (["name", "email", "service", "subject", "message"] as const).find(name => next[name]);
            form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
            return;
        }
        setErrors({});
        setServerError("");
        pending.current = true;
        setStatus("submitting");
        try {
            const response = await fetch("/api/contact", {
                method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data),
            });
            if (response.ok) {
                form.reset();
                setStatus("success");
            } else {
                const payload = await response.json().catch(() => null) as { error?: string } | null;
                setServerError(payload?.error || copy.genericError);
                setStatus("error");
            }
        } catch {
            setServerError(copy.networkError);
            setStatus("error");
        } finally {
            pending.current = false;
        }
    };

    const control = (name: FieldName) => `w-full rounded-sm border bg-bg px-4 py-3.5 text-sm leading-relaxed text-ink transition-colors placeholder:text-ink/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${errors[name] ? "border-red-400" : "border-line hover:border-ink/30"}`;
    const fieldProps = (name: FieldName) => ({
        id: id(name), name, "aria-invalid": errors[name] ? true : undefined,
        "aria-describedby": errors[name] ? errorId(name) : undefined,
    });
    const error = (name: FieldName) => errors[name] && <p id={errorId(name)} className="mt-2 text-xs leading-relaxed text-red-300">{errors[name]}</p>;
    const label = "mb-3 block text-sm font-medium text-ink/85";

    return (
        <section data-native-cursor className={compact ? "" : "pb-[var(--spacing-section)] pt-36 md:pt-48"}>
            <div className={compact ? "" : "shell"}>
                {!compact && <header className="max-w-[850px]">
                    <p className="font-mono text-label uppercase tracking-wider text-accent">{copy.eyebrow}</p>
                    <h1 className="mt-5 max-w-[18ch] text-h1 font-medium">{copy.heading}</h1>
                    <p className="mt-7 max-w-[58ch] text-body leading-relaxed text-ink/65">{copy.intro}</p>
                </header>}

                <div className={compact ? "" : "mt-14 grid grid-cols-1 items-start gap-10 lg:mt-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20"}>
                    {!compact && <aside className="min-w-0 lg:pt-5">
                        <p className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent-dim px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-accent"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />{copy.availability}</p>
                        <h2 className="mt-8 text-h3 font-medium">{copy.directHeading}</h2>
                        <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-ink/65">{copy.directIntro}</p>
                        <ul className="mt-8 border-t border-line">
                            {CONTACT_CHANNELS.map(channel => (
                                <li key={channel.label} className="border-b border-line">
                                    <a href={channel.href} target={channel.href.startsWith("http") ? "_blank" : undefined} rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined} className="group flex items-center justify-between gap-4 py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                                        <span className="min-w-0"><span className="block font-mono text-[10px] uppercase tracking-wider text-ink/50">{channel.label}</span><span className="mt-1.5 block break-words text-sm transition-colors group-hover:text-accent">{channel.value}</span></span>
                                        <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-ink/50 group-hover:text-accent" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-8 font-mono text-[10px] uppercase tracking-wider text-ink/50">{copy.locationLabel}</p>
                        <p className="mt-2 text-sm text-ink/75">{SITE.location} · {SITE.timeZoneLabel}</p>
                    </aside>}

                    <div className={compact ? "min-w-0" : "min-w-0 rounded-sm border border-line bg-surface p-5 sm:p-8 md:p-10"}>
                        <div role="status" aria-live="polite" className={status === "success" ? "py-8" : "sr-only"}>
                            {status === "success" ? <><span aria-hidden="true" className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent-dim text-accent"><Check className="h-6 w-6" /></span><h2 className="mt-7 text-h3 font-medium">{copy.successHeading}</h2><p className="mt-5 text-sm leading-relaxed text-ink/65">{copy.successBody}</p></> : status === "submitting" ? copy.submitting : serverError}
                        </div>
                        {status === "success" ? (
                            <button type="button" onClick={() => setStatus("idle")} className="mt-4 rounded-full border border-line px-6 py-3 text-sm hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{copy.sendAnother}</button>
                        ) : (
                            <form noValidate onSubmit={handleSubmit} aria-busy={status === "submitting"}>
                                <p className="font-mono text-[10px] uppercase tracking-wider text-accent">{copy.formLabel}</p>
                                <h2 className="mt-3 text-h3 font-medium">{copy.formHeading}</h2>
                                <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-ink/60">{copy.formIntro}</p>
                                <fieldset disabled={status === "submitting"} className="mt-9 flex min-w-0 flex-col gap-6 disabled:opacity-70">
                                    <legend className="sr-only">{copy.formLabel}</legend>
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div><label htmlFor={id("name")} className={label}>{copy.name} <span className="text-xs font-normal text-ink/45">({copy.optional})</span></label><input {...fieldProps("name")} autoComplete="name" maxLength={CONTACT_LIMITS.name} placeholder={copy.namePlaceholder} className={control("name")} />{error("name")}</div>
                                        <div><label htmlFor={id("email")} className={label}>{copy.email} <span className="text-accent">*</span></label><input {...fieldProps("email")} type="email" autoComplete="email" required maxLength={CONTACT_LIMITS.email} placeholder={copy.emailPlaceholder} className={control("email")} />{error("email")}</div>
                                    </div>
                                    <div>
                                        <label htmlFor={id("service")} className={label}>{copy.service} <span className="text-accent">*</span></label>
                                        <div className="relative"><select {...fieldProps("service")} required defaultValue={initialService} className={`${control("service")} appearance-none pr-11 [color-scheme:dark]`}><option value="" disabled>{copy.servicePlaceholder}</option>{CONTACT_SERVICES.map(service => <option key={service.value} value={service.value}>{service.label}</option>)}</select><ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-accent" /></div>
                                        {error("service")}
                                    </div>
                                    <div><label htmlFor={id("subject")} className={label}>{copy.subject} <span className="text-xs font-normal text-ink/45">({copy.optional})</span></label><input {...fieldProps("subject")} maxLength={CONTACT_LIMITS.subject} placeholder={copy.subjectPlaceholder} className={control("subject")} />{error("subject")}</div>
                                    <div><label htmlFor={id("message")} className={label}>{copy.message} <span className="text-accent">*</span></label><textarea {...fieldProps("message")} required rows={5} maxLength={CONTACT_LIMITS.message} placeholder={copy.messagePlaceholder} className={`${control("message")} min-h-36 resize-y`} />{error("message")}</div>
                                </fieldset>
                                {status === "error" && <p className="mt-6 rounded-sm border border-red-400/30 bg-red-400/10 p-4 text-sm leading-relaxed text-red-300">{serverError}</p>}
                                <button type="submit" disabled={status === "submitting"} className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-accent px-6 py-4 text-sm font-medium text-bg transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60">{status === "submitting" ? copy.submitting : copy.submit}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></button>
                                <p className="mt-4 text-center text-xs leading-relaxed text-ink/50">{copy.privacy}</p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
