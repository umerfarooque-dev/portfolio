import type { Metadata } from "next";
import { Inter, DM_Mono } from "next/font/google";
import { MainLayout } from "@/components/templates/MainLayout";
import { SITE_URL } from "@/data/site";
import { SEO_CONTENT, WEBSITE_SCHEMA } from "@/data/seo";
import { JsonLd } from "@/components/atoms/JsonLd";
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

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  title: SEO_CONTENT.title,
  description: SEO_CONTENT.description,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: SEO_CONTENT.title,
    description: SEO_CONTENT.description,
    url: siteUrl,
    siteName: SEO_CONTENT.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_CONTENT.title,
    description: SEO_CONTENT.description,
  },
  robots: { index: true, follow: true },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
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
        <JsonLd data={WEBSITE_SCHEMA} />
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
