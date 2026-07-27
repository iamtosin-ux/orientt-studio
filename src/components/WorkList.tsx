import ProjectGridCard from "./ProjectGridCard";
import type { ProjectMeta } from "@/lib/work";

// Visual project cards — presentational only for now (not clickable, no hover).
const CARDS: { src: string; alt: string; video?: string; wide?: boolean }[] = [
  { src: "/work/indemni-image.png", alt: "Indemni shipments dashboard", wide: true },
  { src: "/work/work-1.webp", alt: "Indemni knowledge engine" },
  { src: "/work/work-3.webp", alt: "Indemni mobile app", video: "/work/showreel.mp4" },
  { src: "/work/work-4.webp", alt: "Skyvern" },
  { src: "/work/work-5.webp", alt: "Catapult" },
  { src: "/work/jobclarity.webp", alt: "JobClarity notes workspace" },
  { src: "/work/statisfy.webp", alt: "Statisfy workflow studio" },
  { src: "/work/CoreOS.png", alt: "Core OS" },
  { src: "/work/initiativ.webp", alt: "Initiativ carbon-compliance platform" },
];

export default function WorkList({}: { projects: ProjectMeta[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {CARDS.map((card, i) => (
        <div key={i} className={card.wide ? "sm:col-span-2" : undefined}>
          <ProjectGridCard
            src={card.src}
            alt={card.alt}
            video={card.video}
            wide={card.wide}
          />
        </div>
      ))}
    </div>
  );
}
