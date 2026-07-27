"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CAL_LINK, X_URL } from "@/lib/links";

const EASE = [0.22, 1, 0.36, 1] as const;

// 3×3 dot grid — colour inherited from the button (light on hero, dark on panel).
function GridIcon() {
  return (
    <span className="grid grid-cols-3 gap-[3.5px]">
      {Array.from({ length: 9 }).map((_, i) => (
        <span key={i} aria-hidden className="block size-[3.5px] rounded-full bg-current" />
      ))}
    </span>
  );
}

function UpRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Grid trigger + expanding menu panel. `openUp` flips it to grow upward (for the
// bottom bar); `onLight` uses dark dots for placement on a light surface.
export default function TopMenu({ openUp = false, onLight = false }: { openUp?: boolean; onLight?: boolean }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const item =
    "block w-full py-1 text-left text-[26px] font-medium leading-[1.3] tracking-[-0.01em] text-[#101010] transition-colors duration-150 hover:text-black/55";
  const close = () => setOpen(false);

  const btnColor = open
    ? "text-[#101010]"
    : onLight
      ? "text-[#101010]/70 hover:text-[#101010]"
      : "text-white/80 hover:text-white";

  const panelPos = openUp
    ? "-bottom-3 -right-3 origin-bottom-right px-6 pt-6 pb-14"
    : "-top-3 -right-3 origin-top-right px-6 pt-7 pb-6";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className={`relative z-50 grid size-9 place-items-center rounded-full transition-colors duration-200 active:scale-95 ${btnColor}`}
      >
        <GridIcon />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: reduce ? 1 : 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduce ? 1 : 0.95, transition: { duration: 0.13, ease: "easeOut" } }}
            transition={{ duration: 0.26, ease: EASE }}
            style={{ transformOrigin: openUp ? "bottom right" : "top right" }}
            // Translucent material (§12): bright top edge + depth shadow; the
            // .glass-panel utility carries the blur and a reduced-transparency fallback.
            className={`absolute z-40 w-[248px] rounded-[28px] glass-panel text-[#101010] ring-1 ring-black/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_24px_60px_-16px_rgba(0,0,0,0.55)] ${panelPos}`}
          >
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.045, delayChildren: 0.06 } } }}
              className="flex flex-col gap-0.5"
            >
              {[
                { label: "Work", href: "#work" },
                { label: "Pricing", href: "#pricing" },
              ].map((it) => (
                <motion.a
                  key={it.label}
                  href={it.href}
                  onClick={close}
                  variants={{ hidden: { opacity: 0, y: reduce ? 0 : 6 }, show: { opacity: 1, y: 0 } }}
                  className={item}
                >
                  {it.label}
                </motion.a>
              ))}
              <motion.button
                type="button"
                data-cal-link={CAL_LINK}
                data-cal-config='{"layout":"month_view","theme":"dark"}'
                onClick={close}
                variants={{ hidden: { opacity: 0, y: reduce ? 0 : 6 }, show: { opacity: 1, y: 0 } }}
                className={item}
              >
                Book a Call
              </motion.button>
            </motion.nav>

            <div className="my-4 h-px bg-black/[0.09]" aria-hidden />

            <a
              href={X_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="flex items-center justify-between text-[15px] font-medium text-neutral-500 transition-colors duration-150 hover:text-[#101010]"
            >
              Follow on X
              <UpRight />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
