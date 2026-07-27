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
  // Critically damped spring (bounce 0) — physical, interruptible entrance that
  // starts from the current value. Apple §4: behaviour over fixed-duration tweens.
  const rise = (delay: number) => ({
    initial: { opacity: 0, transform: reduce ? "translateY(0px)" : "translateY(16px)" },
    animate: { opacity: 1, transform: "translateY(0px)" },
    transition: reduce
      ? { duration: 0.3, ease: EASE, delay }
      : { type: "spring" as const, bounce: 0, duration: 0.6, delay },
  });

  // Cal.com popup — "Book a call" opens the calendar in a modal overlay.
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", { theme: "dark", hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <section className="max-w-[720px]">
      <motion.h1
        {...rise(0)}
        className="text-balance text-[clamp(2rem,5vw,52px)] font-semibold leading-[1.08] tracking-[-0.02em]"
      >
        Design studio{" "}
        <EditableCopy initial="built" />
        <br />
        to help founders ship <br /> ideas at venture speed.
      </motion.h1>

      <motion.p
        {...rise(0.1)}
        className="mt-5 max-w-[560px] text-base leading-7 text-white/55"
      >
        We turn complex concepts into validated, market-ready products,
        prioritising long-term success.
        <br />
        <br />
        Currently partnering with category-defining teams to build from standout
        marketing websites to refined product UI, focusing on thoughtful
        execution and a deep care for craft.
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
