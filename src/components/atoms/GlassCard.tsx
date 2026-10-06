import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const GlassCard = ({ children, className, hoverEffect = false }: GlassCardProps) => {
    return (
        <div
            className={cn(
"glass rounded-sm p-6 transition-all duration-300",
                hoverEffect && "glass-hover cursor-pointer",
                className
            )}
        >
            {/* Liquid refraction overlay */}
            <div className="absolute inset-0 -z-10 rounded-sm bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            {children}
        </div>
    );
};
