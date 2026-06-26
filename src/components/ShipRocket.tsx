"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const ROCKET = [
  "    /\\",
  "   |  |",
  "   |::|",
  "   |::|",
  "  /|::|\\",
  " /_|::|_\\",
].join("\n");

// Exhaust frames cycle to make the flames flicker
const FLAMES = [
  ["   )(", "  ( )", "   '"],
  ["  \\|/", "  ) (", "   ."],
  ["   )(", "  )(", "   '"],
  ["  \\|/", "  ( )", "  . ."],
].map((f) => f.join("\n"));

const SMOKE = [
  "  °  ·",
  " · °",
  "  · ·°",
  " °  ·",
];

export default function ShipRocket() {
  const [hovered, setHovered] = useState(false);
  const [frame, setFrame] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!hovered) return;
    timer.current = setInterval(() => setFrame((f) => f + 1), 110);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [hovered]);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="font-pixel font-medium">ship</span>

      <AnimatePresence>
        {hovered && (
          <motion.span
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute bottom-full left-1/2 z-20 -translate-x-1/2 select-none"
          >
            {/* Rising rocket + flame, looping launch */}
            <motion.span
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: -70, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.2, ease: "easeOut", repeat: Infinity }}
              className="block whitespace-pre text-center font-mono text-[7px] leading-[1.05]"
            >
              <span className="block text-sky-200">{ROCKET}</span>
              <span className="block text-orange-400">
                {FLAMES[frame % FLAMES.length]}
              </span>
            </motion.span>

            {/* Smoke puff at the launch pad */}
            <motion.span
              animate={{ opacity: [0.5, 0.15, 0.5] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-pre font-mono text-[7px] leading-none text-white/30"
            >
              {SMOKE[frame % SMOKE.length]}
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
