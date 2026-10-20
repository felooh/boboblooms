import Image from "next/image";
import Link from "next/link";
import { type Category, getCover } from "@/lib/categories";

export default function CategoryCard({ category }: { category: Category }) {
  const cover = getCover(category.slug);

  return (
    <Link
      href={`/gallery/${category.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-sand"
    >
      {cover && (
        <Image
          src={cover}
          alt={category.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
        <h3 className="font-serif text-3xl font-semibold">{category.title}</h3>
        <p className="mt-1 text-sm leading-snug text-cream/80">{category.blurb}</p>
        <span className="mt-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-gold-light">
          View gallery →
        </span>
      </div>
    </Link>
  );
}
