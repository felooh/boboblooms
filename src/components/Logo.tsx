import { useId } from "react";

// Outer petal positions [x, y, rotation] around the rose head at (32, 31). The art spans y 3.5–48,
// so the viewBox is shifted up to centre it.
const PETALS: [number, number, number][] = [
  [37.6, 23.3, 36],
  [41, 33.9, 108],
  [32, 40.5, 180],
  [23, 33.9, 252],
  [26.4, 23.3, 324],
];

/** The Bobo Blooms rose mark. src/app/icon.png and apple-icon.png are renders of this SVG. */
export function LogoMark({ className = "h-11 w-11" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const petal = `${id}-petal`;
  const heart = `${id}-heart`;
  const gold = `${id}-gold`;
  const sage = `${id}-sage`;

  return (
    <svg viewBox="0 -4 64 64" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id={petal} cx="0.5" cy="0.2" r="0.9">
          <stop offset="0" stopColor="#ffc2d4" />
          <stop offset="0.6" stopColor="#f47a9e" />
          <stop offset="1" stopColor="#e0527e" />
        </radialGradient>
        <radialGradient id={heart} cx="0.45" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ffd9e4" />
          <stop offset="1" stopColor="#f58aa9" />
        </radialGradient>
        <linearGradient id={gold} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f8d47e" />
          <stop offset="1" stopColor="#c98a24" />
        </linearGradient>
        <linearGradient id={sage} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a9d4b5" />
          <stop offset="1" stopColor="#6fa883" />
        </linearGradient>
      </defs>

      <g stroke="#4a1236" strokeWidth="1.1" strokeLinejoin="round">
        {/* leaves: gold top-left and right, sage bottom-left */}
        <path d="M22 20C15 21 10 17 9 10c7-1 12 3 13 10z" fill={`url(#${gold})`} />
        <path d="M44 34c6-6 13-6 18-2-4 6-11 8-18 2z" fill={`url(#${gold})`} />
        <path d="M43 22c4-7 10-9 16-6-2 7-9 10-16 6z" fill={`url(#${gold})`} />
        <path d="M22 38c-5 6-12 8-18 5 3-7 10-9 18-5z" fill={`url(#${sage})`} />

        {/* bud */}
        <path d="M51 14.5c-2 3-4 5-7 6.5" fill="none" />
        <path d="M49 8.5c0-3 2-5 4.5-5S58 5.5 58 8.5c0 2.5-2 4.5-4.5 4.5S49 11 49 8.5z" fill={`url(#${petal})`} />
        <path d="M49.5 10c1.5 3 6.5 3 8 0-1 3.5-2.5 5-4 5s-3-1.5-4-5z" fill={`url(#${gold})`} />

        {/* outer petals */}
        {PETALS.map(([x, y, r]) => (
          <ellipse
            key={r}
            cx={x}
            cy={y}
            rx="8.6"
            ry="7.4"
            transform={`rotate(${r} ${x} ${y})`}
            fill={`url(#${petal})`}
          />
        ))}

        {/* head */}
        <circle cx="32" cy="31" r="10.5" fill={`url(#${heart})`} />
      </g>
      {/* leaf veins */}
      <path
        d="M18.5 17 11.5 11.5M49 33l10.5-1M48 19.8 57 16.5M16.5 39.8l-10 2.7"
        stroke="#4a1236"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* spiral */}
      <path
        d="M32 31a1 1 0 0 1 2 0 2 2 0 0 1-4 0 3 3 0 0 1 6 0 4 4 0 0 1-8 0 5 5 0 0 1 10 0 6 6 0 0 1-6.2 6"
        fill="none"
        stroke="#4a1236"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
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
        <LogoMark className="h-24 w-24 drop-shadow" />
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
      <LogoMark className="-my-1 h-14 w-14 shrink-0 drop-shadow-sm" />
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
