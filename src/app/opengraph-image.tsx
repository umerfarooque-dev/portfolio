import { SITE } from "@/data/site";
import { ImageResponse } from "next/og";

/**
 * The social preview card.
 *
 * Until this existed, every share of the site on WhatsApp, LinkedIn or Slack
 * rendered as a bare text link — `twitter:card` was already set to
 * `summary_large_image` with no image to show.
 *
 * Generated rather than a static file so it stays in step with `src/data/site.ts`.
 * Colours are the design tokens from globals.css, written literally because this
 * renders through Satori, which has no access to the stylesheet. Keep them in
 * sync with `--color-bg`, `--color-ink`, `--color-muted` and `--color-accent`.
 */

export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#080808";
const INK = "#f0eee8";
const MUTED = "#8a8882";
const ACCENT = "#c8ff00";

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: BG,
                    padding: 72,
                }}
            >
                {/* Accent rule, echoing the site's hairline dividers */}
                <div style={{ display: "flex", width: "100%", height: 6, background: ACCENT }} />

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            display: "flex",
                            fontSize: 26,
                            letterSpacing: 6,
                            color: ACCENT,
                            textTransform: "uppercase",
                        }}
                    >
                        {SITE.role}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            fontSize: 112,
                            fontWeight: 600,
                            color: INK,
                            lineHeight: 1,
                            letterSpacing: -3,
                            marginTop: 20,
                        }}
                    >
                        {SITE.name}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            fontSize: 30,
                            color: MUTED,
                            marginTop: 28,
                            maxWidth: 900,
                            lineHeight: 1.4,
                        }}
                    >
                        {`${SITE.experienceYears} years building WordPress, Shopify and Laravel sites that load fast and convert.`}
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 24,
                        color: MUTED,
                    }}
                >
                    <div style={{ display: "flex" }}>{SITE.location}</div>
                    <div style={{ display: "flex" }}>{SITE.email}</div>
                </div>
            </div>
        ),
        size
    );
}
