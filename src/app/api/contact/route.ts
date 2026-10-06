import { SITE } from "@/data/site";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

/** Where submissions land. Falls back to the address shown on the site. */
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? SITE.email;
/** Resend requires a verified sender; its sandbox address is the default. */
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

/**
 * Caps exist because this endpoint is public and unauthenticated: without them
 * a single request can post megabytes, and the whole body ends up in an email.
 */
const contactSchema = z.object({
    name: z.string().trim().max(120).optional(),
    email: z.string().trim().email("Enter a valid email address").max(254),
    // The form sends a subject. Zod strips unknown keys silently, so leaving this
    // out of the schema meant the visitor typed one and it never reached the inbox.
    subject: z.string().trim().max(200).optional(),
    message: z.string().trim().min(1, "Message cannot be empty").max(5000),
});

/**
 * Per-IP throttle.
 *
 * In-memory, so on serverless it is per instance and resets on cold start —
 * it blunts casual abuse and accidental double-submits, and is not a substitute
 * for an edge rate limiter if this ever gets real traffic.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
    if (recent.length >= MAX_PER_WINDOW) {
        hits.set(ip, recent);
        return true;
    }
    recent.push(now);
    hits.set(ip, recent);

    // Keep the map from growing without bound on a long-lived instance.
    if (hits.size > 5000) {
        for (const [key, times] of hits) {
            if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
        }
    }
    return false;
}

/**
 * Submitted text goes into an HTML email. Without escaping, anyone could post
 * markup — a fake "reset your password" link, say — and it would render as real
 * HTML in the inbox.
 */
const escapeHtml = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

/** Collapses newlines so submitted text cannot shape the subject header. */
const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export async function POST(request: Request) {
    try {
        const ip =
            request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            request.headers.get("x-real-ip") ||
            "unknown";

        // Validate before throttling. Checking the limit first meant a visitor who
        // mistyped their email three times was locked out for a minute without ever
        // having sent anything. Rejected input costs a JSON parse, nothing more.
        const parsed = contactSchema.safeParse(await request.json());
        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues[0]?.message ?? "Please check the form and try again." },
                { status: 400 }
            );
        }

        if (rateLimited(ip)) {
            return NextResponse.json(
                { error: "Too many messages. Please wait a minute and try again." },
                { status: 429 }
            );
        }

        const { name, email, subject, message } = parsed.data;

        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.error("RESEND_API_KEY is not set");
            return NextResponse.json(
                { error: "Email is not configured on this deployment." },
                { status: 503 }
            );
        }

        const sender = name || email;
        const resend = new Resend(apiKey);
        const { error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: TO_EMAIL,
            // Header injection is not possible here (Resend builds the headers),
            // but newlines in a subject are still worth stripping.
            subject: oneLine(
                subject
                    ? `Portfolio: ${subject} — from ${sender}`
                    : `Portfolio contact from ${sender}`
            ),
            replyTo: email,
            text:
                `Name: ${name ?? "(not provided)"}\n` +
                `Email: ${email}\n` +
                `Subject: ${subject ?? "(not provided)"}\n\n` +
                `Message:\n${message}`,
            html: `
                <p><strong>Name:</strong> ${escapeHtml(name ?? "(not provided)")}</p>
                <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                <p><strong>Subject:</strong> ${escapeHtml(subject ?? "(not provided)")}</p>
                <hr />
                <p><strong>Message:</strong></p>
                <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
            `,
        });

        if (error) {
            // Log the provider's reason, but do not hand it to the caller —
            // it can name the account and the sending domain.
            console.error("Resend error:", error);
            return NextResponse.json(
                { error: "Could not send the message. Please try again." },
                { status: 502 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error("Contact API error:", e);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
