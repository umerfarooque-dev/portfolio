import { cn } from "@/lib/utils";
import { ElementType, ReactNode } from "react";

interface TextProps {
    as?: ElementType;
    children: ReactNode;
    className?: string;
    size?: "lg" | "md" | "sm";
}

export const Text = ({
    as: Component ="p",
    children,
    className,
    size ="md",
}: TextProps) => {
    return (
        <Component
            className={cn(
"text-muted leading-relaxed",
                size === "lg" && "text-lg",
                size === "md" && "text-base",
                size === "sm" && "text-sm",
                className
            )}
        >
            {children}
        </Component>
    );
};
