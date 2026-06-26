import type { ProjectMeta } from "@/lib/work";
import ProjectGridCard from "./ProjectGridCard";

type Card = {
  src: string;
  alt: string;
  /** Case study slug this tile links to */
  slug: string;
  /** Optional looping video shown instead of the image */
  video?: string;
  /** If true, shows "Coming soon" overlay */
  comingSoon?: boolean;
};

// 2x2 showcase grid. Only the first tile (Indemni) is live with "View case study";
// the rest show "Coming soon".
const CARDS: Card[] = [
  { src: "/work/work-1.png", alt: "Knowledge engine dashboard", slug: "indemni", comingSoon: true },
  { src: "/work/work-2.png", alt: "Indemni shipments dashboard", slug: "indemni" },
  { src: "/work/work-3.png", alt: "Indemni mobile app", slug: "indemni", video: "/work/showreel.mp4", comingSoon: true },
  { src: "/work/work-4.png", alt: "Project tile 4", slug: "indemni", comingSoon: true },
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
          video={card.video}
          comingSoon={card.comingSoon}
          href={slugs.has(card.slug) && !card.comingSoon ? `/work/${card.slug}` : undefined}
        />
      ))}
    </section>
  );
}
