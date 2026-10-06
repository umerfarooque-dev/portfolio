import { isShipped, projects, type Project } from "@/data/projects";

/**
 * A project earns a case study when it has the narrative fields — the problem
 * and the decision taken — rather than being hand-listed. That way adding the
 * fields to a project is all it takes to publish one.
 */
export const isCaseStudy = (project: Project) =>
    Boolean(project.challenge && project.approach && isShipped(project));

export const caseStudies: Project[] = projects.filter(isCaseStudy);

export const getCaseStudy = (slug: string) => caseStudies.find((p) => p.id === slug);
