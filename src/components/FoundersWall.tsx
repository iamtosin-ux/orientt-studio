"use client";

import { useState } from "react";

const NAMES = [
  "Marcus", "Emma", "Oliver", "Sophie", "Tunde", "Ngozi", "Chidi", "Ada",
  "Lukas", "Greta", "Felix", "Hannah", "Jordan", "Mara", "Daniel", "Zoe",
];
const COUNTRIES = [
  { flag: "🇺🇸", label: "US" },
  { flag: "🇬🇧", label: "UK" },
  { flag: "🇳🇬", label: "Nigeria" },
  { flag: "🇩🇪", label: "Germany" },
];
const TITLES = ["Co-founder", "CEO", "Design director"];
const QUOTES = [
  "Orientt moved faster than any team we'd worked with — and the craft showed.",
  "They designed like founders. Every screen earned its place.",
  "We went from a rough idea to a product investors actually trusted.",
  "The fastest, sharpest design partner we've had, full stop.",
  "Shipping with Orientt felt like adding a senior design team overnight.",
  "Our activation jumped the week we launched the new flows.",
];

// 15 founder portraits, a mix of male and female
const FOUNDERS = [12, 5, 33, 45, 8, 23, 60, 15, 52, 3, 68, 27, 47, 11, 31].map(
  (n) => `https://i.pravatar.cc/150?img=${n}`,
);

type Testimonial = { quote: string; name: string; flag: string; title: string };
const DEFAULT: Testimonial = {
  quote: QUOTES[0],
  name: NAMES[0],
  flag: COUNTRIES[0].flag,
  title: TITLES[0],
};
function randomTestimonial(): Testimonial {
  const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
  return { quote: pick(QUOTES), name: pick(NAMES), flag: pick(COUNTRIES).flag, title: pick(TITLES) };
}

const EDGE_FADE =
  "linear-gradient(to right, transparent, #000 9%, #000 91%, transparent)";

export default function FoundersWall() {
  const [t, setT] = useState<Testimonial>(DEFAULT);
  const [hovered, setHovered] = useState<number | null>(null);

  // Duplicate the list so the marquee can loop seamlessly
  const row = [...FOUNDERS, ...FOUNDERS];

  return (
    <section className="relative z-10 mx-auto flex max-w-[1000px] flex-col items-center px-6 pb-32 pt-8 text-center">
      <h2 className="max-w-2xl text-balance text-[clamp(1.6rem,3.5vw,32px)] font-normal leading-tight">
        Join founders with success stories.{" "}
        <span className="text-white/45">
          Builders across AI, finance, DevOps and more ship with Orientt.
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
          {row.map((src, i) => {
            const founder = i % FOUNDERS.length;
            const isHovered = hovered === founder;
            const dimmed = hovered !== null && !isHovered;
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt=""
                onMouseEnter={() => {
                  setHovered(founder);
                  setT(randomTestimonial());
                }}
                className={`size-20 shrink-0 cursor-pointer rounded-full object-cover ring-1 ring-white/15 transition-all duration-300 ${
                  isHovered ? "z-10 scale-[1.5] ring-2 ring-[#4a76f0]" : ""
                } ${dimmed ? "opacity-40 grayscale" : ""}`}
              />
            );
          })}
        </div>
      </div>

      <figure className="mt-16 flex min-h-[120px] max-w-xl flex-col items-center gap-4">
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
    </section>
  );
}
