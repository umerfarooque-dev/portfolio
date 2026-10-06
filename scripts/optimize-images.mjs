/**
 * Re-encode everything in public/projects and public/blog as WebP.
 *
 * Screenshots arrive from the capture service as PNG (sometimes GIF) regardless
 * of the extension they are saved under. next/image trusts the extension, finds
 * a mismatch and passes the file through untouched — so a visitor downloads the
 * full-size original with no resizing at all. Re-encoding fixes both the
 * mismatch and the weight.
 *
 * Run after adding screenshots:  npm run images
 */
import { readFile, readdir, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIRS = ["public/projects", "public/blog"];
const MAX_WIDTH = 1400;
const QUALITY = 76;

const mb = (n) => (n / 1024 / 1024).toFixed(1) + "MB";

let before = 0;
let after = 0;
let count = 0;
const failed = [];

for (const dir of DIRS) {
    let files;
    try {
        files = await readdir(dir);
    } catch {
        continue; // directory not created yet
    }

    for (const file of files) {
        if (!/\.(jpe?g|png|gif)$/i.test(file)) continue;

        const from = path.join(dir, file);
        const to = path.join(dir, file.replace(/\.(jpe?g|png|gif)$/i, ".webp"));

        before += (await stat(from)).size;

        // Read into a buffer first: given a path, sharp keeps the file open and
        // Windows then refuses to unlink it.
        const input = await readFile(from);

        let output;
        try {
            // withoutEnlargement keeps a small capture from being upscaled into mush.
            output = await sharp(input)
                .resize({ width: MAX_WIDTH, withoutEnlargement: true })
                .webp({ quality: QUALITY })
                .toBuffer();
        } catch (err) {
            // A truncated or non-image download should not stop the batch.
            console.warn(`skipped ${from}: ${err.message}`);
            failed.push(from);
            continue;
        }

        await writeFile(to, output);
        if (to !== from) await unlink(from);

        after += output.length;
        count += 1;
    }
}

console.log(count ? `${count} images: ${mb(before)} -> ${mb(after)}` : "nothing to convert");
if (failed.length) console.log(`${failed.length} could not be read:`, failed.join(", "));
