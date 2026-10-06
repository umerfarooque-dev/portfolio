import type { NextConfig } from "next";

/**
 * Security headers.
 *
 * The CSP allows 'unsafe-inline' for styles because Tailwind and next/image
 * both emit inline style attributes, and 'unsafe-inline'/'unsafe-eval' for
 * scripts because Next's dev overlay and GSAP's ticker need them. Tightening
 * this to a nonce-based policy is worth doing once the content settles.
 */
const securityHeaders = [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-DNS-Prefetch-Control", value: "on" },
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
    },
    {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
    },
    {
        key: "Content-Security-Policy",
        value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com data:",
            "img-src 'self' data: blob: https://res.cloudinary.com",
            "connect-src 'self'",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "object-src 'none'",
        ].join("; "),
    },
];

const nextConfig: NextConfig = {
    poweredByHeader: false,

    // The static catalogue is served from /public. CMS uploads live on
    // Cloudinary, so that one host is allowed explicitly — a wildcard pattern
    // would turn the optimizer into an open proxy anyone could point at any
    // host and bill to this deployment.
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
        ],
        formats: ["image/avif", "image/webp"],
    },

    async headers() {
        return [{ source: "/:path*", headers: securityHeaders }];
    },
};

export default nextConfig;
