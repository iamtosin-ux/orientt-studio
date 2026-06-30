"use client";

import { useEffect, useRef, useState } from "react";

// Site accent: #2c5ada (blue), supporting indigo/violet
const STAR_COUNT = 70;
const SPOTLIGHT_INTENSITY = 0.7;
const FLARE_SPEED = 0.4;
const FLARE_INTENSITY = 0.18;

type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  twinkleSpeed: number;
  twinkleOffset: number;
};

function makeStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.4,
    twinkleSpeed: Math.random() * 0.02 + 0.008,
    twinkleOffset: Math.random() * Math.PI * 2,
  }));
}

// Mountain silhouette as SVG path (two overlapping ridgelines)
const MOUNTAIN_PATH =
  "M0,100 L0,72 L6,65 L12,58 L18,62 L24,52 L30,44 L36,55 L40,50 " +
  "L46,40 L52,30 L58,42 L64,35 L70,48 L76,38 L82,46 L88,32 L94,44 " +
  "L100,38 L100,100 Z";

const MOUNTAIN_PATH_BG =
  "M0,100 L0,82 L8,76 L16,70 L22,74 L30,66 L38,72 L44,64 L52,58 " +
  "L60,62 L66,56 L74,60 L82,52 L90,58 L96,54 L100,56 L100,100 Z";

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [flareTime, setFlareTime] = useState(0);
  const [stars] = useState(() => makeStars(STAR_COUNT));

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const tick = () => {
      setFlareTime((t) => {
        const next = t + 0.01 * FLARE_SPEED;
        return next > 100 ? 0 : next;
      });
      setSpotlightPos((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.06,
        y: prev.y + (mousePosition.y - prev.y) * 0.06,
      }));
      animationRef.current = requestAnimationFrame(tick);
    };
    animationRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationRef.current);
  }, [mousePosition.x, mousePosition.y]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ background: "#070b14" }}
    >
      {/* Deep sky gradient — blues/indigo matching site accent */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 140% 60% at 50% 0%,
              rgba(44, 90, 218, 0.45) 0%,
              rgba(60, 40, 160, 0.28) 35%,
              rgba(10, 10, 30, 0.0) 70%),
            radial-gradient(ellipse 80% 40% at 30% 20%,
              rgba(80, 120, 255, 0.2) 0%,
              transparent 60%),
            radial-gradient(ellipse 60% 35% at 70% 25%,
              rgba(100, 60, 200, 0.18) 0%,
              transparent 55%)
          `,
        }}
      />

      {/* Twinkling stars — concentrated in upper 65% */}
      <div className="absolute inset-0">
        {stars.map((star) => {
          const twinkle = Math.sin(flareTime * star.twinkleSpeed + star.twinkleOffset);
          if (star.y > 65) return null;
          return (
            <div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: 0.25 + 0.45 * twinkle,
                boxShadow: `0 0 ${star.size * 2}px rgba(180, 200, 255, ${0.15 + 0.25 * twinkle})`,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}
      </div>

      {/* Aurora light flares — blue / indigo / violet palette */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(88deg,
              transparent ${18 + ((flareTime * 28) % 82)}%,
              rgba(44, 90, 218, ${(0.7 + Math.sin(flareTime * 0.35) * 0.3) * FLARE_INTENSITY}) ${23 + ((flareTime * 28) % 82)}%,
              rgba(44, 90, 218, ${(0.45 + Math.sin(flareTime * 0.35) * 0.2) * FLARE_INTENSITY}) ${33 + ((flareTime * 28) % 82)}%,
              transparent ${43 + ((flareTime * 28) % 82)}%),
            linear-gradient(84deg,
              transparent ${12 + ((flareTime * 22) % 88)}%,
              rgba(120, 80, 255, ${(0.6 + Math.cos(flareTime * 0.28) * 0.25) * FLARE_INTENSITY}) ${17 + ((flareTime * 22) % 88)}%,
              rgba(120, 80, 255, ${(0.35 + Math.cos(flareTime * 0.28) * 0.15) * FLARE_INTENSITY}) ${27 + ((flareTime * 22) % 88)}%,
              transparent ${38 + ((flareTime * 22) % 88)}%),
            linear-gradient(93deg,
              transparent ${8 + ((flareTime * 32) % 78)}%,
              rgba(80, 140, 255, ${(0.5 + Math.sin(flareTime * 0.45) * 0.22) * FLARE_INTENSITY}) ${13 + ((flareTime * 32) % 78)}%,
              rgba(80, 140, 255, ${(0.3 + Math.sin(flareTime * 0.45) * 0.12) * FLARE_INTENSITY}) ${23 + ((flareTime * 32) % 78)}%,
              transparent ${33 + ((flareTime * 32) % 78)}%)
          `,
          mixBlendMode: "screen",
          mask: "linear-gradient(to bottom, white 0%, white 50%, transparent 75%)",
          WebkitMask: "linear-gradient(to bottom, white 0%, white 50%, transparent 75%)",
        }}
      />

      {/* Cursor spotlight vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%,
            transparent 0%,
            transparent 12%,
            rgba(5, 8, 20, ${0.28 * SPOTLIGHT_INTENSITY}) 38%,
            rgba(5, 8, 25, ${0.55 * SPOTLIGHT_INTENSITY}) 65%,
            rgba(5, 8, 30, ${0.75 * SPOTLIGHT_INTENSITY}) 100%)`,
          mixBlendMode: "multiply",
          transition: "background 0.12s ease-out",
        }}
      />

      {/* Soft cursor glow */}
      <div
        className="absolute"
        style={{
          left: `${spotlightPos.x}%`,
          top: `${spotlightPos.y}%`,
          width: "240px",
          height: "240px",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle,
            rgba(100, 140, 255, ${0.12 * SPOTLIGHT_INTENSITY}) 0%,
            rgba(80, 100, 220, ${0.06 * SPOTLIGHT_INTENSITY}) 35%,
            transparent 70%)`,
          filter: "blur(24px)",
          transition: "all 0.12s ease-out",
        }}
      />

      {/* Mountain silhouette — back ridge (slightly lighter) */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ height: "38%" }}
      >
        <path d={MOUNTAIN_PATH_BG} fill="rgba(15, 18, 35, 0.6)" />
      </svg>

      {/* Mountain silhouette — front ridge (dark, matches page bg) */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ height: "32%" }}
      >
        <path d={MOUNTAIN_PATH} fill="#101010" />
      </svg>

      {/* Bottom fade — blends into #101010 page background */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "35%",
          background: "linear-gradient(to bottom, transparent 0%, #101010 100%)",
        }}
      />
    </div>
  );
}
