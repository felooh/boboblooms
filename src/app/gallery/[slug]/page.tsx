import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import { ChevronIcon } from "@/components/Icons";
import JsonLd from "@/components/JsonLd";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { categories, getCategory, getCover, getImages } from "@/lib/categories";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/gallery/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return pageMetadata({
    title: category.seoTitle,
    description: `${category.blurb} Made at ${site.location}, from ${site.priceFrom}, delivered anywhere in Kenya.`,
    path: `/gallery/${slug}`,
    image: getCover(slug),
  });
}

export default async function CategoryPage({ params }: PageProps<"/gallery/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const images = getImages(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-ink-soft">
        <Link href="/gallery" className="hover:text-rose">
          Gallery
        </Link>
        <ChevronIcon className="h-3.5 w-3.5" />
        <span className="text-ink">{category.title}</span>
      </nav>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">
            {category.group}
            {images.length > 0 && <span className="text-ink-soft"> · {images.length} photos</span>}
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold sm:text-5xl">{category.title}</h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{category.intro}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/order?collection=${slug}`}
            className="inline-flex items-center rounded-full bg-gold px-6 py-3 font-bold text-ink transition-colors hover:bg-gold-light"
          >
            Order {category.title.toLowerCase()}
          </Link>
          <a
            href={whatsappLink(`Hello Bobo Blooms 👋\nI'm interested in ${category.title.toLowerCase()}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-bold text-white transition-opacity hover:opacity-90"
          >
            <WhatsAppIcon />
            Ask on WhatsApp
          </a>
        </div>
      </div>

      {images.length > 0 ? (
        <Gallery images={images} title={category.title} />
      ) : (
        <p className="mt-12 rounded-2xl bg-sand p-8 text-center text-ink-soft">
          Photos coming soon. Message us on WhatsApp to see recent work.
        </p>
      )}

      <JsonLd
        data={breadcrumbSchema([
          { name: "Gallery", path: "/gallery" },
          { name: category.title, path: `/gallery/${slug}` },
        ])}
      />
    </div>
  );
}
