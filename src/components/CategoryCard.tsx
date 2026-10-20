import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "./Icons";
import { type Category, getCover, getImages } from "@/lib/categories";

export default function CategoryCard({ category }: { category: Category }) {
  const cover = getCover(category.slug);
  const count = getImages(category.slug).length;

  return (
    <Link
      href={`/gallery/${category.slug}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-xl bg-sand shadow-sm ring-1 ring-ink/5 transition-shadow duration-500 hover:shadow-xl hover:shadow-ink/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:aspect-[4/5] sm:rounded-2xl"
    >
      {cover && (
        <Image
          src={cover}
          alt={category.title}
          fill
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-berry/25 to-transparent transition-opacity duration-500 group-hover:from-berry/95" />
      {count > 0 && (
        <span className="absolute top-3 right-3 rounded-full bg-cream/90 px-2.5 py-1 text-[10px] font-bold tracking-wider text-ink uppercase backdrop-blur sm:top-4 sm:right-4 sm:text-xs">
          {count} photos
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 p-3.5 text-cream sm:p-6">
        <h3 className="font-serif text-xl leading-tight font-semibold sm:text-3xl">{category.title}</h3>
        <p className="mt-1.5 hidden text-sm leading-snug text-cream/80 sm:block">{category.blurb}</p>
        <span className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] text-gold-light uppercase sm:mt-4 sm:text-xs">
          View gallery
          <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
