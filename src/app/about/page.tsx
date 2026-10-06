import { AboutSection } from "@/components/organisms/AboutSection";
import { getSiteConfig } from "@/lib/site-data";

export const revalidate = 60;

export default async function AboutPage() {
    const siteConfig = await getSiteConfig();

    return (
        <div className="pt-24">
            <AboutSection config={siteConfig} />
        </div>
    );
}
