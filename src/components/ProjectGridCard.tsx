"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function ProjectGridCard({
  src,
  alt,
  href,
}: {
  src: string;
  alt: string;
  href?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Spring lag gives the button its magnetic, trailing feel
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 });

  function handleMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  const card = (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className="group relative aspect-[27/20] w-full overflow-hidden rounded-3xl ring-1 ring-white/10"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, 680px"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      />
      <span className="absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {href && (
        <motion.div
          style={{ x: sx, y: sy }}
          className="pointer-events-none absolute left-0 top-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        >
          <span className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-[80px] border border-white/90 bg-[rgba(16,16,16,0.51)] px-5 py-2 font-pixel text-sm uppercase tracking-wide whitespace-nowrap text-white shadow-[inset_0_0_12px_0_rgba(255,255,255,0.08),inset_0_-8px_32px_0_#101010] backdrop-blur-md">
            View case study
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M4.17 10h11.66M11.67 5.83 15.83 10l-4.16 4.17"
                stroke="currentColor"
                strokeWidth="1.67"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </motion.div>
      )}
    </div>
  );

  return href ? (
    <Link href={href} aria-label={`View case study: ${alt}`} className="block">
      {card}
    </Link>
  ) : (
    card
  );
}
