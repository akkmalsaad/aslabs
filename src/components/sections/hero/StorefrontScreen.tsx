import type { ComponentType } from "react";

// Hero-only browser screen: a small ceramics storefront. Built in HTML (not a screenshot)
// so it stays crisp at any size; everything is sized in cqw (the screen's width).

type Product = {
  name: string;
  detail: string;
  price: string;
  tint: string;
  Art: ComponentType;
  swatches: string[];
  tag?: string;
  /** Shows the quick-add control, as if hovered. */
  quickAdd?: boolean;
};

const products: Product[] = [
  {
    name: "Ridge Mug",
    detail: "Speckled white",
    price: "RM 68",
    tint: "#eeebe4",
    Art: Mug,
    swatches: ["#f1ede4", "#b7c0b1", "#3a3b3e"],
    tag: "New",
  },
  {
    name: "Bud Vase",
    detail: "Sage glaze",
    price: "RM 95",
    tint: "#e6e9e3",
    Art: Vase,
    swatches: ["#b7c0b1", "#f1ede4"],
    quickAdd: true,
  },
  {
    name: "Low Bowl",
    detail: "Set of two",
    price: "RM 120",
    tint: "#ece6dd",
    Art: Bowls,
    swatches: ["#e2d6c4", "#f1ede4"],
  },
  {
    name: "Pour Jug",
    detail: "Charcoal",
    price: "RM 148",
    tint: "#e8e7e3",
    Art: Jug,
    swatches: ["#3a3b3e", "#e2d6c4"],
  },
];

const filters = ["All", "Mugs", "Vases", "Tableware"];

