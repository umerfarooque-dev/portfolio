import { ProjectsSection } from "@/components/organisms/ProjectsSection";
import { getProjects } from "@/lib/site-data";

export const revalidate = 60;

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="pt-24">
            <ProjectsSection projects={projects} />
        </div>
    );
}
