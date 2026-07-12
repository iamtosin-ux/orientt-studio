"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Destination } from "@/lib/dossier";
import { findHotel, hotelTotal, money, shortDate } from "@/lib/dossier";
import HotelOptionCard from "./HotelOptionCard";

export default function DestinationBlock({
  destination,
  index,
  currency,
  chosenHotelId,
  onSelect,
  onBook,
}: {
  destination: Destination;
  index: number;
  currency: string;
  chosenHotelId?: string;
  onSelect: (hotelId: string) => void;
  onBook: () => void;
}) {
  const reduce = useReducedMotion();
  const chosen = findHotel(destination, chosenHotelId);
  const cols =
    destination.hotels.length >= 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : "sm:grid-cols-2";

  return (
    <section id={destination.id} className="scroll-mt-24">
      {/* header */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div className="flex items-baseline gap-3">
          <span className="text-[13px] font-medium tabular-nums text-[var(--ink-3)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="dossier-display font-fraunces text-2xl text-[var(--ink)] sm:text-[26px]">
            {destination.name}
          </h3>
          <span className="text-[13px] text-[var(--ink-3)]">{destination.area}</span>
        </div>
        <span className="text-[13px] tabular-nums text-[var(--ink-2)]">
          {shortDate(destination.checkIn)} – {shortDate(destination.checkOut)}
          <span className="text-[var(--ink-3)]"> · {destination.nights} nights</span>
        </span>
      </div>
      <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[var(--ink-2)]">
        {destination.note}
      </p>

      {/* options — choose one */}
      <div
        role="radiogroup"
        aria-label={`Hotels in ${destination.name}`}
        className={`mt-5 grid grid-cols-1 gap-4 ${cols}`}
      >
        {destination.hotels.map((hotel) => (
          <HotelOptionCard
            key={hotel.id}
            hotel={hotel}
            destination={destination}
            currency={currency}
            selected={hotel.id === chosenHotelId}
            onSelect={() => onSelect(hotel.id)}
          />
        ))}
      </div>

      {/* choice summary + single-destination booking */}
      <div className="mt-4 flex min-h-[40px] flex-wrap items-center justify-between gap-3">
        <AnimatePresence mode="wait" initial={false}>
          {chosen ? (
            <motion.p
              key="chosen"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="text-[13px] text-[var(--ink-2)]"
            >
              Chosen&nbsp;·&nbsp;
              <span className="font-medium text-[var(--ink)]">{chosen.name}</span>
              <span className="text-[var(--ink-3)]">
                {" "}
                — {money(hotelTotal(chosen, destination), currency)} for{" "}
                {destination.nights} nights
              </span>
            </motion.p>
          ) : (
            <motion.p
              key="empty"
              initial={reduce ? { opacity: 0 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[13px] text-[var(--ink-3)]"
            >
              Choose where to stay in {destination.name}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {chosen && (
            <motion.button
              key="book"
              type="button"
              onClick={onBook}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", bounce: 0, duration: 0.32 }}
              className="group inline-flex items-center gap-1.5 rounded-full border border-[var(--line-2)] bg-[var(--surface)] px-4 py-2 text-[13px] font-medium text-[var(--ink)] transition-transform duration-150 ease-out active:scale-[0.97]"
            >
              Book {destination.name} only
              <span className="text-[var(--ink-3)] transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
