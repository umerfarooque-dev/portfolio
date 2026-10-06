import type { Metadata } from "next";
import { Inter, DM_Mono } from "next/font/google";
import { MainLayout } from "@/components/templates/MainLayout";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://umer-porfolio.vercel.app";

export const metadata: Metadata = {
  title: "Umer Farooque | Full Stack Developer",
  description: "Portfolio of Umer Farooque, a Full Stack Developer building fast, scalable web apps - from Laravel backends to React/Next.js frontends.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Umer Farooque | Full Stack Developer",
    description: "Portfolio of Umer Farooque, a Full Stack Developer building fast, scalable web apps - from Laravel backends to React/Next.js frontends.",
    url: siteUrl,
    siteName: "Umer Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Umer Farooque | Full Stack Developer",
    description: "Portfolio of Umer Farooque, a Full Stack Developer building fast, scalable web apps - from Laravel backends to React/Next.js frontends.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Without JS the word-reveal spans would stay at opacity 0 */}
        <noscript>
          {/* Without JS the word-reveal spans stay at 0 and the loader never closes. */}
          <style>{`[data-animate]{opacity:1 !important}[data-loader]{display:none !important}`}</style>
        </noscript>
      </head>
      <body
        className={`${inter.variable} ${dmMono.variable} flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-bg text-ink antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
