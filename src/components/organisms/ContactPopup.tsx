"use client";

import { CONTACT_COPY } from "@/data/contact";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const ContactPanel = dynamic(() => import("@/components/organisms/ContactPanel").then(module => module.ContactPanel), { ssr: false });
const SEEN_KEY = "contact-popup-seen";
const DELAY_MS = 15_000;

/** Native top-layer dialog shares the validated form and preserves link fallbacks. */
export const ContactPopup = () => {
    const [open, setOpen] = useState(false);
    const [service, setService] = useState("");
    const dialogRef = useRef<HTMLDialogElement>(null);
    const seen = useRef(false);
    const pathname = usePathname();

    const close = useCallback(() => {
        if (dialogRef.current?.open) dialogRef.current.close();
        setOpen(false);
        seen.current = true;
        try { sessionStorage.setItem(SEEN_KEY, "1"); } catch { /* local flag prevents repetition */ }
    }, []);

    useEffect(() => {
        const trigger = (event: MouseEvent) => {
            const link = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-contact-trigger]");
            if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            setService(link.dataset.service || "");
            setOpen(true);
        };
        // Run before Next Link handles navigation. Modifier clicks retain /contact.
        document.addEventListener("click", trigger, true);
        return () => document.removeEventListener("click", trigger, true);
    }, []);

    useEffect(() => {
        if (pathname === "/contact") return;
        try { if (sessionStorage.getItem(SEEN_KEY) === "1") return; } catch { /* use in-memory flag */ }
        const timer = window.setTimeout(() => {
            if (!seen.current && !dialogRef.current?.open) { setService(""); setOpen(true); }
        }, DELAY_MS);
        return () => window.clearTimeout(timer);
    }, [pathname]);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog || !open) return;
        const previous = document.body.style.overflow;
        dialog.showModal();
        document.body.style.overflow = "hidden";
        return () => {
            if (dialog.open) dialog.close();
            document.body.style.overflow = previous;
        };
    }, [open]);

    return <dialog ref={dialogRef} data-native-cursor data-lenis-prevent aria-label={CONTACT_COPY.formLabel}
        onCancel={event => { event.preventDefault(); close(); }} onClose={close}
        onClick={event => {
            if (event.target !== event.currentTarget) return;
            const bounds = event.currentTarget.getBoundingClientRect();
            if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
        }}
        className="contact-dialog fixed inset-0 m-auto max-h-[85svh] w-[calc(100%_-_2rem)] max-w-[560px] overflow-y-auto rounded-sm border border-line bg-surface p-6 text-ink backdrop:bg-bg/80 backdrop:backdrop-blur-sm sm:p-9">
        <button type="button" onClick={close} aria-label={CONTACT_COPY.close} className="absolute right-4 top-4 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-ink/60 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"><span aria-hidden="true" className="pointer-events-none">×</span></button>
        {open && <ContactPanel key={service} compact initialService={service} />}
    </dialog>;
};
