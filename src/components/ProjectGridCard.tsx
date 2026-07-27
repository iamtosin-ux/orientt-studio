import Image from "next/image";

// Presentational project card — static for now: no links, no hover effects.
// (Interactivity — case-study links, hover chip, toast — intentionally removed;
// restore from git history when cards should be clickable again.)
export default function ProjectGridCard({
  src,
  alt,
  video,
  wide,
}: {
  src: string;
  alt: string;
  href?: string;
  video?: string;
  wide?: boolean;
}) {
  const mediaCls = "absolute inset-0 h-full w-full object-cover";

  return (
    <div
      className={`relative w-full overflow-hidden ${
        wide ? "aspect-[16/9]" : "aspect-[27/20]"
      }`}
    >
      {video ? (
        <video src={video} poster={src} autoPlay muted loop playsInline className={mediaCls} />
      ) : src.endsWith(".webp") ? (
        // animated .webp — plain <img> so the optimizer doesn't flatten it to one frame
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className={mediaCls} />
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
