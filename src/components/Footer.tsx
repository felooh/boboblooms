import Link from "next/link";
import { PhoneIcon, PinIcon } from "./Icons";
import Logo from "./Logo";
import { categories } from "@/lib/categories";
import { site, whatsappLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t-4 border-rose bg-ink text-cream/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 text-xs tracking-[0.25em] text-blush/70 uppercase">{site.tagline}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Fresh flowers and floral decor for weddings, celebrations and remembrance.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Our work</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/gallery/${c.slug}`} className="transition-colors hover:text-gold-light">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Visit or call</p>
          <p className="mt-4 flex items-center gap-2 text-sm">
            <PinIcon className="h-4 w-4 text-gold" />
            {site.location}
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm">
            <PhoneIcon className="h-4 w-4 text-gold" />
            <a href={`tel:+${site.phoneIntl}`} className="hover:text-gold-light">
              {site.phoneDisplay}
            </a>
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-bold text-gold-light underline-offset-4 hover:underline"
          >
            Chat with us on WhatsApp →
          </a>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
