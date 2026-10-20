import Image from "next/image";

/**
 * The official Bobo Blooms rose emblem (public/logo.png, 640×493). Size it by height and let the width follow,
 * e.g. "h-12 w-auto". src/app/icon.png and apple-icon.png are made from the same artwork.
 */
export function LogoMark({ className = "h-12 w-auto", priority = false }: { className?: string; priority?: boolean }) {
  return <Image src="/logo.png" alt="" width={640} height={493} priority={priority} className={className} />;
}

function Flourish({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 40 8" aria-hidden="true" className={`h-2 w-10 text-gold ${flip ? "-scale-x-100" : ""}`}>
      <path d="M0 4h28" stroke="currentColor" strokeWidth="1" />
      <circle cx="32" cy="4" r="1.6" fill="currentColor" />
      <circle cx="37.5" cy="4" r="1" fill="currentColor" />
    </svg>
  );
}

export default function Logo({
  tone = "light",
  stacked = false,
}: {
  tone?: "light" | "dark";
  stacked?: boolean;
}) {
  const gold = tone === "light" ? "from-gold-light to-gold" : "from-gold to-[#a8701a]";
  const accent = tone === "light" ? "text-blush" : "text-rose";

  if (stacked) {
    return (
      <span className="inline-flex flex-col items-center leading-none">
        <LogoMark className="h-20 w-auto drop-shadow" />
        <span
          className={`mt-1 bg-linear-to-b bg-clip-text font-serif text-6xl leading-[0.85] font-bold tracking-[0.06em] text-transparent ${gold}`}
        >
          BOBO
        </span>
        <span className={`mt-2 flex items-center gap-2 text-sm font-bold tracking-[0.45em] ${accent}`}>
          <Flourish flip />
          <span className="-mr-[0.45em]">BLOOMS</span>
          <Flourish />
        </span>
        <span className="mt-2.5 text-[10px] tracking-[0.3em] text-cream/60">PREMIER FLOWER BUSINESS</span>
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2.5">
      <LogoMark priority className="-my-1 h-12 w-auto shrink-0 drop-shadow-sm" />
      <span className="flex flex-col items-center leading-none">
        <span
          className={`bg-linear-to-b bg-clip-text font-serif text-[1.9rem] leading-[0.85] font-bold tracking-[0.06em] text-transparent ${gold}`}
        >
          BOBO
        </span>
        <span className={`mt-1 text-[10px] font-bold tracking-[0.42em] ${accent}`}>BLOOMS</span>
      </span>
    </span>
  );
}
