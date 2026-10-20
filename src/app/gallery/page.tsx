import type { Metadata } from "next";
import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse Bobo Blooms bouquets, bridal flowers, pedestals, arches, backdrops, centre pieces and more.",
};

const groups = ["Wedding Decor", "Flowers"] as const;

export default function GalleryIndex() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Gallery</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold sm:text-5xl">Our work</h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Real arrangements we&apos;ve made for our customers. See something you like? Tap a photo and send it to us.
      </p>

      {groups.map((group) => (
        <section key={group} className="mt-14">
          <h2 className="border-b border-gold/40 pb-3 font-serif text-3xl font-semibold">{group}</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
            {categories
              .filter((c) => c.group === group)
              .map((c) => (
                <CategoryCard key={c.slug} category={c} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
