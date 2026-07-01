"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function AnimatedBackground() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 40, damping: 20 });
  const py = useSpring(my, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 40);
      my.set((e.clientY / window.innerHeight - 0.5) * 30);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      style={{ x: px, y: py }}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Horizon glow */}
      <motion.div
        animate={{ scaleX: [1, 1.1, 1], opacity: [0.55, 0.8, 0.55] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-22%] left-1/2 h-[62vh] w-[130vw] -translate-x-1/2 rounded-[50%] blur-[130px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(44,90,218,0.55), rgba(44,90,218,0.12) 60%, transparent)",
        }}
      />
      {/* Drifting aurora blobs */}
      <motion.div
        animate={{ x: [0, 70, 0], y: [0, -34, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[2%] left-[18%] h-[42vh] w-[42vw] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(closest-side, rgba(74,118,240,0.32), transparent)" }}
      />
      <motion.div
        animate={{ x: [0, -56, 0], y: [0, 22, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-4%] right-[14%] h-[38vh] w-[38vw] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(closest-side, rgba(120,80,220,0.26), transparent)" }}
      />
    </motion.div>
  );
}
