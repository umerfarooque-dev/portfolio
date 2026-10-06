"use client";

import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

/**
 * Site-wide motion settings.
 *
 * `reducedMotion="user"` makes Framer Motion honour the OS setting: transform
 * and layout animations are skipped for anyone who asked for reduced motion,
 * while opacity and colour still cross-fade so the UI does not snap.
 */
export const MotionProvider = ({ children }: { children: ReactNode }) => (
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
);
