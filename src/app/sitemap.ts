import type { MetadataRoute } from "next";
import { categories, getImages } from "@/lib/categories";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/gallery`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.7 },
    ...categories.map((c) => ({
      url: `${site.url}/gallery/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: getImages(c.slug).map((src) => `${site.url}${src}`),
    })),
  ];
}
