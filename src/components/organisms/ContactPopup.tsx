"use client";

import { SITE } from "@/data/site";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { popVariants } from "@/lib/motion";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Contact prompt, fifteen seconds after arrival.
 *
 * Deliberately a prompt and not a third copy of the contact form. Two forms
 * already exist — `ContactPanel` on /contact and the legacy inline one in
 * `ContactSection` — and a third would be the duplication the project's own notes
 * warn about, with its own validation and error states to keep in step with the
 * Zod schema. Two buttons cost nothing to maintain and ask less of the visitor.
 *
 * Restraint built in:
 * - once per browser session, and never again once dismissed
 * - never on /contact, where it would be telling someone to do what they are doing
 * - reduced motion still gets the popup, just without the scale
 */

const DELAY_MS = 15_000;
const SEEN_KEY = "contact-popup-seen";

/** Focusable children, for the tab trap. */
const FOCUSABLE =
    'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

export const ContactPopup = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const reduceMotion = usePrefersReducedMotion();
    const panelRef = useRef<HTMLDivElement>(null);
    const returnFocusTo = useRef<HTMLElement | null>(null);

    const dismiss = useCallback(() => {
        setOpen(false);
        try {
            sessionStorage.setItem(SEEN_KEY, "1");
        } catch {
            // Private mode and blocked storage both throw. Losing the flag only
            // means the prompt may return next session, which is survivable.
        }
    }, []);

    // Arm the timer. Anyone already on /contact is left alone.
    useEffect(() => {
        if (pathname === "/contact") return;

        let seen = false;
        try {
            seen = sessionStorage.getItem(SEEN_KEY) === "1";
        } catch {
            seen = false;
        }
        if (seen) return;

        const timer = window.setTimeout(() => setOpen(true), DELAY_MS);
        return () => window.clearTimeout(timer);
    }, [pathname]);

    // There is deliberately no "close on route change" effect. While the prompt is
    // open its backdrop covers the page, so the only way to navigate is to dismiss
    // it first — and the timer effect above already re-arms per path.

    // Escape to close, Tab kept inside, focus returned where it came from.
    useEffect(() => {
        if (!open) return;

        returnFocusTo.current = document.activeElement as HTMLElement | null;
        const panel = panelRef.current;
        panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                dismiss();
                return;
            }
            if (e.key !== "Tab" || !panel) return;

            const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
            if (!items.length) return;
            const first = items[0];
            const last = items[items.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            returnFocusTo.current?.focus?.();
        };
    }, [open, dismiss]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[120] flex items-end justify-center p-4 sm:items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    {/* Backdrop. Clicking it dismisses, like any other modal. */}
                    <button
                        type="button"
                        aria-label="Close"
                        onClick={dismiss}
                        className="absolute inset-0 h-full w-full cursor-default bg-bg/80 backdrop-blur-sm"
                    />

                    <motion.div
                        ref={panelRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="contact-popup-title"
                        aria-describedby="contact-popup-body"
                        variants={reduceMotion ? undefined : popVariants}
                        initial={reduceMotion ? false : "hidden"}
                        animate={reduceMotion ? undefined : "visible"}
                        exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                        className="relative w-full max-w-[460px] rounded-sm border border-line bg-surface p-7 md:p-9"
                    >
                        <button
                            type="button"
                            onClick={dismiss}
                            aria-label="Close"
                            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                        >
                            <span aria-hidden="true" className="text-lg leading-none">
                                &times;
                            </span>
                        </button>

                        <p className="flex items-center gap-2 font-mono text-label uppercase tracking-wider text-muted">
                            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
                            Available for work
                        </p>

                        <h2
                            id="contact-popup-title"
                            className="mt-6 max-w-[16ch] text-h3 font-medium"
                        >
                            Got something that needs building?
                        </h2>

                        <p
                            id="contact-popup-body"
                            className="mt-4 max-w-[42ch] text-small leading-relaxed text-muted"
                        >
                            Tell me what the site is and what is going wrong. The first look costs
                            nothing, and if the fix you asked for is the wrong one I will say so.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/contact"
                                onClick={dismiss}
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-mono text-label uppercase tracking-wider text-bg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                            >
                                Send a message
                                <span aria-hidden="true">&rarr;</span>
                            </Link>

                            <a
                                href={`https://wa.me/${SITE.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={dismiss}
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 font-mono text-label uppercase tracking-wider transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                            >
                                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#25D366]" />
                                WhatsApp
                            </a>
                        </div>

                        <p className="mt-6 font-mono text-[10px] uppercase tracking-wider text-muted">
                            Or email {SITE.email}
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
