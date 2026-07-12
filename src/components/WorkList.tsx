import ProjectGridCard from "./ProjectGridCard";
import type { ProjectMeta } from "@/lib/work";

// Visual project cards — hover reveals "view case study" on the linked one.
const CARDS: { src: string; alt: string; video?: string; wide?: boolean }[] = [
  { src: "/work/work-2.png", alt: "Indemni shipments dashboard", wide: true },
  { src: "/work/work-1.png", alt: "Indemni knowledge engine" },
  { src: "/work/work-3.png", alt: "Indemni mobile app", video: "/work/showreel.mp4" },
  { src: "/work/work-4.webp", alt: "Skyvern" },
  { src: "/work/work-5.png", alt: "Catapult" },
];

export default function WorkList({ projects }: { projects: ProjectMeta[] }) {
  const slugs = new Set(projects.map((p) => p.slug));
  const caseStudyHref = slugs.has("indemni") ? "/work/indemni" : undefined;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {CARDS.map((card, i) => (
        <div key={i} className={card.wide ? "sm:col-span-2" : undefined}>
          <ProjectGridCard
            src={card.src}
            alt={card.alt}
            video={card.video}
            wide={card.wide}
            onLight
            href={card.wide ? caseStudyHref : undefined}
          />
        </div>
      ))}
    </div>
  );
}
