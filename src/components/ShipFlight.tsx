"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

// One full cycle: hold "ship" ~2s, shatter into blocks, assemble into a
// paper plane, fly it off to the right, then reform "ship". Loops forever.
const DURATION = 4.4;
const LOOP = { duration: DURATION, repeat: Infinity, ease: "easeInOut" as const };

// Scatter offsets (px) for the pixel blocks around the word's centre
const BLOCKS = [
  { x: -22, y: -6 },
  { x: -10, y: 5 },
  { x: 2, y: -7 },
  { x: 12, y: 4 },
  { x: 22, y: -4 },
  { x: -2, y: 7 },
];

export default function ShipFlight() {
  const ref = useRef<HTMLSpanElement>(null);
  const [w, setW] = useState(56);

  useEffect(() => {
    if (ref.current) setW(ref.current.offsetWidth);
  }, []);

  const fly = w * 0.75;

  return (
    <span
      ref={ref}
      className="relative inline-block align-baseline font-pixel font-medium"
    >
      {/* spacer reserves the word's box so layout never shifts */}
      <span className="invisible">ship</span>

      {/* the word */}
      <motion.span
        aria-label="ship"
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: [1, 1, 0, 0, 1] }}
        transition={{ ...LOOP, times: [0, 0.46, 0.52, 0.92, 1] }}
      >
        ship
      </motion.span>

      {/* pixel blocks: appear, then gather to centre */}
      {BLOCKS.map((b, i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2 -ml-[3px] -mt-[3px] size-[6px] rounded-[1px] bg-white"
          animate={{
            x: [b.x, b.x, b.x, 0, 0, 0],
            y: [b.y, b.y, b.y, 0, 0, 0],
            opacity: [0, 0, 1, 1, 0, 0],
          }}
          transition={{ ...LOOP, times: [0, 0.5, 0.56, 0.64, 0.7, 1] }}
        />
      ))}

      {/* paper plane: assembles at centre, flies off to the right (using provided SVG) */}
      <motion.span
        aria-hidden
        className="absolute left-1/2 top-1/2 -ml-[10px] -mt-[10px] text-[#eff6ff]"
        style={{ filter: "drop-shadow(0 0 6px rgba(44,90,218,0.55))" }}
        animate={{
          x: [0, 0, 0, fly * 0.5, fly, fly],
          y: [0, 0, 0, -8, -16, -16],
          rotate: [0, 0, 0, -8, -12, -12],
          scale: [0.5, 0.5, 1, 1, 1, 1],
          opacity: [0, 0, 1, 1, 0, 0],
        }}
        transition={{ ...LOOP, times: [0, 0.62, 0.7, 0.84, 0.92, 1] }}
      >
        <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M12.73 31 35.002 9 14.28 22.012 12.73 31Z" fill="currentColor" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/><path d="M5.644 16.876a.5.5 0 0 0-.07.941l5.384 2.34L12.728 31l1.55-8.988 14 6.942a1 1 0 0 0 1.409-.63L35 9 5.644 16.876Z" fill="currentColor" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/><path opacity=".6" d="M14.277 22.012 35 9.5 10.957 20.158" stroke="currentColor" strokeWidth=".7" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </motion.span>
    </span>
  );
}
