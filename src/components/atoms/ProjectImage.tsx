import Image from "next/image";
import { PROJECT_IMAGE_CONTENT } from "@/data/site";
import { UNAVAILABLE_PROJECT_IMAGES } from "@/data/project-previews";

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
    loading?: "eager" | "lazy";
    /** Small pre-encoded hover captures can bypass on-demand optimization. */
    unoptimized?: boolean;
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
    loading,
    unoptimized,
    className = "object-cover object-top",
}: ProjectImageProps) => {
    if (src && !UNAVAILABLE_PROJECT_IMAGES.includes(src)) {
        return <Image src={src} alt={alt} fill priority={priority} loading={loading} unoptimized={unoptimized} sizes={sizes} className={className} />;
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
                {PROJECT_IMAGE_CONTENT.unavailable}
            </span>
            {/* The alt text still reaches assistive tech. */}
            <span className="sr-only">{alt}</span>
        </div>
    );
};
