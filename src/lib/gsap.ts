"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * One place that registers GSAP plugins, so every component importing from here
 * gets the same instance and ScrollTrigger is only registered once.
 *
 * Guarded for SSR: ScrollTrigger touches `document` at registration time.
 */
// registerPlugin is idempotent, so calling it on every import is safe.
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/** Matches the site's --ease-out, cubic-bezier(.16, 1, .3, 1). */
export const EASE_OUT_CSS = "power4.out";

/** Matches --ease-in-out, cubic-bezier(.76, 0, .24, 1). */
export const EASE_IN_OUT_CSS = "power4.inOut";
