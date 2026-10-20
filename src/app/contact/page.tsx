import type { Metadata } from "next";
import Image from "next/image";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Visit Bobo Blooms at ${site.location} or reach us on WhatsApp or SMS at ${site.phoneDisplay}.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose">Contact us</p>
      <h1 className="mt-2 font-serif text-5xl font-semibold">We&apos;d love to hear from you</h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Visit us for all your floral needs, or reach out on WhatsApp or SMS. We&apos;re here to help make your day more
        beautiful.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-sand p-8">
          <p className="text-3xl">📍</p>
          <h2 className="mt-3 font-serif text-2xl font-semibold">Visit</h2>
          <p className="mt-1 text-ink-soft">{site.location}</p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=City+Market+Nairobi"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-bold text-rose underline-offset-4 hover:underline"
          >
            Get directions →
          </a>
        </div>

        <div className="rounded-2xl bg-sand p-8">
          <p className="text-3xl">📞</p>
          <h2 className="mt-3 font-serif text-2xl font-semibold">Call or SMS</h2>
          <a href={`tel:+${site.phoneIntl}`} className="mt-1 block text-ink-soft hover:text-rose">
            {site.phoneDisplay}
          </a>
          <a
            href={`sms:+${site.phoneIntl}`}
            className="mt-4 inline-block text-sm font-bold text-rose underline-offset-4 hover:underline"
          >
            Send an SMS →
          </a>
        </div>

        <div className="rounded-2xl bg-ink p-8 text-cream">
          <WhatsAppIcon className="h-8 w-8 text-whatsapp" />
          <h2 className="mt-3 font-serif text-2xl font-semibold text-gold-light">WhatsApp</h2>
          <p className="mt-1 text-cream/70">The fastest way to order. Send us photos of what you like.</p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-bold text-white"
          >
            <WhatsAppIcon />
            Start a chat
          </a>
        </div>
      </div>

      <figure className="mt-12 overflow-hidden rounded-2xl">
        <Image
          src="/images/city-market.jpg"
          alt="Nairobi City Market building"
          width={782}
          height={765}
          sizes="(min-width: 1152px) 1104px, 100vw"
          className="h-72 w-full object-cover md:h-96"
        />
        <figcaption className="bg-sand px-6 py-4 text-sm text-ink-soft">
          Find us inside City Market, Nairobi CBD.
        </figcaption>
      </figure>
    </div>
  );
}
