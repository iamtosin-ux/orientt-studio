"use client";

import { useRef, useState } from "react";

export default function BeforeAfter({
  before,
  after,
}: {
  before: string;
  after: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);

  const move = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={ref}
      className="relative mt-10 w-full cursor-ew-resize select-none overflow-hidden"
      onMouseDown={(e) => move(e.clientX)}
      onMouseMove={(e) => e.buttons === 1 && move(e.clientX)}
      onTouchStart={(e) => move(e.touches[0].clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
    >
      {/* after — bottom layer, sets the height */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt="After" draggable={false} className="block w-full" />
      {/* before — top layer, clipped to the slider position */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={before}
        alt="Before"
        draggable={false}
        className="absolute inset-0 block h-full w-full object-cover object-top"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-[#101010] shadow">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-[#101010] shadow">
        After
      </span>

      {/* divider + handle */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white"
        style={{ left: `${pos}%` }}
      />
      <div
        className="pointer-events-none absolute top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#4a76f0] text-white shadow-lg ring-2 ring-white/80"
        style={{ left: `${pos}%` }}
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
      </div>
    </div>
  );
}
