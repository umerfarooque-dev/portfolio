"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { springSnappy } from "@/lib/motion";
import type { ReactNode } from "react";

type ButtonProps = Omit<HTMLMotionProps<"button">, "ref" | "children"> & {
    children?: ReactNode;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
};

const SIZES = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
} as const;

export const Button = ({
    className,
    variant ="primary",
    size ="md",
    children,
    disabled,
    ...props
}: ButtonProps) => {
    return (
        <motion.button
            disabled={disabled}
            // Press feedback is suppressed while disabled so the control doesn't
            // feel responsive when it won't actually do anything.
            whileHover={disabled ? undefined : { scale: 1.03, y: -1 }}
            whileTap={disabled ? undefined : { scale: 0.97 }}
            transition={springSnappy}
            className={cn(
"group relative inline-flex items-center justify-center overflow-hidden rounded-sm font-medium",
"cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                SIZES[size],
                variant === "primary" &&
"border border-sky-400/25 bg-sky-500/12 text-accent backdrop-blur-sm hover:bg-accent-dim hover:shadow-[0_0_28px_rgba(56,189,248,0.28)]",
                variant === "secondary" &&
"border border-line bg-surface text-ink backdrop-blur-sm hover:border-ink/25 hover:bg-surface",
                variant === "outline" && "border border-ink/25 text-ink hover:bg-surface",
                variant === "ghost" && "text-muted hover:text-ink",
                className
            )}
            {...props}
        >
            {/* Sheen that sweeps across on hover */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
            <span className="relative inline-flex items-center justify-center gap-2">{children}</span>
        </motion.button>
    );
};
