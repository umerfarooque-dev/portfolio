import dynamic from "next/dynamic";
import { getSiteConfig } from "@/lib/site-data";
import { getHeroSlides } from "@/lib/hero-slides";
import { HeroSection } from "@/components/organisms/HeroSection";
import { BrandsStrip } from "@/components/organisms/BrandsStrip";

const ServicesSection = dynamic(() => import("@/components/organisms/ServicesSection").then((m) => m.ServicesSection));
const ProcessSection = dynamic(() => import("@/components/organisms/ProcessSection").then((m) => m.ProcessSection));
const WorkSection = dynamic(() => import("@/components/organisms/WorkSection").then((m) => m.WorkSection));
const ShowcaseSection = dynamic(() => import("@/components/organisms/ShowcaseSection").then((m) => m.ShowcaseSection));
const BlogPreviewSection = dynamic(() => import("@/components/organisms/BlogPreviewSection").then((m) => m.BlogPreviewSection));
const ApproachSection = dynamic(() => import("@/components/organisms/ApproachSection").then((m) => m.ApproachSection));
const TestimonialsSection = dynamic(() => import("@/components/organisms/TestimonialsSection").then((m) => m.TestimonialsSection));
const AboutSection = dynamic(() => import("@/components/organisms/AboutSection").then((m) => m.AboutSection));
const TechStack = dynamic(() => import("@/components/organisms/TechStack").then((m) => m.TechStack));
const FaqSection = dynamic(() => import("@/components/organisms/FaqSection").then((m) => m.FaqSection));
const ContactSection = dynamic(() => import("@/components/organisms/ContactSection").then((m) => m.ContactSection));

export const revalidate = 3600;

export default async function Home() {
  const siteConfig = await getSiteConfig();

  const heroSlides = getHeroSlides();

  return (
    <>
      <HeroSection config={siteConfig} slides={heroSlides} />
      <BrandsStrip />
      <WorkSection />
      <ServicesSection />
      <ProcessSection />
      <ApproachSection />
      <TestimonialsSection />
      <ShowcaseSection />
      <TechStack />
      <AboutSection config={siteConfig} />
      <FaqSection />
      <BlogPreviewSection />
      <ContactSection />
    </>
  );
}
