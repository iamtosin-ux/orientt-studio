import Image from "next/image";

type Card = {
  src: string;
  alt: string;
  width: number;
  /** Slight tilt for the playful, scattered feel from the design */
  tilt: string;
  /** Renders the play button + ShowReel.mp4 label overlay */
  showreel?: boolean;
};

const CARDS: Card[] = [
  { src: "/work/card-anecdote.png", alt: "Anecdote dashboard", width: 300, tilt: "-1.2deg" },
  { src: "/work/retro-computer.png", alt: "Showreel", width: 300, tilt: "0.6deg", showreel: true },
  { src: "/work/card-red-130.png", alt: "Product dashboard", width: 440, tilt: "-0.6deg" },
  { src: "/work/retro-computer.png", alt: "Showreel", width: 300, tilt: "1deg", showreel: true },
  { src: "/work/card-132.png", alt: "Automate browser-based workflows with AI", width: 440, tilt: "-0.8deg" },
  { src: "/work/screen-1468.png", alt: "Mobile product view", width: 240, tilt: "0.8deg" },
];

export default function ProjectCarousel() {
  return (
    <section
      aria-label="Selected work"
      className="no-scrollbar relative z-10 mt-16 flex snap-x snap-mandatory items-center gap-5 overflow-x-auto px-[max(1.5rem,calc((100vw-1359px)/2))] pb-24 pt-6 sm:mt-24"
    >
      {CARDS.map((card, i) => (
        <article
          key={`${card.src}-${i}`}
          className="group relative h-[180px] shrink-0 snap-center overflow-hidden rounded-full ring-1 ring-white/10 transition-[transform,box-shadow] duration-300 ease-out hover:z-10 hover:-translate-y-1 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.6)] sm:h-[200px]"
          style={{ width: card.width, transform: `rotate(${card.tilt})` }}
        >
          <Image
            src={card.src}
            alt={card.alt}
            fill
            sizes="440px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {card.showreel && (
            <>
              <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20 transition-transform duration-200 group-hover:scale-110">
                <Image src="/work/icon-play.svg" alt="" width={20} height={20} />
              </span>
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-pixel text-sm tracking-wide text-white/90">
                ShowReel.mp4
              </span>
            </>
          )}
        </article>
      ))}
    </section>
  );
}
