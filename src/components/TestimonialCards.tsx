type Quote = {
  lead?: string; // bold opening phrase
  text: string;
  name: string;
  avatar?: string;
};

const QUOTES: Quote[] = [
  {
    lead: "This looks so great!",
    text: "I also love that you put this in a demo video I appreciate it ty",
    name: "Omar Draz",
    avatar: "/work/avatar-omar.jpg",
  },
  {
    text: "Just demo'd with Nolan Transportation Group (they move 80,000 shipments per month). They said this is hands down the most functional, versatile and well-designed tool they've seen - and they've demo'd Highway, Tenstreet, Verified Carrier and others. They probably said 4 times just how impressive our platform is and that they'd like to do a pilot for USPS loads to start.",
    name: "Zach En'Wezoh",
    avatar: "/work/avatar-zach.jpg",
  },
];

const cardBase =
  "flex w-full flex-col justify-end rounded-[21px] border-2 border-[#818080] px-4 shadow-[0_14px_48px_-12px_rgba(10,13,18,0.58),0_4px_4px_-2px_rgba(10,13,18,0.04)]";

// Per-card treatment from the Figma frame: the second card is tilted and
// fades to a darker end stop.
const CARD_STYLES = [
  {
    className: `${cardBase} gap-3 py-3.5`,
    background: "linear-gradient(94deg, #656565 32.9%, #3D3C3D 135.47%)",
  },
  {
    // Tilted and pulled up so its top edge overlaps the first card's bottom.
    className: `${cardBase} relative z-10 -mt-3 gap-2 py-3 -rotate-[2.581deg]`,
    background: "linear-gradient(94deg, #656565 32.9%, #2C2B2C 135.47%)",
  },
];

function Avatar({ name, src }: { name: string; src?: string }) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        className="size-[33px] shrink-0 rounded-full bg-neutral-300 object-cover outline outline-1 -outline-offset-1 outline-black/10"
      />
    );
  }
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <span
      aria-hidden
      className="grid size-[33px] shrink-0 place-items-center rounded-full bg-neutral-300 text-xs font-semibold text-neutral-700"
    >
      {initials}
    </span>
  );
}

// Right-hand panel of the testimonial section: stacked, overlapping quote cards.
export default function TestimonialCards() {
  return (
    <div className="flex h-full flex-col justify-center rounded-[28px] bg-[rgba(13,12,12,0.80)] px-3 py-4 outline outline-1 -outline-offset-1 outline-white/10 sm:px-4">
      <div className="flex flex-col">
        {QUOTES.map((q, i) => (
          <figure
            key={q.name}
            className={CARD_STYLES[i % CARD_STYLES.length].className}
            style={{ background: CARD_STYLES[i % CARD_STYLES.length].background }}
          >
            <blockquote className="text-pretty text-sm leading-[1.6] text-white/90">
              {q.lead && <strong className="font-semibold text-white">{q.lead}</strong>}{" "}
              {q.text}
            </blockquote>
            <figcaption className="flex items-center gap-2 text-sm text-white/85">
              <Avatar name={q.name} src={q.avatar} />
              {q.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
