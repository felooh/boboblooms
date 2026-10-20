// Drifting petals over the home hero. Pure CSS; positions are fixed (not random) so server and client markup match.

const COLORS = ["#f9b4c8", "#f47a9e", "#ffd9e4", "#d6336c", "#f8cf74"];

// [left %, size px, fall seconds, delay seconds, sway seconds]
const PETALS: [number, number, number, number, number][] = [
  [4, 14, 13, -2, 3.2],
  [11, 20, 16, -9, 4.1],
  [18, 12, 11, -5, 2.8],
  [26, 18, 15, -12, 3.6],
  [33, 10, 12, -1, 2.6],
  [41, 16, 17, -7, 3.9],
  [48, 22, 14, -13, 4.4],
  [55, 12, 12, -4, 3],
  [61, 18, 16, -10, 3.4],
  [67, 14, 13, -6, 2.9],
  [73, 24, 18, -15, 4.6],
  [79, 12, 11, -3, 2.7],
  [85, 18, 15, -11, 3.8],
  [91, 14, 13, -8, 3.1],
  [96, 20, 17, -14, 4.2],
  [37, 13, 19, -16, 3.3],
  [70, 11, 20, -18, 2.9],
  [22, 15, 18, -17, 3.7],
];

export default function HeroPetals() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {PETALS.map(([left, size, fall, delay, sway], i) => (
        <span
          key={i}
          className="absolute -top-10 block animate-[petal-fall_linear_infinite]"
          style={{ left: `${left}%`, animationDuration: `${fall}s`, animationDelay: `${delay}s` }}
        >
          <span
            className="block animate-[petal-sway_ease-in-out_infinite_alternate]"
            style={{ animationDuration: `${sway}s`, animationDelay: `${delay / 3}s` }}
          >
            <svg
              viewBox="0 0 20 24"
              width={size * 1.4}
              height={size * 1.7}
              style={{ opacity: 0.7 + (i % 3) * 0.12 }}
              className="drop-shadow-[0_2px_3px_rgba(58,14,46,0.35)]"
            >
              <path d="M10 1C15 6 19 12 17 18c-1.5 4-5 5-7 5s-5.5-1-7-5C1 12 5 6 10 1z" fill={COLORS[i % COLORS.length]} />
              <path d="M10 4c-1 5-1 11 0 17" stroke="#fff" strokeOpacity="0.35" strokeWidth="0.9" fill="none" />
            </svg>
          </span>
        </span>
      ))}
    </div>
  );
}
