import Image from "next/image";
import ShipRocket from "./ShipRocket";
import HeroGlassLens from "./HeroGlassLens";

// `cls` tunes each logo to the same optical height as Decisional —
// wordmark-only logos (Indemni) read larger, so they get a smaller box.
type Logo = { src: string; alt: string; width: number; height: number; cls: string };

const LOGOS: Logo[] = [
  { src: "/work/logo-indemni.svg", alt: "Indemni", width: 91, height: 16, cls: "h-5" },
  { src: "/work/logo-smobi.svg", alt: "Smobi", width: 89, height: 24, cls: "h-6" },
  { src: "/work/logo-gleam.svg", alt: "Gleam", width: 86, height: 24, cls: "h-6" },
  { src: "/work/logo-decisional.svg", alt: "Decisional", width: 127, height: 24, cls: "h-6" },
];

export default function Hero() {
  return (
    <section className="relative z-10 flex flex-col items-center px-6 pt-[180px] text-center sm:pt-[210px]">
      <HeroGlassLens />
      <div className="flex w-full max-w-[833px] flex-col items-center gap-10">
        <h1 className="text-balance font-normal leading-[1.15] text-[clamp(2rem,5.5vw,50px)]">
          Design studio built to help founders <ShipRocket /> ideas at venture
          speed.
        </h1>

        <div className="flex w-full flex-col items-center gap-6">
          <p className="text-lg font-medium">Trusted by YC-startups</p>
          <div className="flex flex-nowrap items-center justify-center gap-8">
            {LOGOS.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className={`${logo.cls} w-auto shrink-0 opacity-90 transition-opacity duration-200 hover:opacity-100`}
              />
            ))}
            {/* patch = icon + wordmark */}
            <span className="flex shrink-0 items-center gap-2 opacity-90 transition-opacity duration-200 hover:opacity-100">
              <Image
                src="/work/logo-patch-icon.svg"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <Image
                src="/work/logo-patch-text.svg"
                alt="Patch"
                width={64}
                height={20}
                className="h-6 w-auto"
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
