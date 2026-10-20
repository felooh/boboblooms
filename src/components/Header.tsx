"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import { BagIcon } from "./Icons";

const nav = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-rose/20 bg-gradient-to-r from-ink/95 via-ink/95 to-berry/95 text-cream backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" aria-label="Bobo Blooms home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm uppercase tracking-[0.18em] transition-colors hover:text-gold-light ${
                isActive(item.href) ? "text-gold-light" : "text-cream/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/order"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2 text-sm font-bold text-ink transition-colors hover:bg-gold-light"
          >
            <BagIcon className="h-4 w-4" />
            Order now
          </Link>
        </nav>

        <button
          type="button"
          className="p-2 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-cream/10 px-4 pb-4 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block py-3 text-sm uppercase tracking-[0.18em] ${
                isActive(item.href) ? "text-gold-light" : "text-cream/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/order"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-ink"
          >
            <BagIcon className="h-4 w-4" />
            Order now
          </Link>
        </nav>
      )}
    </header>
  );
}
