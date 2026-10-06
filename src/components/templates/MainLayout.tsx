import { Footer } from "@/components/organisms/Footer";
import { Navbar } from "@/components/organisms/Navbar";
import { ScrollProgress } from "@/components/atoms/ScrollProgress";
import { Cursor } from "@/components/atoms/Cursor";
import { Loader } from "@/components/organisms/Loader";
import { FloatingWhatsApp } from "@/components/molecules/FloatingWhatsApp";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { getSiteConfig } from "@/lib/site-data";
import { ReactNode } from "react";

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout = async ({ children }: MainLayoutProps) => {
    // Deduped and failure-tolerant: see src/lib/site-data.ts. Navbar and Footer
    // both accept a null config and fall back to src/data/site.ts.
    const config = await getSiteConfig();

    return (
        <MotionProvider>
            <div className="flex flex-1 flex-col">
                <Loader />
                <Cursor />
                <SmoothScroll />
                <ScrollProgress />
                <Navbar siteName={config?.siteName} />
                <main id="main" className="flex-1">{children}</main>
                <Footer config={config} />
                <FloatingWhatsApp />
            </div>
        </MotionProvider>
    );
};
