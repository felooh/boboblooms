import Image from "next/image";
import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";
import HeroPetals from "@/components/HeroPetals";
import { ArrowIcon, BagIcon, ChevronDownIcon, FlowerIcon, MessageIcon, SearchIcon } from "@/components/Icons";
import JsonLd from "@/components/JsonLd";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { categories, getImages } from "@/lib/categories";
import { faqSchema } from "@/lib/seo";
import { faqs, site, whatsappLink } from "@/lib/site";

const featured = ["bouquets", "bridal-bouquet", "pedestals", "arch-flowers", "center-pieces", "burial-flowers"];

// A sample of real photos for the "recent work" mosaic: [category, photo index]
const showcase: [string, number][] = [
  ["backdrops", 0],
  ["bouquets", 2],
  ["walkways", 1],
  ["pedestals", 3],
  ["bridal-car-decor", 1],
];

const steps = [
  { title: "Browse", text: "Look through our gallery and pick the styles you love.", Icon: SearchIcon },
  { title: "Message us", text: "Send a photo or describe what you want on WhatsApp or SMS.", Icon: MessageIcon },
  { title: "We create", text: "We confirm the details and price, then make it fresh for you.", Icon: FlowerIcon },
  { title: "Delivered", text: "We deliver anywhere in Kenya, or collect from our shop at City Market.", Icon: BagIcon },
];

const occasions = ["Weddings", "Birthdays", "Corporate events", "Anniversaries", "Valentine's", "Sympathy"];

