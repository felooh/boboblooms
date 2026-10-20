import { useId } from "react";

/** The Bobo Blooms rose mark. src/app/icon.png and apple-icon.png are renders of this SVG. */
export function LogoMark({ className = "h-11 w-11" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const petal = `${id}-petal`;
  const heart = `${id}-heart`;
  const leaf = `${id}-leaf`;

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id={petal} cx="0.45" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#ff8fb3" />
          <stop offset="0.55" stopColor="#ec407a" />
          <stop offset="1" stopColor="#b0154f" />
        </radialGradient>
        <radialGradient id={heart} cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#ffd3e1" />
          <stop offset="1" stopColor="#f06292" />
        </radialGradient>
        <linearGradient id={leaf} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6cd72" />
          <stop offset="1" stopColor="#d18f1f" />
        </linearGradient>
      </defs>

      {/* leaves */}
      <path d="M27 46C20 54 9 55 3 51c5-7 16-9 24-5z" fill={`url(#${leaf})`} />
      <path d="M37 46c7 8 18 9 24 5-5-7-16-9-24-5z" fill={`url(#${leaf})`} />
      <path d="M6 51c7-1 14-3 20-5M58 51c-7-1-14-3-20-5" stroke="#9a5d0e" strokeWidth="0.9" fill="none" opacity="0.5" />

      <g stroke="#7d0d3a" strokeWidth="0.9" strokeLinejoin="round">
        {/* back petals */}
        <path d="M11 25C10 11 23 5 32 9.5 41 5 54 11 53 25c-1 14-10 22-21 22S12 39 11 25z" fill="#b0154f" />
        {/* bud */}
        <path d="M20 21c0-9 24-9 24 0 0 7-24 7-24 0z" fill={`url(#${heart})`} />
        {/* side petals wrapping the bud */}
        <path d="M11 25c1 12 9 19 21 22-3.5-7-4-16-.5-24-7-3-15-2-20.5 2z" fill={`url(#${petal})`} />
        <path d="M53 25c-1 12-9 19-21 22 3.5-7 4-16 .5-24 7-3 15-2 20.5 2z" fill={`url(#${petal})`} />
        {/* front petal */}
        <path d="M15 31c3 10 9 16 17 16s14-6 17-16c-5 2.5-11 3.5-17 3.5S20 33.5 15 31z" fill={`url(#${heart})`} />
      </g>
      {/* bud swirl */}
      <path
        d="M32.5 14.5c-5 0-7 3.5-4 5.5 3 2 7.5.5 7-2.5M25 20.5c2 3.5 12 3.5 14 0"
        fill="none"
        stroke="#a3124b"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="h-12 w-12 shrink-0 drop-shadow-sm" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-serif text-[1.65rem] font-semibold tracking-wide ${
            tone === "light" ? "text-cream" : "text-ink"
          }`}
        >
          Bobo <span className="text-gold-light italic">Blooms</span>
        </span>
        <span
          className={`mt-1 text-[9px] font-bold tracking-[0.32em] uppercase ${
            tone === "light" ? "text-blush" : "text-rose"
          }`}
        >
          Flowers &amp; Decor
        </span>
      </span>
    </span>
  );
}
