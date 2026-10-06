"use client";

import { ScrollTrigger, gsap } from "@/lib/gsap";
import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Lenis smooth scrolling, driving GSAP's ScrollTrigger.
 *
 * Lenis moves the real scroll position rather than transforming a wrapper, so
 * `position: sticky` and anchor links keep working. ScrollTrigger is told to
 * update on every Lenis frame and its own ticker is used to step Lenis, which
 * keeps pinned sections from lagging a frame behind the scroll.
 *
 * Anyone who asked for reduced motion gets native scrolling instead.
 */
export const SmoothScroll = () => {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const lenis = new Lenis({
            duration: 1.1,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 1.6,
        });

        lenis.on("scroll", ScrollTrigger.update);

        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        // Anchors go through Lenis so they ease rather than jump.
        const onClick = (e: MouseEvent) => {
            const link = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]');
            if (!link) return;
            const id = link.getAttribute("href");
            if (!id || id === "#") return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            lenis.scrollTo(target as HTMLElement, { offset: -80 });
        };
        document.addEventListener("click", onClick);

        ScrollTrigger.refresh();

        return () => {
            document.removeEventListener("click", onClick);
            gsap.ticker.remove(tick);
            lenis.destroy();
        };
    }, []);

    return null;
};
