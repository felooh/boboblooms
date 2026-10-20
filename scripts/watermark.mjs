// Stamps the Bobo Blooms badge onto gallery photos.
//
// Clean originals live in photos/<folder>/ (not published). This writes watermarked copies to
// public/images/<folder>/, which is what the site serves. It runs before `npm run dev` and `npm run build`,
// and only reprocesses photos that are new or changed since their copy was made.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const srcDir = path.join(root, "photos");
const outDir = path.join(root, "public", "images");
const badgePath = path.join(srcDir, "watermark.png");
// Records how each copy was made, so a photo is redone when its original or its UNVERIFIED status changes
const manifestPath = path.join(outDir, ".watermark.json");
const IMAGE = /\.(jpe?g|png|webp)$/i;

// Photos flagged in the 2026-10-20 review as possibly someone else's work (another business's watermark,
// a screenshot from Google or social media, etc.). They're copied without our badge, so we never brand
// another person's photo as ours. Delete each one from photos/ or, if it's genuinely ours, remove it here.
const UNVERIFIED = new Set([
  "pedestals/07.jpg",
  "pedestals/25.jpg",
  "bridal-car-decor/17.jpg",
  "bridal-car-decor/18.jpg",
  "valentines/13.jpg",
  "valentines/14.jpg",
  "valentines/31.jpg",
  "bouquets/20.jpg",
  "bouquets/21.jpg",
  "bouquets/25.jpg",
  "bouquets/32.jpg",
  "bouquets/33.jpg",
  "walkways/11.jpg",
  "center-pieces/05.jpg",
  "center-pieces/06.jpg",
  "center-pieces/21.jpg",
  "center-pieces/22.jpg",
  "center-pieces/28.jpg",
  "center-pieces/30.jpg",
  "burial-flowers/11.jpg",
  "burial-flowers/32.jpg",
  "backdrops/05.jpg",
  "backdrops/10.jpg",
  "covers/walkways.jpg",
]);

// Badge width as a share of the photo's width, with limits so it stays legible but never dominant
const BADGE_SHARE = 0.36;
const BADGE_MIN = 150;
const BADGE_MAX = 520;

function listPhotos(dir, rel = "") {
  return fs.readdirSync(path.join(dir, rel), { withFileTypes: true }).flatMap((entry) => {
    const relPath = path.join(rel, entry.name);
    if (entry.isDirectory()) return listPhotos(dir, relPath);
    // Top-level files (the badge itself) aren't gallery photos
    return rel && IMAGE.test(entry.name) ? [relPath] : [];
  });
}

async function watermark(src, out) {
  const ext = path.extname(out).slice(1).toLowerCase();
  const format = ext === "jpg" ? "jpeg" : ext;
  const image = sharp(src).rotate(); // apply camera orientation before measuring
  const { info } = await image.clone().toBuffer({ resolveWithObject: true });
  const width = Math.round(Math.min(BADGE_MAX, Math.max(BADGE_MIN, info.width * BADGE_SHARE)));
  const badge = await sharp(badgePath).resize({ width }).toBuffer({ resolveWithObject: true });
  const margin = Math.round(Math.max(8, info.width * 0.025));

  await image
    .composite([
      {
        input: badge.data,
        left: info.width - badge.info.width - margin,
        top: info.height - badge.info.height - margin,
      },
    ])
    .toFormat(format, format === "jpeg" ? { quality: 86, mozjpeg: true } : {})
    .toFile(out);
}

const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : {};
const badgeVersion = fs.statSync(badgePath).mtimeMs;
const photos = listPhotos(srcDir);
let made = 0;

async function processPhoto(rel) {
  const src = path.join(srcDir, rel);
  const out = path.join(outDir, rel);
  const key = rel.split(path.sep).join("/");
  const mode = UNVERIFIED.has(key) ? "copy" : "watermark";
  const stamp = `${mode}:${fs.statSync(src).mtimeMs}:${mode === "watermark" ? badgeVersion : ""}`;
  if (manifest[key] === stamp && fs.existsSync(out)) return;

  fs.mkdirSync(path.dirname(out), { recursive: true });
  if (mode === "copy") fs.copyFileSync(src, out);
  else await watermark(src, out);
  manifest[key] = stamp;
  made++;
}

// A few photos at a time: a full run (e.g. a fresh Vercel build) takes seconds, not most of a minute
const queue = [...photos];
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (queue.length) await processPhoto(queue.shift());
  }),
);
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 1));
console.log(`watermark: ${made} updated, ${photos.length - made} already up to date`);
