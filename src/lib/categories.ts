import "server-only";
import fs from "node:fs";
import path from "node:path";

export type Category = {
  slug: string;
  title: string;
  group: "Wedding Decor" | "Flowers";
  blurb: string;
};

export const categories: Category[] = [
  { slug: "bouquets", title: "Bouquets", group: "Flowers", blurb: "Hand-tied bouquets designed around your colours, budget and occasion." },
  { slug: "bridal-bouquet", title: "Bridal Bouquets", group: "Wedding Decor", blurb: "Bouquets for the bride and her party, made to match the day." },
  { slug: "bridal-car-decor", title: "Bridal Car Decor", group: "Wedding Decor", blurb: "Floral dressing for the wedding car, from bonnet sprays to ribbons." },
  { slug: "pedestals", title: "Pedestals", group: "Flowers", blurb: "Tall statement arrangements for venues, stages and entrances." },
  { slug: "arch-flowers", title: "Arch Flowers", group: "Flowers", blurb: "Floral arches that frame the aisle, the vows and the photos." },
  { slug: "walkways", title: "Walkways", group: "Flowers", blurb: "Aisle and walkway flowers that lead guests in style." },
  { slug: "backdrops", title: "Backdrops", group: "Flowers", blurb: "Flower walls and backdrops for head tables, photos and stages." },
  { slug: "center-pieces", title: "Centre Pieces", group: "Flowers", blurb: "Table arrangements for weddings, dinners and corporate events." },
  { slug: "valentines", title: "Valentines", group: "Flowers", blurb: "Roses and romantic arrangements for Valentine's Day and beyond." },
  { slug: "burial-flowers", title: "Burial Flowers", group: "Flowers", blurb: "Wreaths and sympathy flowers to honour and comfort." },
  { slug: "assorted-flowers", title: "Assorted Flowers", group: "Flowers", blurb: "Mixed seasonal stems, loose or arranged." },
  { slug: "chrysanthemums", title: "Chrysanthemums", group: "Flowers", blurb: "Long-lasting chrysanthemums in a range of colours." },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;

/** Photos for a category: every image in public/images/<slug>/, sorted by filename. */
export function getImages(slug: string): string[] {
  const dir = path.join(process.cwd(), "public", "images", slug);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXT.test(f))
    .sort()
    .map((f) => `/images/${slug}/${f}`);
}

/** Card image for a category: public/images/covers/<slug>.jpg if present, else its first photo. */
export function getCover(slug: string) {
  const cover = `/images/covers/${slug}.jpg`;
  if (fs.existsSync(path.join(process.cwd(), "public", cover))) return cover;
  return getImages(slug)[0];
}
