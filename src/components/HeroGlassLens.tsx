"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const SIZE = 150;

export default function HeroGlassLens() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const r = wrapRef.current?.getBoundingClientRect();
      if (!r) return;
      const inside =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;
      setVisible(inside);
      if (inside) {
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
    >
      <motion.div
        style={{ x: sx, y: sy, width: SIZE, height: SIZE, marginLeft: -SIZE / 2, marginTop: -SIZE / 2 }}
        className={`absolute left-0 top-0 rounded-full border border-white/25 backdrop-blur-[3px] backdrop-brightness-[1.12] backdrop-saturate-[1.5] transition-opacity duration-300 [box-shadow:inset_0_2px_4px_rgba(255,255,255,0.35),inset_0_-6px_14px_rgba(0,0,0,0.25),0_10px_30px_rgba(0,0,0,0.3)] ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* specular highlight */}
        <span className="absolute left-[18%] top-[14%] h-6 w-10 -rotate-12 rounded-full bg-white/30 blur-md" />
        {/* faint chromatic rim */}
        <span className="absolute inset-0 rounded-full [background:conic-gradient(from_210deg,rgba(120,200,255,0.25),rgba(190,140,255,0.18),rgba(255,170,210,0.2),rgba(120,200,255,0.25))] opacity-50 mix-blend-screen [mask:radial-gradient(circle,transparent_64%,#000_72%)]" />
      </motion.div>
    </div>
  );
}
