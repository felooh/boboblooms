"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import WhatsAppIcon from "./WhatsAppIcon";
import { site, whatsappLink } from "@/lib/site";

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);

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

  return (
    <>
      <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-xl bg-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            aria-label={`View ${title} photo ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${title} by Bobo Blooms, photo ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo ${index! + 1} of ${images.length}`}
          className="fixed inset-0 z-50 flex flex-col bg-ink/95 text-cream"
          onClick={close}
        >
          <div className="flex items-center justify-between px-4 py-3 text-sm">
            <span className="text-cream/70">
              {index! + 1} / {images.length}
            </span>
            <button type="button" onClick={close} aria-label="Close" className="p-2 text-2xl leading-none">
              ×
            </button>
          </div>

          <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
            <Image src={current} alt={`${title} by Bobo Blooms`} fill sizes="100vw" className="object-contain" />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-ink/60 px-4 py-3 text-2xl hover:bg-ink"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-ink/60 px-4 py-3 text-2xl hover:bg-ink"
                >
                  ›
                </button>
              </>
            )}
          </div>

          <div className="flex justify-center px-4 py-4" onClick={(e) => e.stopPropagation()}>
            <a
              href={whatsappLink(`Hello Bobo Blooms 👋\nI'd like to order this (${title}):\n${site.url}${current}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-bold text-white"
            >
              <WhatsAppIcon />
              Order this on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
