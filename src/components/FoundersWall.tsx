"use client";

import { useState } from "react";

const BOOK_URL = "https://cal.com/samuel-tosin/30min";

type Founder = {
  img: string;
  name: string;
  flag: string;
  title: string;
  quote: string;
};

// 6 founders, each with their own fixed testimonial (mix of genders, countries, roles)
const FOUNDERS: Founder[] = [
  {
    img: "https://i.pravatar.cc/150?img=12",
    name: "Marcus",
    flag: "🇺🇸",
    title: "CEO",
    quote: "Orientt moved faster than any team we'd worked with — and the craft showed.",
  },
  {
    img: "https://i.pravatar.cc/150?img=5",
    name: "Emma",
    flag: "🇬🇧",
    title: "Co-founder",
    quote: "They designed like founders. Every screen earned its place.",
  },
  {
    img: "https://i.pravatar.cc/150?img=33",
    name: "Tunde",
    flag: "🇳🇬",
    title: "Design director",
    quote: "We went from a rough idea to a product investors actually trusted.",
  },
  {
    img: "https://i.pravatar.cc/150?img=45",
    name: "Greta",
    flag: "🇩🇪",
    title: "CEO",
    quote: "The fastest, sharpest design partner we've had, full stop.",
  },
  {
    img: "https://i.pravatar.cc/150?img=8",
    name: "Oliver",
    flag: "🇬🇧",
    title: "Co-founder",
    quote: "Shipping with Orientt felt like adding a senior design team overnight.",
  },
  {
    img: "https://i.pravatar.cc/150?img=47",
    name: "Ada",
    flag: "🇳🇬",
    title: "CEO",
    quote: "Our activation jumped the week we launched the new flows.",
  },
];

// Repeat enough to fill the viewport, then duplicate for a seamless -50% loop
const SET = [...FOUNDERS, ...FOUNDERS, ...FOUNDERS, ...FOUNDERS];
const ROW = [...SET, ...SET];

const EDGE_FADE =
  "linear-gradient(to right, transparent, #000 9%, #000 91%, transparent)";

export default function FoundersWall() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const t = FOUNDERS[active];

  return (
    <section className="relative z-10 mx-auto flex max-w-[1000px] flex-col items-center px-6 pb-32 pt-8 text-center">
      <h2 className="max-w-3xl text-balance text-[clamp(1.6rem,3.5vw,32px)] font-normal leading-tight">
        Join founders building the future.{" "}
        <span className="text-white/45">
          We design &amp; build AI-first products for startups and enterprises
          across AI, finance, DevOps, and beyond.
        </span>
      </h2>

      <div
        className="relative mt-16 w-screen max-w-[100vw] overflow-hidden"
        style={{ WebkitMaskImage: EDGE_FADE, maskImage: EDGE_FADE }}
        onMouseLeave={() => setHovered(null)}
      >
        <div
          className={`flex w-max gap-6 px-3 animate-marquee ${
            hovered !== null ? "marquee-paused" : ""
          }`}
        >
          {ROW.map((f, i) => {
            const founder = i % FOUNDERS.length;
            const isHovered = hovered === founder;
            const dimmed = hovered !== null && !isHovered;
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={f.img}
                alt=""
                onMouseEnter={() => {
                  setActive(founder);
                  setHovered(founder);
                }}
                className={`size-20 shrink-0 cursor-pointer rounded-full object-cover ring-1 ring-white/15 transition-all duration-300 ${
                  isHovered ? "z-10 scale-[1.5] ring-2 ring-[#4a76f0]" : ""
                } ${dimmed ? "opacity-40 grayscale" : ""}`}
              />
            );
          })}
        </div>
      </div>

      <figure className="mt-16 flex min-h-[110px] max-w-xl flex-col items-center gap-4">
        <blockquote className="text-balance text-lg leading-7 text-white/85">
          “{t.quote}”
        </blockquote>
        <figcaption className="flex items-center gap-2 text-sm text-white/60">
          <span className="font-medium text-white/85">{t.name}</span>
          <span aria-hidden>{t.flag}</span>
          <span className="text-white/35">·</span>
          <span>{t.title}</span>
        </figcaption>
      </figure>

      {/* Book a call CTA */}
      <a
        href={BOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative mt-10 flex h-[44px] items-center justify-center gap-2 rounded-[80px] px-6 text-accent-fill transition-transform duration-200 ease-out hover:-translate-y-px active:translate-y-0"
        style={{
          boxShadow:
            "0px 2px 5px 0px rgba(44,90,218,0.39), 0px 8px 8px 0px rgba(44,90,218,0.1), 0px 0px 30px 0px rgba(44,90,218,0.2)",
        }}
      >
        <span className="pointer-events-none absolute inset-0 rounded-[80px] shadow-[inset_0_0_0_1px_rgba(255,255,255,1)]" />
        <span className="pointer-events-none absolute inset-0 rounded-[80px] shadow-[inset_0_0_12px_0_rgba(255,255,255,0.08),inset_0_-8px_32px_0_#2c5ada] transition-shadow duration-200 group-hover:shadow-[inset_0_0_12px_0_rgba(255,255,255,0.12),inset_0_-10px_36px_0_#2c5ada]" />
        <span className="text-sm font-semibold">Book a call</span>
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path
            d="M4.17 10h11.66M11.67 5.83 15.83 10l-4.16 4.17"
            stroke="currentColor"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  );
}
