"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import BookCallButton from "./BookCallButton";

const TABS = ["Basic", "Pro"] as const;

const PLANS = {
  Basic: {
    price: "£3,500",
    features: [
      "Dedicated partnership",
      "One-week trial",
      "Up to 40 design hours / month",
      "Continuous iteration till we hit the mark",
    ],
  },
  Pro: {
    price: "£5,000",
    features: [
      "Dedicated partnership",
      "One-week trial",
      "Up to 60 design hours / month",
      "Continuous iteration till we hit the mark",
    ],
  },
} as const;

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

// Inline pricing card — scroll target for the "Pricing" nav link.
export default function Pricing() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Basic");
  const plan = PLANS[tab];
  const reduce = useReducedMotion();

  // Sliding pill eases between tabs; instant when reduced motion is requested.
  const pillTransition = reduce
    ? { duration: 0 }
    : ({ type: "spring", duration: 0.35, bounce: 0.15 } as const);

  return (
    <div className="w-full max-w-[720px]">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#232324] to-[#3a3a3d] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
        {/* header + tabs */}
        <div className="flex items-center justify-between px-2 py-2">
          <p className="text-base font-semibold text-white">Pricing</p>
          <div className="flex gap-0.5 rounded-xl bg-white/[0.06] p-0.5">
            {TABS.map((t) => {
              const active = t === tab;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`relative rounded-[10px] px-3 py-1 text-sm transition-colors duration-200 ${
                    active ? "font-semibold text-white" : "font-normal text-white/70 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="pricing-tab-pill"
                      transition={pillTransition}
                      className="absolute inset-0 rounded-[10px] border border-white/10 bg-[#27272a]"
                    />
                  )}
                  <span className="relative z-10">{t}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* plan */}
        <div className="mt-1 rounded-2xl border border-white/10 bg-gradient-to-b from-[#161617] to-[#2c2c30] p-5">
          <p className="text-sm text-white/50">Billed monthly</p>
          <motion.div
            key={tab}
            initial={reduce ? false : { opacity: 0, transform: "translateY(6px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mt-1 flex items-end gap-1.5">
              <span className="text-[40px] font-semibold leading-none tracking-[-0.02em] text-white">
                {plan.price}
              </span>
              <span className="pb-1 text-sm font-medium text-white/50">GBP</span>
            </div>

            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full bg-[#079455]">
                    <Check />
                  </span>
                  <span className="text-sm leading-5 text-white/85">{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA — same primary button as the hero, left-aligned */}
        <div className="mt-4 px-1">
          <BookCallButton />
        </div>
      </div>
    </div>
  );
}