export default function Home() {
  const photoCount = categories.reduce((n, c) => n + getImages(c.slug).length, 0);
  const mosaic = showcase
    .map(([slug, i]) => ({ slug, src: getImages(slug)[i], title: categories.find((c) => c.slug === slug)!.title }))
    .filter((m) => m.src);

  return (
    <>
      <section className="relative isolate flex min-h-[78svh] items-center overflow-hidden bg-ink text-cream">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 animate-[hero-drift_28s_ease-in-out_infinite_alternate] object-cover opacity-60"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-berry/60 to-rose/10" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-ink/70 to-transparent" />
        <HeroPetals />
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <p className="animate-[rise_0.8s_ease-out_both] text-xs font-bold tracking-[0.3em] text-gold-light uppercase">
            {site.tagline}
            <span className="hidden sm:inline"> · {site.location}</span>
          </p>
          <h1 className="mt-5 max-w-2xl animate-[rise_0.8s_0.1s_ease-out_both] font-serif text-[2.75rem] leading-[1.05] font-semibold sm:text-6xl md:text-7xl">
            Every occasion deserves a touch of <em className="font-medium text-gold-light">nature&apos;s elegance.</em>
          </h1>
          <p className="mt-6 max-w-xl animate-[rise_0.8s_0.2s_ease-out_both] text-lg leading-relaxed text-cream/85">
            Bouquets, bridal flowers, event decor and sympathy arrangements, hand-made at {site.location}. From{" "}
            {site.priceFrom}, delivered anywhere in Kenya.
          </p>
          <div className="mt-10 flex animate-[rise_0.8s_0.3s_ease-out_both] flex-wrap gap-3 sm:gap-4">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-bold text-ink shadow-lg shadow-black/20 transition-colors hover:bg-gold-light"
            >
              <WhatsAppIcon />
              Order on WhatsApp
            </a>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-7 py-3.5 font-bold backdrop-blur-sm transition-colors hover:border-gold-light hover:text-gold-light"
            >
              See our work
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="border-b border-gold/20 bg-sand">
        <dl className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-gold/25 px-4 py-7 text-center sm:px-6">
          {[
            { label: "Collections", value: categories.length },
            { label: "Photos", value: `${Math.floor(photoCount / 10) * 10}+` },
            { label: "Every piece", value: "Hand-made" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse items-center gap-1 px-2">
              <dt className="text-[10px] leading-tight font-bold tracking-[0.18em] text-ink-soft uppercase sm:text-xs">
                {stat.label}
              </dt>
              <dd className="font-serif text-xl leading-none font-semibold whitespace-nowrap text-rose lining-nums sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">What we do</p>
            <h2 className="mt-2 font-serif text-4xl font-semibold md:text-5xl">Flowers for every moment</h2>
          </div>
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-rose underline-offset-4 hover:underline"
          >
            View all {categories.length} collections
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {featured.map((slug) => {
            const category = categories.find((c) => c.slug === slug)!;
            return <CategoryCard key={slug} category={category} />;
          })}
        </div>
      </section>

      {mosaic.length === 5 && (
        <section className="bg-gradient-to-br from-ink via-[#5c1546] to-berry text-cream">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] text-gold-light uppercase">For your celebration</p>
              <h2 className="mt-2 font-serif text-4xl font-semibold md:text-5xl">Decor that sets the scene</h2>
              <p className="mt-5 max-w-md leading-relaxed text-cream/75">
                From the bridal car to the aisle, the stage and every table, we dress your venue in flowers that match
                your colours and your budget.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {occasions.map((o) => (
                  <li key={o} className="rounded-full border border-cream/20 px-4 py-1.5 text-sm text-cream/85">
                    {o}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink("Hello Bobo Blooms 👋\nI'd like a quote for event decor.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-bold text-ink transition-colors hover:bg-gold-light"
              >
                <WhatsAppIcon />
                Plan your event
              </a>
            </div>

            <div className="grid h-[28rem] grid-cols-3 grid-rows-2 gap-3 sm:h-[34rem]">
              {mosaic.map((m, i) => (
                <Link
                  key={m.src}
                  href={`/gallery/${m.slug}`}
                  className={`group relative overflow-hidden rounded-xl bg-berry ${i === 0 ? "col-span-2" : ""}`}
                >
                  <Image
                    src={m.src}
                    alt={`${m.title} by Bobo Blooms`}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-3 pt-8 text-xs font-bold tracking-wider uppercase opacity-0 transition-opacity group-hover:opacity-100">
                    {m.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <div className="text-center">
            <p className="eyebrow">How to order</p>
            <h2 className="mt-2 font-serif text-4xl font-semibold md:text-5xl">Simple, personal, fresh</h2>
          </div>
          <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <div className="absolute top-8 right-[12.5%] left-[12.5%] hidden border-t border-dashed border-gold/50 lg:block" />
            {steps.map(({ title, text, Icon }, i) => (
              <li key={title} className="relative text-center">
                <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cream text-rose shadow-sm ring-1 ring-gold/30">
                  <Icon className="h-7 w-7" />
                  <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs font-bold text-ink">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mx-auto mt-1.5 max-w-60 text-sm leading-relaxed text-ink-soft">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pt-20 sm:px-6 md:pt-24">
        <div className="text-center">
          <p className="eyebrow">Good to know</p>
          <h2 className="mt-2 font-serif text-4xl font-semibold md:text-5xl">Frequently asked questions</h2>
        </div>
        <div className="mt-10 divide-y divide-gold/25 border-y border-gold/25">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDownIcon className="h-5 w-5 shrink-0 text-rose transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-3 leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
        <JsonLd data={faqSchema} />
      </section>

      <section className="px-4 py-20 sm:px-6 md:py-24">
        <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-3xl bg-berry px-6 py-16 text-center text-cream md:py-20">
          {mosaic[1] && (
            <Image src={mosaic[1].src} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-40" />
          )}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-rose/80 via-berry/80 to-ink/90" />
          <h2 className="font-serif text-4xl font-semibold md:text-5xl">Planning something special?</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-cream/80">
            Tell us about your wedding, event or gift and we&apos;ll put together flowers that fit your style and budget.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={whatsappLink("Hello Bobo Blooms 👋\nI'd like a quote for an event.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 font-bold text-white transition-opacity hover:opacity-90"
            >
              <WhatsAppIcon />
              Get a quote
            </a>
            <Link
              href="/order"
              className="inline-flex items-center rounded-full bg-gold px-7 py-3.5 font-bold text-ink transition-colors hover:bg-gold-light"
            >
              Use our order form
            </Link>
            <a
              href={`tel:+${site.phoneIntl}`}
              className="inline-flex items-center rounded-full border border-cream/40 px-7 py-3.5 font-bold transition-colors hover:border-gold-light hover:text-gold-light"
            >
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
