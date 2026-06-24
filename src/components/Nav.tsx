import Image from "next/image";

const BOOK_A_CALL_URL = "https://cal.com/samuel-tosin/30min";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-2.5 py-6">
      <nav
        className="flex items-center gap-3 rounded-full p-2 backdrop-blur-md"
        style={{ background: "var(--nav-bg)" }}
      >
        {/* Wordmark */}
        <a href="#top" aria-label="orientt — home" className="px-2">
          <Image
            src="/work/logo-orientt.svg"
            alt="orientt"
            width={69}
            height={30}
            priority
          />
        </a>

        {/* Primary CTA */}
        <a
          href={BOOK_A_CALL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-[39px] w-[192px] items-center justify-center gap-2 rounded-[80px] text-accent-fill transition-transform duration-200 ease-out hover:-translate-y-px active:translate-y-0"
          style={{
            boxShadow:
              "0px 2px 5px 0px rgba(44,90,218,0.39), 0px 8px 8px 0px rgba(44,90,218,0.1), 0px 0px 30px 0px rgba(44,90,218,0.2)",
          }}
        >
          {/* white hairline border */}
          <span className="pointer-events-none absolute inset-0 rounded-[80px] shadow-[inset_0_0_0_1px_rgba(255,255,255,1)]" />
          {/* inner blue glow */}
          <span className="pointer-events-none absolute inset-0 rounded-[80px] shadow-[inset_0_0_12px_0_rgba(255,255,255,0.08),inset_0_-8px_32px_0_#2c5ada] transition-shadow duration-200 group-hover:shadow-[inset_0_0_12px_0_rgba(255,255,255,0.12),inset_0_-10px_36px_0_#2c5ada]" />
          <span className="text-sm font-semibold underline decoration-from-font underline-offset-2">
            Book an intro call
          </span>
          <Image
            src="/work/icon-arrow-right.svg"
            alt=""
            width={20}
            height={20}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </a>

        {/* Plus button */}
        <button
          type="button"
          aria-label="Open menu"
          className="relative grid size-10 place-items-center overflow-hidden rounded-full transition-transform duration-200 ease-out hover:scale-105 active:scale-100"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 120%, #4a76f0 0%, #3d5ebb 25%, #314785 45%, #242f50 65%, #1e2436 80%, #18181b 100%)",
            opacity: 0.95,
          }}
        >
          <span className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />
          <Image src="/work/icon-plus.svg" alt="" width={20} height={20} />
        </button>
      </nav>
    </header>
  );
}