export function StorefrontScreen() {
  return (
    <div className="@container absolute inset-0 bg-[#fbfaf7] text-ink">
      <header className="flex items-center justify-between border-b border-ink/[0.06] px-[4cqw] py-[1.9cqw]">
        <span className="text-[2.5cqw] leading-none font-semibold tracking-[-0.04em]">Kiln &amp; Co.</span>
        <nav className="flex gap-[3cqw] text-[1.5cqw] leading-none text-ink/50">
          <span className="text-ink">Shop</span>
          <span>Collections</span>
          <span>Journal</span>
          <span>About</span>
        </nav>
        <div className="flex items-center gap-[2cqw] text-ink/80">
          <Icon d="M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM20 20l-4.6-4.6" />
          <Icon d="M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM5 20c.6-3.4 3.4-5.5 7-5.5s6.4 2.1 7 5.5" />
          <span className="relative">
            <Icon d="M5.5 8h13l-1 12h-11l-1-12ZM9 8V6.5a3 3 0 0 1 6 0V8" />
            <span className="absolute -top-[0.7cqw] -right-[0.9cqw] grid size-[1.7cqw] place-items-center rounded-full bg-ink text-[1cqw] leading-none font-semibold text-paper">
              2
            </span>
          </span>
        </div>
      </header>

      <div className="flex items-end justify-between px-[4cqw] pt-[4.2cqw] pb-[2.8cqw]">
        <div>
          <p className="font-mono text-[1.15cqw] leading-none tracking-[0.14em] text-ink/45 uppercase">
            Autumn 2026
          </p>
          <p className="mt-[1cqw] text-[3.2cqw] leading-none font-semibold tracking-[-0.035em]">New arrivals</p>
        </div>
        <div className="flex items-center gap-[0.9cqw] text-[1.35cqw] leading-none">
          {filters.map((filter, i) => (
            <span
              key={filter}
              className={`rounded-full px-[1.5cqw] py-[0.7cqw] ${
                i === 0 ? "bg-ink text-paper" : "text-ink/60 ring-1 ring-ink/10"
              }`}
            >
              {filter}
            </span>
          ))}
        </div>
      </div>

      <ul className="grid grid-cols-4 gap-[2cqw] px-[4cqw]">
        {products.map(({ name, detail, price, tint, Art, swatches, tag, quickAdd }) => (
          <li key={name}>
            <div className="relative aspect-[4/5.6] overflow-hidden rounded-[1.1cqw]" style={{ background: tint }}>
              <Art />
              {tag && (
                <span className="absolute top-[1.2cqw] left-[1.2cqw] rounded-full bg-paper px-[1cqw] py-[0.45cqw] text-[1.1cqw] leading-none font-medium">
                  {tag}
                </span>
              )}
              <span className="absolute top-[1cqw] right-[1cqw] grid size-[2.8cqw] place-items-center rounded-full bg-paper/80 text-ink/70">
                <Icon d="M12 19.5s-7-4.3-7-9.6A3.9 3.9 0 0 1 12 7.6a3.9 3.9 0 0 1 7 2.3c0 5.3-7 9.6-7 9.6Z" size="1.5cqw" />
              </span>
              {quickAdd && (
                <span className="absolute inset-x-[1.2cqw] bottom-[1.2cqw] rounded-full bg-ink py-[0.85cqw] text-center text-[1.25cqw] leading-none font-medium text-paper">
                  Add to bag
                </span>
              )}
            </div>
            <div className="mt-[1.2cqw] flex items-baseline justify-between text-[1.6cqw] leading-none">
              <span className="font-medium">{name}</span>
              <span className="tabular-nums">{price}</span>
            </div>
            <div className="mt-[0.8cqw] flex items-center justify-between text-[1.3cqw] leading-none text-ink/50">
              <span>{detail}</span>
              <span className="flex gap-[0.5cqw]">
                {swatches.map((color) => (
                  <span
                    key={color}
                    className="size-[1.2cqw] rounded-full ring-1 ring-ink/10"
                    style={{ background: color }}
                  />
                ))}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Icon({ d, size = "2cqw" }: { d: string; size?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: size, height: size }}
    >
      <path d={d} />
    </svg>
  );
}

// Product renders: soft-lit ceramics on a 4:5 canvas, resting on a shared floor line.
// The viewBox starts lower than 0 so each piece sits near the optical centre of its tile.

const art = "absolute inset-0 size-full";
const canvas = "0 8 100 125";

function Shadow({ rx }: { rx: number }) {
  return <ellipse cx="50" cy="97" rx={rx} ry="3.2" fill="#0b0d12" opacity="0.09" />;
}

function Mug() {
  return (
    <svg viewBox={canvas} className={art}>
      <defs>
        <linearGradient id="sf-mug" x1="0" x2="1">
          <stop offset="0" stopColor="#fbf9f4" />
          <stop offset="0.55" stopColor="#f1ede4" />
          <stop offset="1" stopColor="#d9d3c7" />
        </linearGradient>
      </defs>
      <Shadow rx={24} />
      <path d="M66 62h4.5a9 9 0 0 1 0 18H66" fill="none" stroke="#ddd7cb" strokeWidth="4.5" />
      <path d="M31 56h36v34a6 6 0 0 1-6 6H37a6 6 0 0 1-6-6V56Z" fill="url(#sf-mug)" />
      <ellipse cx="49" cy="56" rx="18" ry="3" fill="#e4dfd4" />
      <ellipse cx="49" cy="56.4" rx="15.5" ry="2" fill="#cfc8bb" />
      <path d="M31 84h36v6a6 6 0 0 1-6 6H37a6 6 0 0 1-6-6v-6Z" fill="#c9bfae" opacity="0.55" />
      {[
        [38, 64],
        [45, 70],
        [56, 63],
        [41, 77],
        [60, 74],
        [51, 79],
        [36, 70],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.55" fill="#7d766b" opacity="0.55" />
      ))}
    </svg>
  );
}

function Vase() {
  return (
    <svg viewBox={canvas} className={art}>
      <defs>
        <linearGradient id="sf-vase" x1="0" x2="1">
          <stop offset="0" stopColor="#d3dacd" />
          <stop offset="0.5" stopColor="#b7c0b1" />
          <stop offset="1" stopColor="#929d8c" />
        </linearGradient>
      </defs>
      <path d="M50 46c-.6-9 1.2-17-2.2-27" fill="none" stroke="#8b7f69" strokeWidth="0.9" />
      <path d="M50.3 36c3-3.2 6.4-3.6 8.6-3-1.6 2.6-5 4-8.6 3Z" fill="#a39a82" />
      <path d="M49.4 28c-3-2.8-6.2-3-8.2-2.2 1.8 2.4 5 3.2 8.2 2.2Z" fill="#a39a82" />
      <path d="M48.2 20.5c2.2-2.6 4.8-3 6.6-2.4-1.2 2.2-3.8 3.2-6.6 2.4Z" fill="#a39a82" />
      <Shadow rx={21} />
      <path
        d="M45 45h10v6c0 2.6 1.6 4.4 4.4 6.8C65.6 63 69 69.6 69 77c0 11.6-8.4 19-19 19s-19-7.4-19-19c0-7.4 3.4-14 9.6-19.2 2.8-2.4 4.4-4.2 4.4-6.8v-6Z"
        fill="url(#sf-vase)"
      />
      <ellipse cx="50" cy="45" rx="5" ry="1.2" fill="#7f8a79" />
    </svg>
  );
}

function Bowls() {
  return (
    <svg viewBox={canvas} className={art}>
      <defs>
        <linearGradient id="sf-bowl" x1="0" x2="1">
          <stop offset="0" stopColor="#f5f0e7" />
          <stop offset="0.55" stopColor="#e6dccc" />
          <stop offset="1" stopColor="#cbbda7" />
        </linearGradient>
      </defs>
      <Shadow rx={28} />
      <path d="M21 79h58c0 10-12.6 17-29 17s-29-7-29-17Z" fill="url(#sf-bowl)" />
      <ellipse cx="50" cy="79" rx="29" ry="3.6" fill="#ece5d9" />
      <path d="M26 66h48c0 8.8-10.4 14.6-24 14.6S26 74.8 26 66Z" fill="url(#sf-bowl)" />
      <ellipse cx="50" cy="66" rx="24" ry="3.2" fill="#efe9de" />
      <ellipse cx="50" cy="66.5" rx="20.5" ry="2.1" fill="#dcd1bf" />
    </svg>
  );
}

function Jug() {
  return (
    <svg viewBox={canvas} className={art}>
      <defs>
        <linearGradient id="sf-jug" x1="0" x2="1">
          <stop offset="0" stopColor="#5d5f63" />
          <stop offset="0.45" stopColor="#3a3b3e" />
          <stop offset="1" stopColor="#242528" />
        </linearGradient>
      </defs>
      <Shadow rx={22} />
      <path d="M63 54c9.5 1 11.5 17 2 24" fill="none" stroke="#2f3033" strokeWidth="4" strokeLinecap="round" />
      <path
        d="M37 44h25l-1.6 6.4C66 55 70 62.6 70 72c0 14.4-8.6 24-20 24s-20-9.6-20-24c0-9.4 4-17 9.6-21.6L37 44Z"
        fill="url(#sf-jug)"
      />
      <path d="M37 44l-5.4-3.4 7.2 1.2L37 44Z" fill="#4a4c50" />
      <ellipse cx="49.5" cy="44" rx="12.5" ry="1.6" fill="#1d1e21" />
      <path d="M38 62c-1.6 4-2 9-1 14" fill="none" stroke="#fff" strokeOpacity="0.14" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
