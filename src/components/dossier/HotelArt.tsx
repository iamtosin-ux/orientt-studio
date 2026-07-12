import type { Hotel } from "@/lib/dossier";

// Generated cover "photograph" for a hotel: layered gradients with a soft
// horizon, light source, grain and vignette. Reads as vivid imagery inside the
// light card. Swap in a real photo via `hotel.image`. Decorative — a11y hidden.
export default function HotelArt({
  hotel,
  className = "",
  grain = true,
}: {
  hotel: Hotel;
  className?: string;
  grain?: boolean;
}) {
  const { from, via, to, glow } = hotel.palette;

  if (hotel.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={hotel.image}
        alt=""
        aria-hidden
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div aria-hidden className={`relative h-full w-full overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(180deg, ${via} 0%, ${from} 48%, ${to} 100%)` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(58% 44% at 76% 16%, ${glow}d0 0%, transparent 60%), radial-gradient(80% 52% at 22% 110%, ${glow}55 0%, transparent 55%)`,
        }}
      />
      {/* horizon seam */}
      <div
        className="absolute inset-x-0 top-[61%] h-[3px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${glow}aa 45%, ${glow}cc 55%, transparent)`,
          filter: "blur(1.5px)",
          opacity: 0.7,
        }}
      />
      {/* gentle vignette + a light top sheen so it sits cleanly in a white card */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 24%, transparent 58%, rgba(0,0,0,0.28) 100%), linear-gradient(180deg, rgba(255,255,255,0.14), transparent 30%)",
        }}
      />
      {grain && (
        <svg className="absolute inset-0 h-full w-full opacity-[0.1] mix-blend-overlay">
          <filter id={`grain-${hotel.id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#grain-${hotel.id})`} />
        </svg>
      )}
    </div>
  );
}
