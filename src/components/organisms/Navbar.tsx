"use client";

import { Magnetic } from "@/components/atoms/Magnetic";
import { navLinks } from "@/data/navLinks";
import { SITE } from "@/data/site";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Node-graph mark: five outer points wired to a centre. */
const LogoMark = () => {
    const outer: [number, number, number][] = [
        [50, 16, 5],
        [82, 36, 4],
        [76, 72, 5],
        [24, 72, 4],
        [18, 36, 5],
    ];

    return (
        <svg viewBox="0 0 100 100" aria-hidden="true" className="h-9 w-9 text-accent sm:h-7 sm:w-7">
            {/* Spokes */}
            {outer.map(([x, y]) => (
                <line
                    key={`s-${x}-${y}`}
                    x1="50"
                    y1="50"
                    x2={x}
                    y2={y}
                    stroke="currentColor"
                    vectorEffect="non-scaling-stroke"
                    strokeWidth="1"
                    opacity="0.45"
                />
            ))}
            {/* Perimeter */}
            {outer.map(([x, y], i) => {
                const [nx, ny] = outer[(i + 1) % outer.length];
                return (
                    <line
                        key={`p-${x}-${y}`}
                        x1={x}
                        y1={y}
                        x2={nx}
                        y2={ny}
                        stroke="currentColor"
                        vectorEffect="non-scaling-stroke"
                        strokeWidth="1"
                        opacity="0.45"
                    />
                );
            })}
            {outer.map(([x, y, r]) => (
                <circle key={`c-${x}-${y}`} cx={x} cy={y} r={r} fill="currentColor" />
            ))}
            <circle cx="50" cy="50" r="7" fill="currentColor" />
        </svg>
    );
};

/**
 * Equalizer toggle for interface sound. The bars animate only while sound is
 * on, so the control always reflects its real state. The blip is synthesised
 * with WebAudio, so there is no audio file to ship.
 */
const SoundToggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button
        type="button"
        aria-pressed={on}
        onClick={onToggle}
        className="hidden h-11 w-11 shrink-0 items-center justify-center gap-[3px] rounded-full border border-line bg-bg/40 transition-colors hover:border-accent sm:flex"
    >
        <span className="sr-only">{on ? "Turn sound off" : "Turn sound on"}</span>
        {[0, 1, 2, 3, 4].map((i) => (
            <span
                key={i}
                aria-hidden="true"
                className={`w-px origin-center transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)] ${
                    on ? "bg-accent" : "bg-muted"
                }`}
                style={
                    on
                        ? {
                              height: 12,
                              animation: `equalize ${0.7 + i * 0.12}s ease-in-out ${i * 0.08}s infinite alternate`,
                          }
                        : { height: 1 }
                }
            />
        ))}
    </button>
);

