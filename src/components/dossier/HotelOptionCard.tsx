"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Destination, Hotel } from "@/lib/dossier";
import { hotelTotal, money } from "@/lib/dossier";
import HotelArt from "./HotelArt";

export default function HotelOptionCard({
  hotel,
  destination,
  currency,
  selected,
  onSelect,
}: {
  hotel: Hotel;
  destination: Destination;
  currency: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const reduce = useReducedMotion();
  const total = hotelTotal(hotel, destination);

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onPointerDown={onSelect}
      className="group relative flex h-full flex-col overflow-hidden rounded-[18px] bg-[var(--surface)] text-left outline-none transition-transform duration-150 ease-out will-change-transform active:scale-[0.985]"
      style={{
        boxShadow: selected
          ? "0 1px 2px rgba(30,27,22,0.05), 0 18px 40px -18px rgba(30,27,22,0.35)"
          : "0 1px 2px rgba(30,27,22,0.05), 0 10px 24px -18px rgba(30,27,22,0.28)",
      }}
    >
      {/* resting border + animated selection ring share the same rounded box */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-[18px] ring-1 ring-inset ring-[var(--line)]"
      />
      {selected && (
        <motion.span
          aria-hidden
          layoutId={`sel-${destination.id}`}
          className="pointer-events-none absolute inset-0 z-20 rounded-[18px] ring-2 ring-inset ring-[var(--brand)]"
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", bounce: 0, duration: 0.35 }
          }
        />
      )}

      {/* cover */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <HotelArt hotel={hotel} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />

        {/* rating */}
        <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-full bg-white/85 px-2 py-0.5 text-[11px] font-medium tabular-nums text-[var(--ink)] shadow-sm backdrop-blur-sm">
          <Star /> {hotel.rating.toFixed(1)}
        </span>

        {/* radio indicator */}
        <span
          className={`absolute right-2.5 top-2.5 z-30 grid h-6 w-6 place-items-center rounded-full border transition-colors duration-200 ${
            selected
              ? "border-transparent bg-[var(--brand)] text-white"
              : "border-white/70 bg-black/15 text-transparent backdrop-blur-sm"
          }`}
        >
          <motion.svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            initial={false}
            animate={{ scale: selected ? 1 : 0.4, opacity: selected ? 1 : 0 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          >
            <path
              d="M2.5 6.2l2.3 2.3L9.5 3.5"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </span>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-4">
        <h4 className="text-[15px] font-semibold leading-tight tracking-[-0.01em] text-[var(--ink)]">
          {hotel.name}
        </h4>
        <p className="mt-0.5 text-[12px] text-[var(--ink-3)]">{hotel.roomType}</p>
        <p className="mt-2 line-clamp-2 min-h-[34px] text-[13px] leading-snug text-[var(--ink-2)]">
          {hotel.blurb}
        </p>

        <div className="mt-3 flex items-end justify-between border-t border-[var(--line)] pt-3">
          <div>
            <span className="text-[15px] font-semibold tabular-nums text-[var(--ink)]">
              {money(hotel.pricePerNight, currency)}
            </span>
            <span className="text-[12px] text-[var(--ink-3)]"> / night</span>
          </div>
          <div className="text-right">
            <div className="text-[13px] font-medium tabular-nums text-[var(--ink)]">
              {money(total, currency)}
            </div>
            <div className="text-[11px] text-[var(--ink-3)]">{destination.nights} nights</div>
          </div>
        </div>
      </div>
    </button>
  );
}

function Star() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="text-amber-500">
      <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
    </svg>
  );
}
