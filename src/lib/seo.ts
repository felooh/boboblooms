import type { Metadata } from "next";
import { faqs, site } from "./site";

/**
 * Metadata for one page. Next replaces (not merges) a parent's openGraph, so every page
 * builds the full set here: canonical URL, Open Graph and Twitter card.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = "/images/og.jpg",
}: {
  title?: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : undefined;
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_KE",
      siteName: site.name,
      url: path,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}

/** schema.org Florist: name, location, hours, contact and service area for Google. */
export const floristSchema = {
  "@context": "https://schema.org",
  "@type": "Florist",
  "@id": `${site.url}/#business`,
  name: site.name,
  slogan: site.tagline,
  url: site.url,
  logo: `${site.url}/icon.png`,
  image: [`${site.url}/images/og.jpg`, `${site.url}/images/hero.jpg`],
  telephone: `+${site.phoneIntl}`,
  priceRange: `From ${site.priceFrom}`,
  currenciesAccepted: "KES",
  address: {
    "@type": "PostalAddress",
    streetAddress: "City Market",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi County",
    addressCountry: "KE",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
  ],
  areaServed: { "@type": "Country", name: "Kenya" },
  sameAs: [site.instagram],
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
