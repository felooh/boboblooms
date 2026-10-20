import "server-only";
import fs from "node:fs";
import path from "node:path";

export type Category = {
  slug: string;
  title: string;
  group: "Wedding Decor" | "Flowers";
  blurb: string;
  /** Page title for search results, phrased the way people search */
  seoTitle: string;
  /** A short paragraph shown under the heading and used as unique page copy */
  intro: string;
};

export const categories: Category[] = [
  {
    slug: "bouquets",
    title: "Bouquets",
    group: "Flowers",
    blurb: "Hand-tied bouquets designed around your colours, budget and occasion.",
    seoTitle: "Flower Bouquets in Nairobi",
    intro:
      "Fresh, hand-tied bouquets for birthdays, anniversaries, graduations, thank-yous and just-because moments. Pick roses, mixed seasonal stems or a bouquet styled around one colour, and we'll wrap it to suit the occasion. Bouquets start from KES 1,000, and we deliver anywhere in Kenya or you can collect from our shop at City Market, Nairobi.",
  },
  {
    slug: "bridal-bouquet",
    title: "Bridal Bouquets",
    group: "Wedding Decor",
    blurb: "Bouquets for the bride and her party, made to match the day.",
    seoTitle: "Bridal Bouquets in Nairobi",
    intro:
      "Your bridal bouquet will be in every photo, so we design it around your dress, colours and wedding theme. Ask us about matching flowers for your bridesmaids and the rest of the wedding party. Send us your inspiration on WhatsApp and we'll put together a set made fresh for your wedding day, delivered anywhere in Kenya.",
  },
  {
    slug: "bridal-car-decor",
    title: "Bridal Car Decor",
    group: "Wedding Decor",
    blurb: "Floral dressing for the wedding car, from bonnet sprays to ribbons.",
    seoTitle: "Wedding Car Decoration in Nairobi",
    intro:
      "Make an entrance with a wedding car dressed in fresh flowers. We decorate bonnets, bumpers, doors and mirrors with floral sprays, bows and ribbons that match your wedding colours. Tell us the car and your theme, and we'll design decor that looks beautiful in photos and stays secure on the road.",
  },
  {
    slug: "pedestals",
    title: "Pedestals",
    group: "Flowers",
    blurb: "Tall statement arrangements for venues, stages and entrances.",
    seoTitle: "Flower Pedestal Arrangements in Nairobi",
    intro:
      "Pedestal arrangements are tall, full statement pieces that fill a space with colour. They're popular for wedding venues, church altars, stages, hotel lobbies, corporate events and memorial services. We build them in any colour scheme, from classic red and white roses to bright mixed blooms, and deliver and set up across Kenya.",
  },
  {
    slug: "arch-flowers",
    title: "Arch Flowers",
    group: "Flowers",
    blurb: "Floral arches that frame the aisle, the vows and the photos.",
    seoTitle: "Wedding Flower Arches in Nairobi",
    intro:
      "A floral arch frames the most important moments of your wedding: the walk down the aisle, the vows and the photos afterwards. We design full or asymmetric arches with roses, greenery and seasonal flowers to suit garden, church and hall weddings. Share your venue and colours with us for a quote.",
  },
  {
    slug: "walkways",
    title: "Walkways",
    group: "Flowers",
    blurb: "Aisle and walkway flowers that lead guests in style.",
    seoTitle: "Wedding Aisle and Walkway Flowers in Nairobi",
    intro:
      "Line the aisle or entrance with flowers that guide guests to the celebration. We create walkway decor with floral stands, petals and greenery for weddings, receptions and special events, designed to match the rest of your flowers and your venue.",
  },
  {
    slug: "backdrops",
    title: "Backdrops",
    group: "Flowers",
    blurb: "Flower walls and backdrops for head tables, photos and stages.",
    seoTitle: "Flower Walls and Event Backdrops in Nairobi",
    intro:
      "Flower walls and floral backdrops make a stunning setting for the head table, the stage or a photo corner. We design backdrops with fresh flowers, drapes, lights and greenery for weddings, ruracio and traditional ceremonies, birthdays, baby showers and corporate launches.",
  },
  {
    slug: "center-pieces",
    title: "Centre Pieces",
    group: "Flowers",
    blurb: "Table arrangements for weddings, dinners and corporate events.",
    seoTitle: "Table Centrepieces in Nairobi",
    intro:
      "Centrepieces bring your theme to every guest table. We make low and tall arrangements for wedding receptions, gala dinners, corporate events and parties, in your colours and to your budget. Tell us the number of tables and your theme, and we'll quote for the full set.",
  },
  {
    slug: "valentines",
    title: "Valentines",
    group: "Flowers",
    blurb: "Roses and romantic arrangements for Valentine's Day and beyond.",
    seoTitle: "Valentine's Flowers and Roses in Nairobi",
    intro:
      "Say it with roses. We make romantic bouquets and arrangements for Valentine's Day, anniversaries and surprises. Order early for Valentine's Day on WhatsApp, and we'll deliver anywhere in Kenya or have it ready for you to collect at City Market.",
  },
  {
    slug: "burial-flowers",
    title: "Burial Flowers",
    group: "Flowers",
    blurb: "Wreaths and sympathy flowers to honour and comfort.",
    seoTitle: "Funeral Wreaths and Burial Flowers in Nairobi",
    intro:
      "We make funeral wreaths, casket sprays, crosses, hearts and sympathy arrangements to honour a loved one with dignity. Tell us the colours, the message for the card and the date of the service, and we'll take care of the rest. We deliver to homes, churches and funeral venues anywhere in Kenya.",
  },
  {
    slug: "assorted-flowers",
    title: "Assorted Flowers",
    group: "Flowers",
    blurb: "Mixed seasonal stems, loose or arranged.",
    seoTitle: "Fresh Assorted Flowers in Nairobi",
    intro:
      "Fresh mixed flowers, sold loose or arranged, for your home, office, events or your own floral projects. Ask us what's in season this week at our City Market shop, or message us on WhatsApp for prices and delivery anywhere in Kenya.",
  },
  {
    slug: "chrysanthemums",
    title: "Chrysanthemums",
    group: "Flowers",
    blurb: "Long-lasting chrysanthemums in a range of colours.",
    seoTitle: "Chrysanthemums in Nairobi",
    intro:
      "Chrysanthemums are cheerful, long-lasting flowers that come in white, yellow, pink, purple and more. They're a great choice for bouquets, sympathy arrangements, events and brightening up a home or office. Available loose or arranged from our shop at City Market, with delivery anywhere in Kenya.",
  },
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
