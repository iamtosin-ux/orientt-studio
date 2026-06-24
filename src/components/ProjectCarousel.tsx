import type { ProjectMeta } from "@/lib/work";
import ProjectGridCard from "./ProjectGridCard";

type Card = {
  src: string;
  alt: string;
  /** Case study slug this tile links to */
  slug: string;
};

// 2x2 showcase grid. TODO: map each tile to its own project slug as
// more case studies are added under content/work.
const CARDS: Card[] = [
  { src: "/work/work-1.png", alt: "Knowledge engine dashboard", slug: "indemni" },
  { src: "/work/work-2.png", alt: "Indemni shipments dashboard", slug: "indemni" },
  { src: "/work/work-3.png", alt: "Indemni mobile app", slug: "indemni" },
  { src: "/work/work-4.png", alt: "Automate browser-based workflows with AI", slug: "indemni" },
];

export default function ProjectCarousel({ projects }: { projects: ProjectMeta[] }) {
  const slugs = new Set(projects.map((p) => p.slug));

  return (
    <section
      aria-label="Selected work"
      className="relative z-10 mx-auto mt-16 grid w-full max-w-[1375px] grid-cols-1 gap-5 px-6 pb-24 sm:mt-24 sm:grid-cols-2"
    >
      {CARDS.map((card, i) => (
        <ProjectGridCard
          key={i}
          src={card.src}
          alt={card.alt}
          href={slugs.has(card.slug) ? `/work/${card.slug}` : undefined}
        />
      ))}
    </section>
  );
}
