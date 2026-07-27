"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// Sections tracked below the hero, in order. Progress runs first → last (100%).
const SECTIONS = [
  { id: "work", name: "Work" },
  { id: "services", name: "Services" },
  { id: "pricing", name: "Pricing" },
];

// Floating "liquid glass" status bar: appears once the hero is scrolled past,
// then shows the current section and a green progress ring (Work → Pricing =
// 100%). Hides before it can overlap the footer links.
export default function ScrollProgress() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState(SECTIONS[0].name);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const vh = window.innerHeight;
      const scrollMid = window.scrollY + vh * 0.5;
      const tops = SECTIONS.map((s) => {
        const el = document.getElementById(s.id);
        return el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
      });
      const workY = tops[0];
      const pricingY = tops[tops.length - 1];
      const workTop = document.getElementById("work")?.getBoundingClientRect().top ?? Infinity;
      const footerTop = document.querySelector("footer")?.getBoundingClientRect().top ?? Infinity;

      setVisible(workTop < vh * 0.6 && footerTop > vh - 8);

      const p = pricingY > workY ? (scrollMid - workY) / (pricingY - workY) : 0;
      setProgress(Math.max(0, Math.min(1, p)));

      let active = SECTIONS[0].name;
      for (let i = 0; i < SECTIONS.length; i++) {
        if (scrollMid >= tops[i] - 4) active = SECTIONS[i].name;
      }
      setName(active);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const R = 9;
  const C = 2 * Math.PI * R;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 px-4"
        >
          <div className="flex w-[200px] items-center gap-2.5 rounded-full border border-white/50 bg-white/60 py-2.5 pl-5 pr-3.5 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.45)] backdrop-blur-2xl backdrop-saturate-150">
            <span className="text-[15px] font-medium tracking-[-0.01em] text-[#101010]">{name}</span>
            {/* progress ring — far right */}
            <span className="relative ml-auto grid size-6 shrink-0 place-items-center">
              <svg width="24" height="24" viewBox="0 0 24 24" className="-rotate-90">
                <circle cx="12" cy="12" r={R} fill="none" stroke="rgba(0,0,0,0.14)" strokeWidth="2.5" />
                <circle
                  cx="12"
                  cy="12"
                  r={R}
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - progress)}
                  style={{ transition: "stroke-dashoffset 0.12s linear" }}
                />
              </svg>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
