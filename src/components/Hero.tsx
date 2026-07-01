"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative z-10 flex flex-col items-center px-6 pt-[180px] text-center sm:pt-[210px]">
      <div className="flex w-full max-w-[1000px] flex-col items-center">
        {/* Headline — mask reveal on load */}
        <h1 className="overflow-hidden font-dela leading-[1.1] text-[clamp(1.97rem,5.4vw,49.5px)] [padding-bottom:0.12em]">
          <motion.span
            className="block"
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          >
            Design studio built to help founders
            <br />
            <span className="font-pixel">ship</span> ideas at venture speed.
          </motion.span>
        </h1>
      </div>
    </section>
  );
}
