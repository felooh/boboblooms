import type { Metadata } from "next";
import { ClockIcon, MessageIcon, TruckIcon } from "@/components/Icons";
import OrderForm from "@/components/OrderForm";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { categories } from "@/lib/categories";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Order Flowers Online",
  description: `Order bouquets, wedding flowers, event decor and funeral wreaths from Bobo Blooms in Nairobi. From ${site.priceFrom}, delivered anywhere in Kenya.`,
  path: "/order",
});

const nextSteps = [
  { Icon: MessageIcon, text: "We reply on WhatsApp to confirm the design, price and delivery." },
  { Icon: ClockIcon, text: `We're open ${site.hours.short}, and you can message us any time.` },
  { Icon: TruckIcon, text: `${site.delivery}, or collect from our shop at ${site.location}.` },
];

export default async function OrderPage({ searchParams }: PageProps<"/order">) {
  const { collection } = await searchParams;
  const initial = categories.some((c) => c.slug === collection) ? String(collection) : "";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <p className="eyebrow">Order</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold sm:text-5xl">Order your flowers</h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Tell us what you need and we&apos;ll take it from there. Arrangements start from {site.priceFrom}.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
        <div className="rounded-3xl bg-sand p-5 ring-1 ring-gold/15 sm:p-8">
          <OrderForm collections={categories.map(({ slug, title }) => ({ slug, title }))} initialCollection={initial} />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl bg-gradient-to-br from-ink to-berry p-7 text-cream">
            <h2 className="font-serif text-2xl font-semibold text-gold-light">What happens next</h2>
            <ul className="mt-5 space-y-4">
              {nextSteps.map(({ Icon, text }) => (
                <li key={text} className="flex gap-3 text-sm leading-relaxed text-cream/85">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold-light" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-gold/25 p-7">
            <h2 className="font-serif text-2xl font-semibold">Prefer to just chat?</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Send us a photo of what you like, or call {site.phoneDisplay}.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-rose underline-offset-4 hover:underline"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Open WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
