import Image from "next/image";
import LazyVideo from "./LazyVideo";

// Presentational project card — static for now: no links, no hover effects.
// (Interactivity — case-study links, hover chip, toast — intentionally removed;
// restore from git history when cards should be clickable again.)
export default function ProjectGridCard({
  src,
  alt,
  video,
  wide,
  animated,
}: {
  src: string;
  alt: string;
  href?: string;
  video?: string;
  wide?: boolean;
  // Set for animated web/gif assets that next/image would flatten to one frame.
  animated?: boolean;
}) {
  const mediaCls = "absolute inset-0 h-full w-full object-cover";

  return (
    <div
      className={`relative w-full overflow-hidden ${
        wide ? "aspect-[16/9]" : "aspect-[27/20]"
      }`}
    >
      {video ? (
        <LazyVideo src={video} poster={src} className={mediaCls} />
      ) : animated ? (
        // Animated asset — plain <img> so the optimizer doesn't flatten it.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading="lazy" decoding="async" className={mediaCls} />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          // Grid is full-bleed: wide card = 100vw, paired cards = ~50vw. Matching
          // sizes (+ higher quality) so next/image serves a sharp source on retina.
          sizes={wide ? "100vw" : "(max-width: 640px) 100vw, 50vw"}
          quality={90}
          className="object-cover"
        />
      )}
    </div>
  );
}
