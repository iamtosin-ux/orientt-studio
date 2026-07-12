"use client";

import { useMemo, useState } from "react";
import type { Dossier, Selection } from "@/lib/dossier";
import { countChosen, findHotel, selectionTotal } from "@/lib/dossier";
import DossierIndex from "./DossierIndex";
import TripSection from "./TripSection";
import BookingBar from "./BookingBar";
import CheckoutSheet, { type CheckoutItem } from "./CheckoutSheet";

export default function DossierExperience({ dossier }: { dossier: Dossier }) {
  const destinations = useMemo(
    () => dossier.trips.flatMap((t) => t.destinations),
    [dossier],
  );
  const currency = dossier.currency;

  const [selection, setSelection] = useState<Selection>({});
  const [checkout, setCheckout] = useState<{ items: CheckoutItem[]; scope: string } | null>(
    null,
  );

  const chosenCount = countChosen(selection, destinations);
  const total = selectionTotal(selection, destinations);
  const spanLabel = `${dossier.trips[0].dateRange} – ${
    dossier.trips[dossier.trips.length - 1].dateRange
  }`;

  const select = (destinationId: string, hotelId: string) =>
    setSelection((prev) => ({
      ...prev,
      // re-selecting the same option clears it
      [destinationId]: prev[destinationId] === hotelId ? undefined : hotelId,
    }));

  const bookDestination = (destinationId: string) => {
    const destination = destinations.find((d) => d.id === destinationId);
    const hotel = destination && findHotel(destination, selection[destinationId]);
    if (!destination || !hotel) return;
    setCheckout({ items: [{ hotel, destination }], scope: destination.name });
  };

  const bookAll = () => {
    const items: CheckoutItem[] = [];
    for (const destination of destinations) {
      const hotel = findHotel(destination, selection[destination.id]);
      if (hotel) items.push({ hotel, destination });
    }
    if (items.length) setCheckout({ items, scope: "the whole experience" });
  };

  const guide = () => {
    const next = destinations.find((d) => !selection[d.id]);
    if (next) document.getElementById(next.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="dossier min-h-screen">
      <div className="mx-auto w-full max-w-[1120px] px-5 pb-36 pt-12 sm:px-8 sm:pt-16">
        {/* header */}
        <header className="max-w-2xl">
          <div className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-[var(--ink-3)]">
            <span>{dossier.curator}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--ink-3)]" />
            <span>Travel dossier</span>
          </div>
          <h1 className="dossier-display mt-4 font-fraunces text-[52px] text-[var(--ink)] sm:text-[64px]">
            {dossier.title}
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--ink-2)]">
            {dossier.intro}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[var(--ink-3)]">
            <span className="tabular-nums">{dossier.trips.length} trips</span>
            <span className="h-1 w-1 rounded-full bg-[var(--ink-3)]" />
            <span className="tabular-nums">{destinations.length} destinations</span>
            <span className="h-1 w-1 rounded-full bg-[var(--ink-3)]" />
            <span>{spanLabel}</span>
          </div>
        </header>

        {/* body */}
        <div className="mt-12 grid grid-cols-1 gap-x-14 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-10">
              <DossierIndex trips={dossier.trips} selection={selection} />
            </div>
          </aside>

          <div className="min-w-0">
            {dossier.trips.map((trip, i) => (
              <TripSection
                key={trip.id}
                trip={trip}
                tripIndex={i}
                currency={currency}
                selection={selection}
                onSelect={select}
                onBookDestination={bookDestination}
              />
            ))}
          </div>
        </div>
      </div>

      <BookingBar
        chosenCount={chosenCount}
        totalCount={destinations.length}
        total={total}
        currency={currency}
        onBookAll={bookAll}
        onGuide={guide}
      />

      <CheckoutSheet
        open={checkout !== null}
        items={checkout?.items ?? []}
        scope={checkout?.scope ?? ""}
        currency={currency}
        travellers={dossier.travellers}
        onClose={() => setCheckout(null)}
        onConfirmed={() => {
          /* keep selections; a real app would mark them booked */
        }}
      />
    </div>
  );
}
