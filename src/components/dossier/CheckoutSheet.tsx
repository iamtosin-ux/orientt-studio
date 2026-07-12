"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Destination, Hotel } from "@/lib/dossier";
import { hotelTotal, money, shortDate } from "@/lib/dossier";
import HotelArt from "./HotelArt";

export type CheckoutItem = { hotel: Hotel; destination: Destination };
type Phase = "review" | "processing" | "done";

export default function CheckoutSheet({
  open,
  items,
  currency,
  travellers,
  scope,
  onClose,
  onConfirmed,
}: {
  open: boolean;
  items: CheckoutItem[];
  currency: string;
  travellers: string[];
  scope: string; // "the whole experience" | "Fiji" ...
  onClose: () => void;
  onConfirmed: () => void;
}) {
  // Mount the stateful panel only while open so phase/ref reset on each open.
  return (
    <AnimatePresence>
      {open && (
        <Panel
          items={items}
          currency={currency}
          travellers={travellers}
          scope={scope}
          onClose={onClose}
          onConfirmed={onConfirmed}
        />
      )}
    </AnimatePresence>
  );
}

function Panel({
  items,
  currency,
  travellers,
  scope,
  onClose,
  onConfirmed,
}: {
  items: CheckoutItem[];
  currency: string;
  travellers: string[];
  scope: string;
  onClose: () => void;
  onConfirmed: () => void;
}) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("review");
  const [ref] = useState(() => "AN-" + Math.random().toString(36).slice(2, 7).toUpperCase());

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const confirm = () => {
    setPhase("processing");
    window.setTimeout(() => {
      setPhase("done");
      onConfirmed();
    }, 1100);
  };

  const total = items.reduce((s, it) => s + hotelTotal(it.hotel, it.destination), 0);
  const nights = items.reduce((s, it) => s + it.destination.nights, 0);
  const one = items.length === 1;

  return (
    <div className="dossier fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#201d18]/40 backdrop-blur-[3px]"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Reserve ${scope}`}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 44, scale: 0.98, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.98, filter: "blur(6px)" }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.42 }}
        className="relative flex max-h-[88vh] w-full max-w-[464px] flex-col overflow-hidden rounded-t-3xl border border-[var(--line)] bg-[var(--surface)] sm:rounded-3xl"
        style={{ boxShadow: "0 40px 90px -30px rgba(30,27,22,0.6)" }}
      >
        <AnimatePresence mode="wait">
          {phase === "done" ? (
            <motion.div
              key="done"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center px-7 py-12 text-center"
            >
              <motion.span
                initial={reduce ? {} : { scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.4, duration: 0.55, delay: 0.05 }}
                className="grid h-16 w-16 place-items-center rounded-full bg-[var(--brand)] text-white"
                style={{ boxShadow: "0 14px 30px -10px rgba(44,90,218,0.7)" }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.span>
              <h3 className="dossier-display mt-5 font-fraunces text-2xl text-[var(--ink)]">
                {one ? "Your stay is held" : "Your journey is held"}
              </h3>
              <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-[var(--ink-2)]">
                {one
                  ? `${items[0].hotel.name} is reserved.`
                  : `All ${items.length} stays are reserved.`}{" "}
                We&apos;ve emailed {travellers[0].split(" ")[0]} the confirmation and next steps.
              </p>
              <div className="mt-5 rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-2.5 text-[13px] text-[var(--ink-2)]">
                Confirmation <span className="font-semibold tabular-nums text-[var(--ink)]">{ref}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-7 w-full rounded-full bg-[var(--ink)] px-5 py-3 text-[14px] font-medium text-[var(--surface)] transition-transform duration-150 ease-out active:scale-[0.98]"
              >
                Back to dossier
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="review"
              initial={false}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.22 }}
              className="flex min-h-0 flex-col"
            >
              <div className="flex items-start justify-between gap-3 border-b border-[var(--line)] px-6 pb-4 pt-6">
                <div>
                  <h3 className="dossier-display font-fraunces text-xl text-[var(--ink)]">
                    {one ? "Confirm your stay" : "Confirm your journey"}
                  </h3>
                  <p className="mt-1 text-[12px] text-[var(--ink-3)]">
                    {items.length} {one ? "stay" : "stays"} · {nights} nights · {travellers.join(" & ")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[var(--ink-3)] transition-colors hover:bg-[var(--paper-2)] hover:text-[var(--ink)]"
                >
                  ✕
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
                <ul className="flex flex-col gap-3">
                  {items.map(({ hotel, destination }) => (
                    <li key={destination.id} className="flex items-center gap-3">
                      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg ring-1 ring-[var(--line)]">
                        <HotelArt hotel={hotel} grain={false} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-medium text-[var(--ink)]">
                          {hotel.name}
                        </span>
                        <span className="block truncate text-[11px] text-[var(--ink-3)]">
                          {destination.name} · {shortDate(destination.checkIn)}–{shortDate(destination.checkOut)} · {destination.nights} nts
                        </span>
                      </span>
                      <span className="shrink-0 text-[13px] font-medium tabular-nums text-[var(--ink)]">
                        {money(hotelTotal(hotel, destination), currency)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[var(--line)] px-6 pb-6 pt-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[14px] text-[var(--ink-2)]">Total</span>
                  <span className="text-2xl font-semibold tabular-nums text-[var(--ink)]">
                    {money(total, currency)}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-[var(--ink-3)]">
                  Fully refundable until 14 days before arrival.
                </p>
                <button
                  type="button"
                  onClick={confirm}
                  disabled={phase === "processing"}
                  className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-5 py-3.5 text-[14px] font-medium text-white transition-transform duration-150 ease-out active:scale-[0.98] disabled:opacity-80"
                  style={{ boxShadow: "0 14px 32px -12px rgba(44,90,218,0.75)" }}
                >
                  {phase === "processing" ? (
                    <>
                      <Spinner /> Reserving…
                    </>
                  ) : (
                    <>
                      Confirm &amp; hold {one ? "stay" : "all stays"}
                      <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className="animate-spin" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
