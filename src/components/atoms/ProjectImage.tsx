import Image from "next/image";

/**
 * A project's cover, with a designed stand-in when there is no screenshot.
 *
 * Three projects have no public URL to screenshot (two are behind a login, one
 * is offline). Rendering an empty <Image> there produces a broken-image icon,
 * which looks like a bug; a monogram card looks deliberate and stays honest —
 * it does not pretend to be a screenshot of something.
 */

interface ProjectImageProps {
    src?: string;
    alt: string;
    title: string;
    /** Passed through to next/image. */
    sizes?: string;
    priority?: boolean;
    /** Classes for the <Image> itself, so callers keep their hover transforms. */
    className?: string;
}

/** Up to two initials from the project name. */
const monogram = (title: string) =>
    title
        .split(/[\s&]+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase() ?? "")
        .join("");

export const ProjectImage = ({
    src,
    alt,
    title,
    sizes,
    priority,
    className = "object-cover object-top",
}: ProjectImageProps) => {
    if (src) {
        return <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={className} />;
    }

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface">
            <span
                aria-hidden="true"
                className="font-mono text-[clamp(32px,6vw,64px)] font-medium leading-none tracking-tight text-accent/70"
            >
                {monogram(title)}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                Private build
            </span>
            {/* The alt text still reaches assistive tech. */}
            <span className="sr-only">{alt}</span>
        </div>
    );
};
