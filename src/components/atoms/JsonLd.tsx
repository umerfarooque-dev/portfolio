/** Server-rendered JSON only; escaping prevents content closing the script tag. */
export const JsonLd = ({ data }: { data: Record<string, unknown> }) => (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
);
