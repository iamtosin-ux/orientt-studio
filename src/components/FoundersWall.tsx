const BOOK_URL = "https://cal.com/samuel-tosin/30min";

export default function FoundersWall() {
  return (
    <section className="relative z-10 mx-auto flex max-w-[1000px] flex-col items-center px-6 pb-32 pt-16 text-center">
      <h2 className="max-w-3xl text-balance text-[clamp(1.8rem,4vw,38px)] font-normal leading-tight">
        Join founders building the future.
      </h2>
      <p className="mt-5 max-w-2xl text-balance text-lg leading-7 text-white/45">
        We design &amp; build AI-first products for startups and enterprises
        across AI, finance, DevOps, and beyond.
      </p>

      {/* Book a call CTA */}
      <a
        href={BOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative mt-10 flex h-[44px] items-center justify-center gap-2 rounded-[80px] px-6 text-accent-fill transition-transform duration-200 ease-out hover:-translate-y-px active:translate-y-0"
        style={{
          boxShadow:
            "0px 2px 5px 0px rgba(44,90,218,0.39), 0px 8px 8px 0px rgba(44,90,218,0.1), 0px 0px 30px 0px rgba(44,90,218,0.2)",
        }}
      >
        <span className="pointer-events-none absolute inset-0 rounded-[80px] shadow-[inset_0_0_0_1px_rgba(255,255,255,1)]" />
        <span className="pointer-events-none absolute inset-0 rounded-[80px] shadow-[inset_0_0_12px_0_rgba(255,255,255,0.08),inset_0_-8px_32px_0_#2c5ada] transition-shadow duration-200 group-hover:shadow-[inset_0_0_12px_0_rgba(255,255,255,0.12),inset_0_-10px_36px_0_#2c5ada]" />
        <span className="text-sm font-semibold">Book a call</span>
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path
            d="M4.17 10h11.66M11.67 5.83 15.83 10l-4.16 4.17"
            stroke="currentColor"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  );
}
