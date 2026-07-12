"use client";

import { AnimatePresence, motion } from "motion/react";
import type { Selection, Trip } from "@/lib/dossier";
import { findHotel } from "@/lib/dossier";
import HotelArt from "./HotelArt";

function jumpTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function DossierIndex({
  trips,
  selection,
}: {
  trips: Trip[];
  selection: Selection;
}) {
  return (
    <nav aria-label="Dossier contents" className="flex flex-col gap-6 text-[13px]">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--ink-3)]">
        Itinerary
      </p>

      {trips.map((trip) => (
        <div key={trip.id}>
          <button
            type="button"
            onClick={() => jumpTo(trip.id)}
            className="font-fraunces text-[15px] text-[var(--ink)] transition-colors hover:text-[var(--brand-ink)]"
          >
            {trip.name}
          </button>
          <ul className="mt-2 space-y-0.5">
            {trip.destinations.map((d) => {
              const chosen = findHotel(d, selection[d.id]);
              return (
                <li key={d.id}>
                  <button
                    type="button"
                    onClick={() => jumpTo(d.id)}
                    className="group flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-[var(--paper-2)]"
                  >
                    {/* status */}
                    <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
                      <AnimatePresence mode="wait" initial={false}>
                        {chosen ? (
                          <motion.span
                            key="thumb"
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                            className="h-7 w-7 overflow-hidden rounded-md ring-1 ring-[var(--line-2)]"
                          >
                            <HotelArt hotel={chosen} grain={false} />
                          </motion.span>
                        ) : (
                          <motion.span
                            key="dot"
                            initial={false}
                            className="h-2 w-2 rounded-full border border-[var(--line-2)]"
                          />
                        )}
                      </AnimatePresence>
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] text-[var(--ink)]">
                        {d.name}
                      </span>
                      <span
                        className={`block truncate text-[11px] ${
                          chosen ? "text-[var(--brand-ink)]" : "text-[var(--ink-3)]"
                        }`}
                      >
                        {chosen ? chosen.name : "Choose a stay"}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
