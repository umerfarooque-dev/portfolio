"use client";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { useEffect, useRef } from "react";

/** A moving fabric of dots, rather than a stationary grid that only fades. */
export const FooterDots = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const reduceMotion = usePrefersReducedMotion();

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!canvas || !context) return;

        let width = 0;
        let height = 0;
        let frame = 0;
        let visible = false;
        let lastPaint = 0;
        const spacing = 18;
        const waves = [
            { x: 0.0042, y: 0.0026, speed: 0.00035, strength: 0.55 },
            { x: -0.0021, y: 0.0048, speed: 0.00052, strength: 0.3 },
            { x: 0.0075, y: -0.0034, speed: 0.00078, strength: 0.15 },
        ];
        const accent = getComputedStyle(canvas).getPropertyValue("--color-accent").trim();
        const displacement = (x: number, y: number, time: number) => waves.reduce(
            (sum, wave) => sum + Math.sin(x * wave.x + y * wave.y - time * wave.speed) * wave.strength, 0
        );

        const paint = (time: number) => {
            context.clearRect(0, 0, width, height);
            context.fillStyle = accent;
            const depth = height * 0.22;
            for (let x = -spacing; x < width + spacing; x += spacing) {
                for (let row = -depth; row < height + depth; row += spacing) {
                    const wave = reduceMotion ? 0 : displacement(x, row, time);
                    const next = reduceMotion ? 0 : displacement(x, row + spacing, time);
                    const y = row + wave * depth;
                    if (y < -spacing || y > height + spacing) continue;
                    const spread = 1 + Math.abs(next - wave) * depth / spacing * 2.2;
                    const light = reduceMotion ? 0.4 : Math.min(1, (0.55 + (wave + 1) * 0.32) / spread);
                    context.globalAlpha = 0.04 + light * 0.62;
                    context.beginPath();
                    context.arc(x, y, 0.45 + light * 1.5, 0, Math.PI * 2);
                    context.fill();
                }
            }
            context.globalAlpha = 1;
        };

        const animate = (time: number) => {
            if (time - lastPaint >= 1000 / 30) {
                paint(time);
                lastPaint = time;
            }
            frame = requestAnimationFrame(animate);
        };

        const sync = () => {
            cancelAnimationFrame(frame);
            if (visible && !document.hidden && !reduceMotion) {
                frame = requestAnimationFrame(animate);
            }
        };

        const resize = new ResizeObserver(() => {
            width = canvas.clientWidth;
            height = canvas.clientHeight;
            const ratio = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(width * ratio);
            canvas.height = Math.round(height * ratio);
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
            paint(0);
        });
        resize.observe(canvas);

        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            sync();
        }, { rootMargin: "120px" });
        observer.observe(canvas);
        document.addEventListener("visibilitychange", sync);
        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
            resize.disconnect();
            document.removeEventListener("visibilitychange", sync);
        };
    }, [reduceMotion]);

    return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-40" />;
};
