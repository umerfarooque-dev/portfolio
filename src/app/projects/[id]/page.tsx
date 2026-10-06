import { ProjectImage } from "@/components/atoms/ProjectImage";
import Image from "next/image";
import { getProjectRow, getSiteConfig } from "@/lib/site-data";
import { toProject } from "@/lib/db-project";
import { projects as staticProjects } from "@/data/projects";
import { Container } from "@/components/atoms/Container";
import { GlassCard } from "@/components/atoms/GlassCard";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import { ArrowLeft, ExternalLink, Calendar, User, FolderOpen, CheckCircle2 } from "lucide-react";
import Link from "next/link";


export const revalidate = 60;

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: projectId } = await params;

    const [dbProject, config] = await Promise.all([
        getProjectRow(projectId),
        getSiteConfig(),
    ]);

    // Projects that live in the static catalogue (the Shopify storefronts) have
    // no database row, so fall back to it before deciding the page is missing.
    const staticProject = staticProjects.find((p) => p.id === projectId);

    if (!dbProject && !staticProject) {
        return (
            <div className="min-h-screen flex items-center justify-center py-24">
                <Container className="text-center">
                    <Heading size="xl" className="mb-4">
                        Project Not Found
                    </Heading>
                    <Text className="mb-8">The project you&apos;re looking for doesn&apos;t exist.</Text>
                    <Link href="/projects">
                        <Button variant="primary">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Projects
                        </Button>
                    </Link>
                </Container>
            </div>
        );
    }

    // A database row wins; otherwise the project comes from the static catalogue.
    const project = dbProject ? toProject(dbProject) : staticProject!;

    return (
        <div className="min-h-screen py-24">
            <Container>
                {/* Top Actions */}
                <div className="flex items-center justify-between mb-8">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Projects</span>
                    </Link>

                </div>

                {/* Hero Section */}
                <div className="mb-12">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        {project.tags?.map((tag: string) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-xs font-medium rounded-full bg-accent-dim text-accent border border-sky-500/20"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <Heading size="xl" className="mb-4">
                        {project.title}
                    </Heading>

                    <Text size="lg" className="mb-6 max-w-3xl">
                        {project.fullDescription || project.description}
                    </Text>

                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex"
                    >
                        <Button variant="primary" className="group">
                            Visit Live Site
                            <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </a>
                </div>

                {/* Main Image */}
                <GlassCard className="p-0 mb-12 overflow-hidden relative aspect-video">
                    <ProjectImage
                        src={project.imageUrl}
                        title={project.title}
                        alt={`${project.title} screenshot`}
                        sizes="(min-width: 1024px) 60vw, 100vw"
                        priority
                    />
                </GlassCard>

                {/* Project Info Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {project.duration && (
                        <GlassCard className="p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Calendar className="h-5 w-5 text-accent" />
                                <h3 className="font-semibold text-ink">Duration</h3>
                            </div>
                            <Text>{project.duration}</Text>
                        </GlassCard>
                    )}

                    {project.role && (
                        <GlassCard className="p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <User className="h-5 w-5 text-purple-400" />
                                <h3 className="font-semibold text-ink">Role</h3>
                            </div>
                            <Text>{project.role}</Text>
                        </GlassCard>
                    )}

                    {project.category && (
                        <GlassCard className="p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <FolderOpen className="h-5 w-5 text-pink-400" />
                                <h3 className="font-semibold text-ink">Category</h3>
                            </div>
                            <Text>{project.category}</Text>
                        </GlassCard>
                    )}
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Scope */}
                        {project.scope && project.scope.length > 0 && (
                            <GlassCard className="p-8">
                                <Heading size="md" className="mb-6">
                                    Project Scope
                                </Heading>
                                <ul className="space-y-3">
                                    {project.scope.map((item: string, index: number) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                                            <Text>{item}</Text>
                                        </li>
                                    ))}
                                </ul>
                            </GlassCard>
                        )}

                        {/* Features */}
                        {project.features && project.features.length > 0 && (
                            <GlassCard className="p-8">
                                <Heading size="md" className="mb-6">
                                    Key Features
                                </Heading>
                                <ul className="space-y-3">
                                    {project.features.map((feature: string, index: number) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                                            <Text>{feature}</Text>
                                        </li>
                                    ))}
                                </ul>
                            </GlassCard>
                        )}

                        {/* Gallery */}
                        {project.gallery && project.gallery.length > 0 && (
                            <div>
                                <Heading size="md" className="mb-6">
                                    Project Gallery
                                </Heading>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {project.gallery.map((image: string, index: number) => (
                                        <GlassCard key={index} className="relative aspect-video p-0 overflow-hidden">
                                            <Image
                                                src={image}
                                                alt={`${project.title} screenshot ${index + 1}`}
                                                fill
                                                sizes="(min-width: 768px) 50vw, 100vw"
                                                className="object-cover transition-transform duration-300 hover:scale-105"
                                            />
                                        </GlassCard>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-8">
                        <GlassCard className="p-8 sticky top-24">
                            {project.techStack && project.techStack.length > 0 && (
                                <div className="mb-8 pb-8 border-b border-line">
                                    <Heading size="md" className="mb-6">
                                        Tech Stack
                                    </Heading>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech: string, index: number) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 text-sm font-medium rounded-sm bg-surface text-ink/75 border border-line hover:border-sky-500/30 transition-colors"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <Heading size="md" className="mb-4">
                                    Project Actions
                                </Heading>
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <Button variant="outline" className="w-full group">
                                        View Live Project
                                        <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </a>
                            </div>
                        </GlassCard>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-16">
                    <GlassCard className="p-12 text-center">
                        <Heading size="lg" className="mb-4">
                            {config?.projectCtaTitle || "Interested in Similar Work? "}
                        </Heading>
                        <Text className="mb-8 max-w-2xl mx-auto">
                            {config?.projectCtaText || "I'm available for freelance projects and open to new opportunities. Let's discuss how we can work together."}
                        </Text>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link href="/contact">
                                <Button variant="primary">Get in Touch</Button>
                            </Link>
                            <Link href="/projects">
                                <Button variant="outline">View More Projects</Button>
                            </Link>
                        </div>
                    </GlassCard>
                </div>
            </Container>
        </div>
    );
}
