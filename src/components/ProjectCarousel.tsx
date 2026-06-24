import Image from "next/image";

type Card = {
  src: string;
  alt: string;
  /** Tilt in degrees for the fanned-filmstrip feel */
  rotate: number;
  /** Renders the play button + ShowReel.mp4 label */
  showreel?: boolean;
};

const CARDS: Card[] = [
  { src: "/work/card-anecdote.png", alt: "Anecdote dashboard", rotate: -10.2 },
  { src: "/work/retro-computer.png", alt: "Showreel", rotate: 6, showreel: true },
  { src: "/work/card-red-130.png", alt: "Product dashboard", rotate: -8 },
  { src: "/work/retro-computer.png", alt: "Showreel", rotate: -10.2, showreel: true },
  { src: "/work/card-132.png", alt: "Automate browser-based workflows with AI", rotate: 7 },
  { src: "/work/screen-1468.png", alt: "Mobile product view", rotate: -7 },
];

export default function ProjectCarousel() {
  return (
    <section
      aria-label="Selected work"
      className="no-scrollbar relative z-10 mt-16 flex items-center overflow-x-auto px-[max(1.5rem,calc((100vw-1100px)/2))] pb-24 pt-8 sm:mt-24"
    >
      {CARDS.map((card, i) => (
        <article
          key={`${card.src}-${i}`}
          style={{ transform: `rotate(${card.rotate}deg)` }}
          className="group relative flex aspect-[92/91] h-[180px] shrink-0 flex-col items-center gap-1 rounded-[68px_68px_32px_32px] border border-[#333] bg-[#0d0c0c] p-1 transition-[transform,box-shadow] duration-300 ease-out hover:z-10 hover:!rotate-0 hover:shadow-[0_24px_60px_-16px_rgba(0,0,0,0.7)] sm:h-[197px] [&:not(:first-child)]:-ml-6"
        >
          {/* Image — arch shape, inset by the 4px frame padding */}
          <div className="relative w-full flex-1 overflow-hidden rounded-[64px_64px_24px_24px]">
            <Image
              src={card.src}
              alt={card.alt}
              fill
              sizes="200px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            {card.showreel && (
              <>
                <span className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20 transition-transform duration-200 group-hover:scale-110">
                  <Image src="/work/icon-play.svg" alt="" width={18} height={18} />
                </span>
              </>
            )}
          </div>

          {card.showreel && (
            <span className="font-pixel text-[13px] leading-5 tracking-wide text-white/90">
              ShowReel.mp4
            </span>
          )}
        </article>
      ))}
    </section>
  );
}
