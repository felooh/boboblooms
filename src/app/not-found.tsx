import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { whatsappLink } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6 md:py-32">
      <LogoMark className="h-24 w-auto animate-[rise_0.8s_ease-out_both]" />
      <p className="eyebrow mt-6">Page not found</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold sm:text-5xl">This bloom has wilted</h1>
      <p className="mt-4 leading-relaxed text-ink-soft">
        The page you&apos;re looking for has moved or no longer exists. Our flowers are still fresh, though.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/gallery"
          className="inline-flex items-center rounded-full bg-gold px-7 py-3.5 font-bold text-ink transition-colors hover:bg-gold-light"
        >
          See our work
        </Link>
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-ink/20 px-7 py-3.5 font-bold transition-colors hover:border-rose hover:text-rose"
        >
          Go home
        </Link>
      </div>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-rose underline-offset-4 hover:underline"
      >
        <WhatsAppIcon className="h-4 w-4" />
        Or ask us on WhatsApp
      </a>
    </div>
  );
}
