import Image from "next/image";
import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { categories } from "@/lib/categories";
import { site, whatsappLink } from "@/lib/site";

const featured = ["bouquets", "bridal-bouquet", "pedestals", "arch-flowers", "center-pieces", "burial-flowers"];

const steps = [
  { title: "Browse", text: "Look through our gallery and pick the styles you love." },
  { title: "Message us", text: "Send a photo or describe what you want on WhatsApp or SMS." },
  { title: "We create", text: "We confirm the details and price, then make it fresh for you." },
  { title: "Collect", text: "Pick up at City Market, or ask us about delivery to your event." },
];

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-cream">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover opacity-45"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-36">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-light">{site.tagline}</p>
          <h1 className="mt-4 max-w-2xl font-serif text-5xl leading-[1.05] font-semibold md:text-7xl">
            Every occasion deserves a touch of nature&apos;s elegance.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-cream/80">
            Bouquets, bridal flowers, event decor and sympathy arrangements, hand-made at {site.location}.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-bold text-ink transition-colors hover:bg-gold-light"
            >
              <WhatsAppIcon />
              Order on WhatsApp
            </a>
            <Link
              href="/gallery"
              className="inline-flex items-center rounded-full border border-cream/40 px-7 py-3.5 font-bold transition-colors hover:border-gold-light hover:text-gold-light"
            >
              See our work
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose">What we do</p>
            <h2 className="mt-2 font-serif text-4xl font-semibold md:text-5xl">Flowers for every moment</h2>
          </div>
          <Link href="/gallery" className="text-sm font-bold text-rose underline-offset-4 hover:underline">
            View all {categories.length} collections →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((slug) => {
            const category = categories.find((c) => c.slug === slug)!;
            return <CategoryCard key={slug} category={category} />;
          })}
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose">How to order</p>
          <h2 className="mt-2 font-serif text-4xl font-semibold md:text-5xl">Simple, personal, fresh</h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="rounded-2xl bg-cream p-6">
                <span className="font-serif text-5xl text-gold">{i + 1}</span>
                <h3 className="mt-2 text-lg font-bold">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h2 className="font-serif text-4xl font-semibold md:text-5xl">Planning something special?</h2>
        <p className="mx-auto mt-4 max-w-xl text-ink-soft">
          Tell us about your wedding, event or gift and we&apos;ll put together flowers that fit your style and budget.
        </p>
        <a
          href={whatsappLink("Hello Bobo Blooms 👋\nI'd like a quote for an event.")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 font-bold text-white transition-opacity hover:opacity-90"
        >
          <WhatsAppIcon />
          Get a quote
        </a>
      </section>
    </>
  );
}
