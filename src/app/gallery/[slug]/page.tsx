import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { categories, getCategory, getImages } from "@/lib/categories";
import { whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/gallery/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return { title: category.title, description: category.blurb };
}

export default async function CategoryPage({ params }: PageProps<"/gallery/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const images = getImages(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Link href="/gallery" className="text-sm text-ink-soft hover:text-rose">
        ← All collections
      </Link>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose">{category.group}</p>
          <h1 className="mt-2 font-serif text-5xl font-semibold">{category.title}</h1>
          <p className="mt-3 max-w-xl text-ink-soft">{category.blurb}</p>
        </div>
        <a
          href={whatsappLink(`Hello Bobo Blooms 👋\nI'm interested in ${category.title.toLowerCase()}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-bold text-white transition-opacity hover:opacity-90"
        >
          <WhatsAppIcon />
          Ask about {category.title.toLowerCase()}
        </a>
      </div>

      {images.length > 0 ? (
        <Gallery images={images} title={category.title} />
      ) : (
        <p className="mt-12 rounded-2xl bg-sand p-8 text-center text-ink-soft">
          Photos coming soon. Message us on WhatsApp to see recent work.
        </p>
      )}
    </div>
  );
}
