"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

const BOOK_A_CALL_URL = "https://cal.com/samuel-tosin/30min";

const SERVICES = ["Product design", "Website", "Mobile apps"];
const PRICING_TABS = ["Basic", "Pro", "One-off"] as const;

const PLANS = {
  Basic: {
    cadence: "Billed Monthly",
    price: "£3500",
    columns: [
      ["Dedicated partnership", "Up to 40hours design hours per month"],
      ["One week trial", "Continuous iteration till we hit the mark"],
    ],
  },
  Pro: {
    cadence: "Billed Monthly",
    price: "£5000",
    columns: [
      ["Dedicated partnership", "Up to 60hours design hours per month"],
      ["One week trial", "Continuous iteration till we hit the mark"],
    ],
  },
  "One-off": {
    cadence: "Starting from",
    price: "£2500",
    columns: [
      ["Scoped per project with clear milestone", "50% on commission"],
      ["One week trial", "Continuous iteration till we hit the mark"],
    ],
  },
} as const;

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4.17 10h11.66M11.67 5.83 15.83 10l-4.16 4.17"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Check() {
  return (
    <svg width="11" height="9" viewBox="0 0 8.75 6.5" fill="none" aria-hidden>
      <path
        d="M1 3.25 3.25 5.5 7.75 1"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Nav() {
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState<(typeof PRICING_TABS)[number]>("Basic");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!expanded) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [expanded]);

  const plan = PLANS[tab];

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-2.5 py-6">
      <motion.nav
        ref={navRef}
        layout
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: expanded ? "rgba(13,12,12,0.6)" : "var(--nav-bg)" }}
        className={`relative flex flex-col overflow-hidden border border-white/[0.08] p-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_8px_40px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl backdrop-saturate-150 ${
          expanded
            ? "w-[636px] max-w-[calc(100vw-1.25rem)] rounded-[28px]"
            : "rounded-full"
        }`}
      >
        {/* Top bar — shared across both states */}
        <motion.div layout="position" className="flex items-center justify-center gap-3 p-1">
          <a href="#top" aria-label="orientt — home" className="px-2">
            <Image src="/work/logo-orientt.svg" alt="orientt" width={69} height={30} priority />
          </a>

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
            <span className="pointer-events-none absolute inset-0 rounded-[80px] shadow-[inset_0_0_0_1px_rgba(255,255,255,1)]" />
            <span className="pointer-events-none absolute inset-0 rounded-[80px] shadow-[inset_0_0_12px_0_rgba(255,255,255,0.08),inset_0_-8px_32px_0_#2c5ada] transition-shadow duration-200 group-hover:shadow-[inset_0_0_12px_0_rgba(255,255,255,0.12),inset_0_-10px_36px_0_#2c5ada]" />
            <span className="text-sm font-semibold underline decoration-from-font underline-offset-2">
              Book an intro call
            </span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              <ArrowRight />
            </span>
          </a>

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? "Close details" : "Open details"}
            aria-expanded={expanded}
            className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full transition-transform duration-200 ease-out hover:scale-105 active:scale-100"
            style={{
              background:
                "radial-gradient(120% 120% at 50% 120%, #4a76f0 0%, #3d5ebb 25%, #314785 45%, #242f50 65%, #1e2436 80%, #18181b 100%)",
            }}
          >
            <span className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]" />
            <motion.span
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
              className="grid place-items-center"
            >
              {/* A rotated plus reads as an "x" when expanded */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M10 4.17v11.66M4.17 10h11.66"
                  stroke="white"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                />
              </svg>
            </motion.span>
          </button>
        </motion.div>

        {/* Expanded panel — height collapse keeps the container shrink in sync with the fade */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.25, ease: "easeInOut" },
              }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-6 px-1 pb-1 pt-5">
              {/* Studio description */}
              <div className="space-y-4 px-[18px] text-[15px] leading-6 text-[#d4d4d8]">
                <p>
                  Orientt Studio is a premier design subscription built to help founders ship
                  at venture speed. We turn complex concepts into validated, market-ready
                  products, prioritising speed-to-market and long-term success.
                </p>
                <p>
                  Currently partnering with category-defining teams across AI Insurance,
                  Travel, Fraud &amp; Compliance, FinTech, OpEx, DevTools, and Health &amp;
                  Sports Performance.
                </p>
              </div>

              {/* Service badges */}
              <div className="flex flex-wrap gap-3 px-[18px]">
                {SERVICES.map((s) => (
                  <span
                    key={s}
                    className="rounded-2xl border border-[#e9eaeb] bg-[#fafafa] px-2 py-0.5 font-inter text-xs font-medium text-[#414651]"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Pricing block */}
              <div className="flex flex-col gap-3 rounded-[20px] bg-gradient-to-b from-[#232324] to-[#3d3d3d] px-2 py-3">
                <div className="flex items-center gap-2.5 px-[9px]">
                  <p className="flex-1 text-sm font-semibold tracking-[-0.01em] text-white">
                    Pricing
                  </p>
                  <div className="flex gap-0.5 rounded-xl bg-white/[0.04] p-0.5">
                    {PRICING_TABS.map((t) => {
                      const active = t === tab;
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTab(t)}
                          className={`rounded-[10px] px-2 py-0.5 text-xs transition-colors ${
                            active
                              ? "border border-[rgba(82,82,91,0.32)] bg-[#27272a] font-semibold text-[#f4f4f5] shadow-[inset_0_2px_0_0_rgba(255,255,255,0.02)]"
                              : "font-normal text-[#f4f4f5]/80 hover:text-[#f4f4f5]"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-6 rounded-xl border-2 border-[rgba(111,111,111,0.6)] bg-gradient-to-b from-[#161617] to-[#3c3c3c] px-2.5 py-3">
                  <div>
                    <p className="text-base leading-8 text-[#71717a]">{plan.cadence}</p>
                    <div className="flex items-end gap-1 font-semibold text-white">
                      <span className="text-[32px] leading-10">{plan.price}</span>
                      <span className="pb-1 text-sm">GBP</span>
                    </div>
                  </div>

                  <div className="flex gap-0.5">
                    {plan.columns.map((col, i) => (
                      <ul key={i} className="flex flex-1 flex-col gap-4">
                        {col.map((f) => (
                          <li key={f} className="flex items-start gap-1.5">
                            <span className="mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full bg-[#079455]">
                              <Check />
                            </span>
                            <span className="text-xs leading-5 text-white">{f}</span>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                </div>
              </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
