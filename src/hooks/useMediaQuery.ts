"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribe to a CSS media query.
 *
 * `useSyncExternalStore` rather than `useState` + `useEffect`: reading a media
 * query into state inside an effect causes a second render on every mount, and
 * it never notices a change afterwards — someone toggling reduced motion, or
 * plugging in a mouse on a tablet, would keep the stale answer until reload.
 *
 * Returns `false` during server rendering, so the markup matches a first paint
 * that has not measured anything yet and hydration stays quiet.
 */
export function useMediaQuery(query: string): boolean {
    const subscribe = useCallback(
        (onChange: () => void) => {
            if (typeof window === "undefined") return () => {};
            const list = window.matchMedia(query);
            list.addEventListener("change", onChange);
            return () => list.removeEventListener("change", onChange);
        },
        [query]
    );

    const getSnapshot = useCallback(
        () => (typeof window === "undefined" ? false : window.matchMedia(query).matches),
        [query]
    );

    return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** Convenience wrapper for the setting the whole site honours. */
export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
