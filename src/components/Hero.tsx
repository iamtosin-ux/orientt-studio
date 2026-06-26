"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";

// `cls` tunes each logo to the same optical height as Decisional —
// wordmark-only logos (Indemni) read larger, so they get a smaller box.
type Logo = { src: string; alt: string; width: number; height: number; cls: string };

const LOGOS: Logo[] = [
  { src: "/work/logo-indemni.svg", alt: "Indemni", width: 91, height: 16, cls: "h-5" },
  { src: "/work/logo-smobi.svg", alt: "Smobi", width: 89, height: 24, cls: "h-6" },
  { src: "/work/logo-gleam.svg", alt: "Gleam", width: 86, height: 24, cls: "h-6" },
  { src: "/work/logo-decisional.svg", alt: "Decisional", width: 127, height: 24, cls: "h-6" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  // Magnetic follow — content drifts subtly toward the cursor
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 150, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 150, damping: 18, mass: 0.4 });

  function handleMove(e: React.MouseEvent) {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 16);
    my.set(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 16);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="relative z-10 flex flex-col items-center px-6 pt-[180px] text-center sm:pt-[210px]"
    >
      <motion.div
        style={{ x, y }}
        className="flex w-full max-w-[1000px] flex-col items-center gap-10"
      >
        {/* Headline — mask reveal on load */}
        <h1 className="overflow-hidden text-balance font-normal leading-[1.1] text-[clamp(2.625rem,7.2vw,66px)] [padding-bottom:0.12em]">
          <motion.span
            className="block"
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          >
            Design studio built to help founders{" "}
            <span className="font-pixel font-medium">ship</span> ideas at venture
            speed.
          </motion.span>
        </h1>

        <motion.div
          className="flex w-full flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
        >
          <p className="text-lg font-medium">
            Chosen by 10+ companies across AI, Finance, DevOps and more
          </p>
          <div className="flex flex-nowrap items-center justify-center gap-8">
            {LOGOS.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className={`${logo.cls} w-auto shrink-0 opacity-90 transition-opacity duration-200 hover:opacity-100`}
              />
            ))}
            {/* patch = icon + wordmark */}
            <span className="flex shrink-0 items-center gap-2 opacity-90 transition-opacity duration-200 hover:opacity-100">
              <Image
                src="/work/logo-patch-icon.svg"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <Image
                src="/work/logo-patch-text.svg"
                alt="Patch"
                width={64}
                height={20}
                className="h-6 w-auto"
              />
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
