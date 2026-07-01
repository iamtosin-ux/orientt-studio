"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative z-10 flex flex-col items-center px-6 pt-[180px] text-center sm:pt-[210px]">
      {/* Headline — mask reveal on load; forced to three lines via <br/> + nowrap */}
      <h1 className="overflow-hidden font-dela leading-[1.25] text-[clamp(1.6rem,4.6vw,58px)] whitespace-normal lg:whitespace-nowrap [padding-bottom:0.12em]">
        <motion.span
          className="block"
          initial={{ y: "115%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
        >
          Design studio built
          <br />
          to help founders
          <br />
          ship ideas at venture speed.
        </motion.span>
      </h1>
    </section>
  );
}
