/** Run after npm run build to check the SEO actually emitted in production HTML. */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = ".next/server/app";
const files = fs.readdirSync(root, { recursive: true }).filter(file => file.endsWith(".html") && !file.startsWith("_"));
const counts = { pages: 0, jsonLdBlocks: 0, profiles: 0, articles: 0, services: 0 };
const decode = value => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
const canonicalUrls = new Set();

function meta(html, key) {
    for (const match of html.matchAll(/<meta\b[^>]*>/g)) {
        const attributes = Object.fromEntries([...match[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map(attribute => [attribute[1], decode(attribute[2])]));
        if (attributes.name === key || attributes.property === key) return attributes.content;
    }
}

for (const file of files) {
    const html = fs.readFileSync(path.join(root, file), "utf8");
    const canonical = decode(html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/)?.[1] || "");
    assert(canonical, `${file}: canonical`);
    canonicalUrls.add(new URL(canonical).href);
    const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "");
    assert(title, `${file}: title`);
    assert.equal(meta(html, "og:url"), canonical, `${file}: share URL`);
    assert.equal(meta(html, "og:title"), title, `${file}: Open Graph title`);
    assert.equal(meta(html, "twitter:title"), title, `${file}: Twitter title`);
    assert.equal(meta(html, "description"), meta(html, "og:description"), `${file}: description`);
    assert(meta(html, "og:image"), `${file}: share image`);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${file}: one h1`);

    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
    assert(blocks.length, `${file}: JSON-LD`);
    counts.jsonLdBlocks += blocks.length;
    const nodes = blocks.flatMap(block => block["@graph"] || [block]);
    assert(nodes.some(node => node["@type"] === "Person"), `${file}: Person`);
    assert(nodes.some(node => node["@type"] === "WebSite"), `${file}: WebSite`);
    if (file === "about.html") {
        assert(nodes.some(node => node["@type"] === "ProfilePage"));
        counts.profiles++;
    }
    if (file.startsWith(`blog${path.sep}`)) {
        const article = nodes.find(node => node["@type"] === "BlogPosting");
        assert(article, `${file}: article`);
        assert.equal(article.mainEntityOfPage, canonical);
        assert(article.author.url.endsWith("/about"));
        assert(nodes.some(node => node["@type"] === "BreadcrumbList"));
        counts.articles++;
    }
    if (file.startsWith(`services${path.sep}`)) {
        assert(nodes.some(node => node["@type"] === "Service"));
        assert(nodes.some(node => node["@type"] === "BreadcrumbList"));
        counts.services++;
    }
    if (file === "projects.html") assert(meta(html, "robots").includes("noindex"));
    counts.pages++;
}

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml.body"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(decode(match[1])).href);
assert.equal(new Set(urls).size, urls.length, "No duplicate sitemap URLs");
for (const url of urls) assert(canonicalUrls.has(url), `Missing sitemap canonical: ${url}`);
console.log(JSON.stringify({ ...counts, sitemapCanonicalUrls: urls.length }, null, 2));
