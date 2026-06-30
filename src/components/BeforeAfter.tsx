"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";

export default function BeforeAfter({
  before,
  after,
}: {
  before: string;
  after: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  // Scroll-driven reveal — progresses as the section crosses the middle of the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"],
  });
  const scrollPos = useTransform(scrollYProgress, [0, 1], [100, 0]);

  // Drag-driven reveal — takes over the moment the user grabs the handle.
  const dragPos = useMotionValue(0);
  const pos = useTransform([scrollPos, dragPos], ([s, d]) =>
    dragging ? (d as number) : (s as number),
  );
  const clip = useTransform(pos, (p) => `inset(0 ${100 - p}% 0 0)`);
  const left = useTransform(pos, (p) => `${p}%`);

  const move = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    dragPos.set(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={ref}
      className="relative mt-10 w-full cursor-ew-resize select-none overflow-hidden"
      onMouseDown={(e) => {
        setDragging(true);
        move(e.clientX);
      }}
      onMouseMove={(e) => e.buttons === 1 && move(e.clientX)}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchStart={(e) => {
        setDragging(true);
        move(e.touches[0].clientX);
      }}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      onTouchEnd={() => setDragging(false)}
    >
      {/* after — bottom layer, sets the height */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt="After" draggable={false} className="block w-full" />
      {/* before — top layer, wiped away by drag or scroll progress */}
      <motion.img
        src={before}
        alt="Before"
        draggable={false}
        className="absolute inset-0 block h-full w-full object-cover object-top"
        style={{ clipPath: clip }}
      />

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-[#101010] shadow">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-[#101010] shadow">
        After
      </span>

      {/* divider + handle */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white"
        style={{ left }}
      />
      <motion.div
        className="pointer-events-none absolute top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#4a76f0] text-white shadow-lg ring-2 ring-white/80"
        style={{ left }}
      >
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path
            d="M8 6 4 10l4 4M12 6l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}
