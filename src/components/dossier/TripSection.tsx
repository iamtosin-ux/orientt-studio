"use client";

import type { Selection, Trip } from "@/lib/dossier";
import { countChosen } from "@/lib/dossier";
import DestinationBlock from "./DestinationBlock";

export default function TripSection({
  trip,
  tripIndex,
  currency,
  selection,
  onSelect,
  onBookDestination,
}: {
  trip: Trip;
  tripIndex: number;
  currency: string;
  selection: Selection;
  onSelect: (destinationId: string, hotelId: string) => void;
  onBookDestination: (destinationId: string) => void;
}) {
  const chosen = countChosen(selection, trip.destinations);

  return (
    <section
      id={trip.id}
      className={`scroll-mt-24 ${tripIndex > 0 ? "mt-16 border-t border-[var(--line)] pt-14" : ""}`}
    >
      {/* trip header */}
      <header className="mb-8">
        <div className="flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--ink-3)]">
          <span>Trip {tripIndex + 1}</span>
          <span className="h-1 w-1 rounded-full bg-[var(--ink-3)]" />
          <span>{trip.dateRange}</span>
        </div>
        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="dossier-display font-fraunces text-[32px] text-[var(--ink)] sm:text-[38px]">
            {trip.name}
          </h2>
          <span className="text-[13px] tabular-nums text-[var(--ink-3)]">
            {chosen}/{trip.destinations.length} destinations chosen
          </span>
        </div>
        <p className="mt-1 font-fraunces text-[16px] italic text-[var(--ink-2)]">
          {trip.tagline}
        </p>
      </header>

      {/* destinations */}
      <div className="space-y-12">
        {trip.destinations.map((destination, i) => (
          <DestinationBlock
            key={destination.id}
            destination={destination}
            index={i}
            currency={currency}
            chosenHotelId={selection[destination.id]}
            onSelect={(hotelId) => onSelect(destination.id, hotelId)}
            onBook={() => onBookDestination(destination.id)}
          />
        ))}
      </div>
    </section>
  );
}
