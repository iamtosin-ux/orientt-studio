import type { ProjectMeta } from "@/lib/work";
import ProjectGridCard from "./ProjectGridCard";

type Card = {
  src: string;
  alt: string;
  /** Case study slug this tile links to */
  slug: string;
  /** Optional looping video shown instead of the image */
  video?: string;
};

// Live case study leads, full width; the rest follow in a 2x2 grid.
const CARDS: Card[] = [
  { src: "/work/work-2.webp", alt: "Indemni shipments dashboard", slug: "indemni" },
  { src: "/work/work-1.webp", alt: "Knowledge engine dashboard", slug: "indemni" },
  { src: "/work/work-3.webp", alt: "Indemni mobile app", slug: "indemni", video: "/work/showreel.mp4" },
  { src: "/work/work-4.webp", alt: "Skyvern", slug: "indemni" },
  { src: "/work/work-5.webp", alt: "Catapult", slug: "indemni" },
];

export default function ProjectCarousel({ projects }: { projects: ProjectMeta[] }) {
  const slugs = new Set(projects.map((p) => p.slug));
  const [lead, ...rest] = CARDS;

  return (
    <section
      aria-label="Selected work"
      className="relative z-10 mx-auto mt-16 flex w-full max-w-[1375px] flex-col gap-5 px-6 pb-24 sm:mt-24"
    >
      <ProjectGridCard
        src={lead.src}
        alt={lead.alt}
        video={lead.video}
        wide
        href={slugs.has(lead.slug) ? `/work/${lead.slug}` : undefined}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {rest.map((card, i) => (
          <ProjectGridCard
            key={i}
            src={card.src}
            alt={card.alt}
            video={card.video}
            href={undefined}
          />
        ))}
      </div>
    </section>
  );
}