export const Navbar = ({ siteName }: { siteName?: string }) => {
    const [open, setOpen] = useState(false);
    const [sound, setSound] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const audioRef = useRef<AudioContext | null>(null);
    const pathname = usePathname();

    useEffect(() => setOpen(false), [pathname]);

    useEffect(() => {
        try {
            setSound(localStorage.getItem("ui-sound") === "on");
        } catch {
            /* private mode — stay silent */
        }
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const blip = useCallback(() => {
        if (!sound) return;
        try {
            const ctx = (audioRef.current ??= new AudioContext());
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.value = 660;
            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
            osc.connect(gain).connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.12);
        } catch {
            /* audio unavailable — silence is fine */
        }
    }, [sound]);

    const toggleSound = () => {
        setSound((s) => {
            const next = !s;
            try {
                localStorage.setItem("ui-sound", next ? "on" : "off");
            } catch {
                /* ignore */
            }
            return next;
        });
    };

    // Lock the page behind the overlay and close on Escape.
    useEffect(() => {
        if (!open) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = previous;
            window.removeEventListener("keydown", onKey);
        };
    }, [open]);

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--duration-normal)] ${
                    scrolled && !open ? "bg-bg/80 backdrop-blur-md" : "bg-transparent"
                }`}
            >
                <div className="mx-auto flex w-full max-w-[var(--container-grid)] items-center justify-between gap-8 px-[var(--gutter)] py-5 md:py-6">
                    <div className="flex items-center gap-8 lg:gap-12">
                        <Link href="/" className="flex shrink-0 items-center gap-2.5 transition-colors hover:text-accent">
                            <LogoMark />
                            <span className="sr-only text-h3 font-medium leading-none tracking-tight sm:not-sr-only">
                                {siteName || SITE.name}
                            </span>
                        </Link>

                        <p className="hidden max-w-[34ch] text-small leading-snug text-ink/80 lg:block">
                            <span className="block">3 years of experience. Custom WordPress, Shopify and Laravel builds.</span>
                            <span className="block">Production sites for e-commerce, SaaS and corporate.</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="hidden flex-col items-end gap-0.5 text-small leading-snug md:flex">
                            <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-accent">
                                {SITE.email}
                            </a>
                            <span className="text-muted">{SITE.location}</span>
                        </div>

                        <SoundToggle on={sound} onToggle={toggleSound} />

                        <Magnetic className="shrink-0" strength={0.25}>
                            <Link
                                href="#contact"
                                className="inline-flex rounded-full bg-accent px-5 py-2.5 font-mono text-label uppercase tracking-wider text-bg transition-colors hover:bg-ink md:px-7"
                            >
                                Start project
                            </Link>
                        </Magnetic>

                        <button
                            type="button"
                            aria-expanded={open}
                            aria-controls="overlay-nav"
                            onClick={() => {
                                blip();
                                setOpen((o) => !o);
                            }}
                            className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full border border-line bg-bg/40 transition-colors hover:border-accent"
                        >
                            <span className="sr-only">Toggle menu</span>
                            <span
                                aria-hidden="true"
                                className={`h-px w-4 bg-ink transition-transform duration-[var(--duration-normal)] ${
                                    open ? "translate-y-[3px] rotate-45" : ""
                                }`}
                            />
                            <span
                                aria-hidden="true"
                                className={`h-px w-4 bg-ink transition-transform duration-[var(--duration-normal)] ${
                                    open ? "-translate-y-[3px] -rotate-45" : ""
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </header>

            {/* Overlay wipes in from the top edge via clip-path, so the panel
                never moves and nothing behind it reflows. */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        id="overlay-nav"
                        initial={{ clipPath: "inset(0px 0px 100%)" }}
                        animate={{ clipPath: "inset(0px 0px 0%)" }}
                        exit={{ clipPath: "inset(0px 0px 100%)" }}
                        transition={{ duration: 0.6, ease: EASE_OUT }}
                        className="fixed inset-0 z-40 bg-bg"
                    >
                        <div className="mx-auto flex h-full w-full max-w-[var(--container-grid)] flex-col justify-between gap-10 overflow-y-auto px-[var(--gutter)] pb-10 pt-28 md:pt-32">
                            <nav aria-label="Primary">
                                <ul className="flex flex-col gap-[clamp(2px,0.5vh,10px)]">
                                    {navLinks.map((link, i) => (
                                        <motion.li
                                            key={link.name}
                                            initial={{ opacity: 0, y: 28 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.18 + i * 0.05 }}
                                        >
                                            <Link
                                                href={link.href}
                                                target={link.href.endsWith(".pdf") ? "_blank" : undefined}
                                                onClick={() => setOpen(false)}
                                                className="block text-[clamp(30px,6.2vh,64px)] font-medium leading-[1.15] transition-colors hover:text-accent"
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.18 + navLinks.length * 0.05 }}
                                className="flex shrink-0 flex-col gap-3 border-t border-line pt-6 md:flex-row md:items-center md:justify-between"
                            >
                                <p className="font-mono text-label uppercase tracking-wider text-muted">
                                    {SITE.location}
                                </p>
                                <a
                                    href={`mailto:${SITE.email}`}
                                    className="font-mono text-label uppercase tracking-wider transition-colors hover:text-accent"
                                >
                                    {SITE.email}
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
