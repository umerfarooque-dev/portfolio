import { cn } from "@/lib/utils";
import Link from "next/link";

interface LogoProps {
    className?: string;
    text?: string;
}

export const Logo = ({ className, text }: LogoProps) => {
    return (
        <Link href="/" className={cn("group relative block", className)}>
            <span className="relative z-10 block text-3xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-sky-200 to-purple-300 transition-all duration-300 group-hover:from-sky-300 group-hover:to-purple-400 font-mono">
                &lt;{text || "Umer"} /&gt;
            </span>
            {/* Liquid Glow Behind */}
            <span className="absolute -inset-2 -z-10 block rounded-full bg-sky-500/0 blur-xl transition-all duration-500 group-hover:bg-sky-500/30" />
        </Link>
    );
};
