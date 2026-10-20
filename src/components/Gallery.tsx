"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronIcon, CloseIcon } from "./Icons";
import WhatsAppIcon from "./WhatsAppIcon";
import { site, whatsappLink } from "@/lib/site";

const SWIPE_THRESHOLD = 50;

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  const current = index === null ? null : images[index];
  // Render the neighbours hidden so swiping to them is instant
  const neighbours =
    index === null || images.length < 2
      ? []
      : [images[(index + 1) % images.length], images[(index - 1 + images.length) % images.length]];

  return (
    <>
      <div className="mt-10 grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:rounded-xl"
            aria-label={`View ${title} photo ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${title} by Bobo Blooms, photo ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/15" />
          </button>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo ${index! + 1} of ${images.length}`}
          className="fixed inset-0 z-50 flex animate-[fade-in_0.2s_ease-out] flex-col bg-ink/95 text-cream backdrop-blur-sm"
          onClick={close}
        >
          <div className="flex items-center justify-between px-4 py-3 text-sm sm:px-6">
            <span className="font-serif text-lg text-cream/80">
              {title} <span className="text-cream/50">· {index! + 1} / {images.length}</span>
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="rounded-full p-2 transition-colors hover:bg-cream/10"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>

          <div
            className="relative flex-1"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > SWIPE_THRESHOLD) step(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <Image
              key={current}
              src={current}
              alt={`${title} by Bobo Blooms`}
              fill
              sizes="100vw"
              className="animate-[fade-in_0.25s_ease-out] object-contain"
            />
            {neighbours.map((src) => (
              <Image key={`pre-${src}`} src={src} alt="" fill sizes="100vw" className="invisible object-contain" />
            ))}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="absolute top-1/2 left-2 hidden -translate-y-1/2 rounded-full bg-ink/60 p-3 transition-colors hover:bg-ink sm:left-4 sm:block"
                >
                  <ChevronIcon direction="left" className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="absolute top-1/2 right-2 hidden -translate-y-1/2 rounded-full bg-ink/60 p-3 transition-colors hover:bg-ink sm:right-4 sm:block"
                >
                  <ChevronIcon className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          <div className="flex flex-col items-center gap-2 px-4 py-4" onClick={(e) => e.stopPropagation()}>
            <a
              href={whatsappLink(`Hello Bobo Blooms 👋\nI'd like to order this (${title}):\n${site.url}${current}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-bold text-white transition-opacity hover:opacity-90"
            >
              <WhatsAppIcon />
              Order this on WhatsApp
            </a>
            {images.length > 1 && <p className="text-xs text-cream/40 sm:hidden">Swipe to see more</p>}
          </div>
        </div>
      )}
    </>
  );
}
