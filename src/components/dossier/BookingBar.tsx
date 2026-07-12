"use client";

import { motion } from "motion/react";
import { money } from "@/lib/dossier";

export default function BookingBar({
  chosenCount,
  totalCount,
  total,
  currency,
  onBookAll,
  onGuide,
}: {
  chosenCount: number;
  totalCount: number;
  total: number;
  currency: string;
  onBookAll: () => void;
  onGuide: () => void;
}) {
  const allChosen = chosenCount === totalCount;
  const remaining = totalCount - chosenCount;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 sm:pb-6">
      <motion.div
        layout
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="pointer-events-auto flex w-full max-w-[680px] items-center gap-4 rounded-2xl border border-white/60 bg-white/75 p-2.5 pl-4 backdrop-blur-xl"
        style={{
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.9) inset, 0 24px 60px -20px rgba(30,27,22,0.45)",
        }}
      >
        {/* left — progress */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-[13px] text-[var(--ink-2)]">
              <span className="font-semibold tabular-nums text-[var(--ink)]">
                {chosenCount}
              </span>
              <span className="text-[var(--ink-3)]">/{totalCount}</span> chosen
              {chosenCount > 0 && (
                <>
                  <span className="mx-1.5 text-[var(--ink-3)]">·</span>
                  <span className="font-semibold tabular-nums text-[var(--ink)]">
                    {money(total, currency)}
                  </span>
                </>
              )}
            </p>
          </div>
          {/* progress dots — one per destination */}
          <div className="mt-1.5 flex gap-1">
            {Array.from({ length: totalCount }).map((_, i) => (
              <span
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  i < chosenCount ? "bg-[var(--brand)]" : "bg-[var(--line-2)]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* right — CTA */}
        {allChosen ? (
          <button
            type="button"
            onClick={onBookAll}
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[var(--brand)] px-5 py-2.5 text-[13px] font-medium text-white transition-transform duration-150 ease-out active:scale-[0.97]"
            style={{ boxShadow: "0 10px 26px -10px rgba(44,90,218,0.7)" }}
          >
            Reserve all {totalCount}
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onGuide}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-[var(--line-2)] bg-[var(--surface)] px-4 py-2.5 text-[13px] font-medium text-[var(--ink)] transition-transform duration-150 ease-out active:scale-[0.97]"
          >
            {chosenCount === 0 ? "Start choosing" : `Choose ${remaining} more`}
          </button>
        )}
      </motion.div>
    </div>
  );
}
