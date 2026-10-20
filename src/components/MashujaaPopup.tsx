"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CloseIcon } from "./Icons";
import { LogoMark } from "./Logo";
import WhatsAppIcon from "./WhatsAppIcon";
import { whatsappLink } from "@/lib/site";

// Mashujaa Day (Heroes' Day). The poster shows only on this date, Nairobi time.
const SHOW_ON = "2026-10-20";
const SEEN_KEY = `mashujaa-${SHOW_ON}-seen`;

function todayInNairobi() {
  // en-CA formats as YYYY-MM-DD
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Nairobi" }).format(new Date());
}

function FlagStripe() {
  return (
    <div aria-hidden="true">
      <div className="h-3 bg-black" />
      <div className="h-1 bg-white" />
      <div className="h-3 bg-[#bb0000]" />
      <div className="h-1 bg-white" />
      <div className="h-3 bg-[#006600]" />
    </div>
  );
}

export default function MashujaaPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (todayInNairobi() !== SHOW_ON) return;
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
    } catch {}
    const t = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function close() {
    setOpen(false);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex animate-[fade-in_0.3s_ease-out] items-center justify-center bg-ink/75 p-4 backdrop-blur-sm"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mashujaa-title"
        className="relative w-full max-w-md animate-[rise_0.5s_ease-out] overflow-hidden rounded-3xl bg-cream text-center shadow-2xl shadow-black/40"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-14 right-3 z-10 rounded-full bg-black/40 p-1.5 text-white transition-colors hover:bg-black/60"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <FlagStripe />

        <div className="relative isolate h-44 overflow-hidden sm:h-52">
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            sizes="448px"
            className="-z-10 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/30 via-ink/40 to-cream" />
          <div className="flex h-full flex-col items-center justify-end pb-2">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-cream shadow-lg ring-4 ring-[#bb0000]/80">
              <LogoMark className="h-11 w-auto" />
            </span>
          </div>
        </div>

        <div className="px-6 pt-3 pb-7 sm:px-8">
          <p className="text-xs font-bold tracking-[0.3em] text-[#006600] uppercase">20 October 2026</p>
          <h2 id="mashujaa-title" className="mt-2 font-serif text-4xl leading-tight font-semibold whitespace-nowrap text-ink sm:text-[2.75rem]">
            Happy <span className="text-[#bb0000] italic">Mashujaa</span> Day
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
            Today we honour the heroes who shaped Kenya, past and present. Celebrate the heroes in your own life with
            fresh flowers from Bobo Blooms.
          </p>

          <a
            href={whatsappLink("Hello Bobo Blooms 👋\nHappy Mashujaa Day! I'd like to send flowers to a hero in my life.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 font-bold text-white shadow-lg shadow-whatsapp/30 transition-opacity hover:opacity-90"
          >
            <WhatsAppIcon />
            Send flowers to a hero
          </a>
          <button
            type="button"
            onClick={close}
            className="mt-3 block w-full text-sm text-ink-soft underline-offset-4 hover:underline"
          >
            Continue to website
          </button>
        </div>

        <FlagStripe />
      </div>
    </div>
  );
}
