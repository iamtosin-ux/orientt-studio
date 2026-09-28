import ProjectGridCard from "./ProjectGridCard";
import WorkThemeCard from "./WorkThemeCard";
import type { ProjectMeta } from "@/lib/work";

// Visual project cards. Most are presentational; `toggle` cards flip between a
// light- and dark-mode screenshot on tap (see WorkThemeCard).
const CARDS: {
  src: string;
  alt: string;
  video?: string;
  wide?: boolean;
  toggle?: { light: string; dark: string };
}[] = [
  { src: "/work/New indemni image.png", alt: "Indemni shipments dashboard", wide: true },
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
  { src: "/work/CoreOS.png", alt: "Core OS" },
  { src: "/work/initiativ.webp", alt: "Initiativ carbon-compliance platform" },
  { src: "/work/indemni-drivers.png", alt: "Indemni driver verification and shipment protection" },
  { src: "/work/humanmanager.webp", alt: "Human Manager platform" },
];

export default function WorkList({}: { projects: ProjectMeta[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {CARDS.map((card, i) => (
        <div key={i} className={card.wide ? "sm:col-span-2" : undefined}>
          {card.toggle ? (
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
        </div>
      ))}
    </div>
  );
}
