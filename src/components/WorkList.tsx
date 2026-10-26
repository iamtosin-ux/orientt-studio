import ProjectGridCard from "./ProjectGridCard";
import WorkThemeCard from "./WorkThemeCard";
import LaptopFocus, { type Quad } from "./LaptopFocus";
import TestimonialVideo from "./TestimonialVideo";
import type { ProjectMeta } from "@/lib/work";

// Visual project cards. Most are presentational; `toggle` cards flip between a
// light- and dark-mode screenshot on tap (see WorkThemeCard).
const CARDS: {
  src: string;
  alt: string;
  video?: string;
  wide?: boolean;
  // Scroll-pinned laptop that flattens and zooms onto its screen (LaptopFocus).
  focus?: boolean;
  // Click-to-play client testimonial tile pinned over the card's bottom-left.
  testimonial?: { src: string; poster: string; name: string; role: string };
  toggle?: { light: string; dark: string };
}[] = [
  {
    src: "/work/indemni-shipments.webp",
    alt: "Indemni shipments dashboard",
    wide: true,
    testimonial: {
      src: "/work/testimonial-omar.mp4",
      poster: "/work/testimonial-omar.jpg",
      name: "Omar Draz",
      role: "Co-founder, Indemni",
    },
  },
  { src: "/work/work-1.webp", alt: "Indemni knowledge engine" },
  { src: "/work/work-3.webp", alt: "Indemni mobile app", video: "/work/showreel.mp4" },
  { src: "/work/work-4.webp", alt: "Skyvern", video: "/work/skyvern.mp4" },
  {
    src: "/work/light.png",
    alt: "Catapult sports performance app",
    toggle: { light: "/work/light.png", dark: "/work/dark.png" },
  },
  { src: "/work/jobclarity.webp", alt: "JobClarity notes workspace" },
  { src: "/work/statisfy.webp", alt: "Statisfy workflow studio" },
  { src: "/work/monitor-mockup.webp", alt: "Desktop monitor mockup", wide: true, focus: true },
  { src: "/work/CoreOS.png", alt: "Core OS" },
  { src: "/work/initiativ.webp", alt: "Initiativ carbon-compliance platform" },
  { src: "/work/indemni-drivers.png", alt: "Indemni driver verification and shipment protection" },
  { src: "/work/humanmanager.webp", alt: "Human Manager platform" },
];

// Screen corners (TL, TR, BR, BL) of monitor-mockup.webp, in 1264×843 px.
const LAPTOP_SCREEN: Quad = [
  [405, 241],
  [898, 255],
  [898, 565],
  [404, 564],
];

// Full-page screenshot that scrolls on the laptop screen (5760×29932 source).
const LAPTOP_CONTENT = {
  src: "/work/flex-concept-2304.webp",
  srcSet: "/work/flex-concept-1200.webp 1200w, /work/flex-concept-2304.webp 2304w",
  alt: "The Flex Academy landing page",
  aspect: 29932 / 5760,
  url: "flexacademy.demo",
  title: "Flex Academy",
};

export default function WorkList({}: { projects: ProjectMeta[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {CARDS.map((card, i) => (
        <div key={i} className={`relative ${card.wide ? "sm:col-span-2" : ""}`}>
          {card.focus ? (
            <LaptopFocus
              src={card.src}
              alt={card.alt}
              width={1264}
              height={843}
              screen={LAPTOP_SCREEN}
              screenAspect={1.56}
              content={LAPTOP_CONTENT}
            />
          ) : card.toggle ? (
            <WorkThemeCard
              light={card.toggle.light}
              dark={card.toggle.dark}
              alt={card.alt}
            />
          ) : (
            <ProjectGridCard
              src={card.src}
              alt={card.alt}
              video={card.video}
              wide={card.wide}
            />
          )}
          {card.testimonial && (
            <div className="absolute bottom-3 left-3 w-[32%] max-w-[252px] sm:bottom-6 sm:left-6 sm:w-[22%]">
              <TestimonialVideo
                src={card.testimonial.src}
                poster={card.testimonial.poster}
                label={`${card.testimonial.name}, ${card.testimonial.role}`}
                className="aspect-[3/2] rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.25)] sm:rounded-2xl"
                caption={
                  <span className="hidden lg:block">
                    <span className="block text-sm font-semibold text-white">{card.testimonial.name}</span>
                    <span className="mt-0.5 block text-sm text-white/70">{card.testimonial.role}</span>
                  </span>
                }
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
