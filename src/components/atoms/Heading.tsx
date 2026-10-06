import { cn } from "@/lib/utils";
import { ElementType, ReactNode } from "react";

interface HeadingProps {
    as?: ElementType;
    children: ReactNode;
    className?: string;
    size?: "xl" | "lg" | "md" | "sm";
}

export const Heading = ({
    as: Component ="h2",
    children,
    className,
    size ="lg",
}: HeadingProps) => {
    return (
        <Component
            className={cn(
"font-bold text-ink tracking-tight",
                size === "xl" && "text-4xl md:text-5xl lg:text-6xl",
                size === "lg" && "text-3xl md:text-4xl",
                size === "md" && "text-2xl md:text-3xl",
                size === "sm" && "text-xl md:text-2xl",
                className
            )}
        >
            {children}
        </Component>
    );
};
