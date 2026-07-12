"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { getCalApi } from "@calcom/embed-react";
import BookCallButton from "./BookCallButton";
import EditableCopy from "./EditableCopy";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  // Full transform strings (not the x/y shorthands) so the entrance is
  // hardware-accelerated — it fires on mount, while the page is still loading.
  const rise = (delay: number) => ({
    initial: { opacity: 0, transform: reduce ? "translateY(0px)" : "translateY(16px)" },
    animate: { opacity: 1, transform: "translateY(0px)" },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  // Cal.com popup — "Book a call" opens the calendar in a modal overlay.
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", { theme: "dark", hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <section className="max-w-[640px]">
      <motion.h1
        {...rise(0)}
        className="text-balance text-[clamp(1.75rem,4.4vw,40px)] font-semibold leading-[1.08] tracking-[-0.02em]"
      >
        <span className="font-fraunces font-light">Design</span> studio{" "}
        <EditableCopy initial="built" />
        <br />
        to help founders ship ideas <br /> at venture speed.
      </motion.h1>

      <motion.p
        {...rise(0.1)}
        className="mt-5 max-w-[560px] text-[15px] leading-6 text-white/55"
      >
        We turn complex concepts into validated, market-ready products,
        prioritising long-term success.
        <br />
        <br />
        Currently partnering with category-defining teams across AI Insurance,
        Travel, Fraud &amp; Compliance, FinTech, OpEx, DevTools, and Health &amp;
        Sports Performance.
      </motion.p>

      <motion.div
        {...rise(0.2)}
        className="mt-7"
      >
        <BookCallButton />
      </motion.div>
    </section>
  );
}
