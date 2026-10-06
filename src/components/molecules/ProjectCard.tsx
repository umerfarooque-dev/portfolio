import { GlassCard } from "@/components/atoms/GlassCard";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { Project } from "@/data/projects";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <GlassCard hoverEffect className="group relative overflow-hidden p-0 h-full flex flex-col">
            {/* Image Container */}
            <Link href={`/projects/${project.id}`} className="block relative aspect-video w-full overflow-hidden bg-gray-900/50">
                {project.imageUrl && project.imageUrl.startsWith('http') || project.imageUrl.startsWith('/') ? (
                    <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-surface text-muted">
                        No Image
                    </div>
                )}
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-80" />
            </Link>

            {/* Content */}
            <div className="relative flex flex-col flex-grow p-6">
                <div className="mb-4 flex items-start justify-between">
                    <div>
                        <Link href={`/projects/${project.id}`}>
                            <Heading size="md" className="group-hover:text-accent transition-colors">
                                {project.title}
                            </Heading>
                        </Link>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {project.tags?.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-surface px-2 py-0.5 text-xs font-medium text-ink/75 border border-line"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-surface p-2 text-ink transition-colors hover:bg-sky-500 hover:text-ink"
                        aria-label="Visit Live Site"
                    >
                        <ExternalLink className="h-5 w-5" />
                    </a>
                </div>

                <Text size="sm" className="text-muted flex-grow mb-4">
                    {project.description}
                </Text>

                <div className="mt-auto pt-4 border-t border-line">
                    <Link
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center text-sm font-medium text-accent hover:text-accent transition-colors"
                    >
                        View Details
                        <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Link>
                </div>
            </div>
        </GlassCard>
    );
};
