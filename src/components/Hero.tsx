"use client";

import Image from "next/image";
import { motion } from "motion/react";

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
  return (
    <section className="relative z-10 flex flex-col items-center px-6 pt-[180px] text-center sm:pt-[210px]">
      <div className="flex w-full max-w-[1000px] flex-col items-center gap-10">
        {/* Headline — mask reveal on load */}
        <h1 className="overflow-hidden font-medium leading-[1.1] text-[clamp(1.97rem,5.4vw,49.5px)] [padding-bottom:0.12em]">
          <motion.span
            className="block"
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          >
            Design studio built to help founders
            <br />
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
      </div>
    </section>
  );
}
