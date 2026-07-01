"use client";

import { useEffect, useRef, useState } from "react";

// Tunable defaults (lifted from the v0 prototype's debug panel).
const STAR_COUNT = 80;
const COLOR_MOVEMENT = 1;
const SPOTLIGHT_INTENSITY = 0.8;
const LIGHT_FLARE_SPEED = 0.5;
const LIGHT_FLARE_INTENSITY = 0.1;

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
    size: Math.random() * 1.5 + 0.5,
    twinkleSpeed: Math.random() * 0.02 + 0.01,
    twinkleOffset: Math.random() * Math.PI * 2,
  }));
}

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 50, y: 50 });
  const [lightFlareTime, setLightFlareTime] = useState(0);
  const [stars] = useState(() => makeStars(STAR_COUNT));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("pointermove", handleMouseMove);
    return () => window.removeEventListener("pointermove", handleMouseMove);
  }, []);

  // Flare time advances every frame; spotlight eases toward the cursor.
  useEffect(() => {
    const animate = () => {
      setLightFlareTime((prev) => {
        const next = prev + 0.01 * LIGHT_FLARE_SPEED;
        return next > 100 ? 0 : next;
      });
      setSpotlightPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.08,
        y: prev.y + (mousePosition.y - prev.y) * 0.08,
      }));
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [mousePosition.x, mousePosition.y]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{
        backgroundImage: "url(/new-aurora-background.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: `hue-rotate(${mousePosition.x * COLOR_MOVEMENT * 0.2}deg) saturate(${
          1 + mousePosition.y * COLOR_MOVEMENT * 0.003
        })`,
        transition: "filter 0.3s ease-out",
      }}
    >
      {/* Twinkling stars */}
      <div className="absolute inset-0">
        {stars.map((star) => {
          const twinkle = Math.sin(lightFlareTime * star.twinkleSpeed + star.twinkleOffset);
          return (
            <div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: 0.3 + 0.4 * twinkle,
                boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${0.2 + 0.3 * twinkle})`,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}
      </div>

      {/* Drifting color flares */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(90deg,
              transparent ${20 + ((lightFlareTime * 30) % 100)}%,
              rgba(0, 255, 150, ${(0.6 + Math.sin(lightFlareTime * 0.4) * 0.3) * LIGHT_FLARE_INTENSITY}) ${25 + ((lightFlareTime * 30) % 100)}%,
              rgba(0, 255, 150, ${(0.4 + Math.sin(lightFlareTime * 0.4) * 0.2) * LIGHT_FLARE_INTENSITY}) ${35 + ((lightFlareTime * 30) % 100)}%,
              transparent ${45 + ((lightFlareTime * 30) % 100)}%),
            linear-gradient(85deg,
              transparent ${15 + ((lightFlareTime * 25) % 100)}%,
              rgba(100, 200, 255, ${(0.5 + Math.cos(lightFlareTime * 0.3) * 0.25) * LIGHT_FLARE_INTENSITY}) ${20 + ((lightFlareTime * 25) % 100)}%,
              rgba(100, 200, 255, ${(0.3 + Math.cos(lightFlareTime * 0.3) * 0.15) * LIGHT_FLARE_INTENSITY}) ${30 + ((lightFlareTime * 25) % 100)}%,
              transparent ${40 + ((lightFlareTime * 25) % 100)}%),
            linear-gradient(95deg,
              transparent ${10 + ((lightFlareTime * 35) % 100)}%,
              rgba(255, 100, 200, ${(0.4 + Math.sin(lightFlareTime * 0.5) * 0.2) * LIGHT_FLARE_INTENSITY}) ${15 + ((lightFlareTime * 35) % 100)}%,
              rgba(255, 100, 200, ${(0.25 + Math.sin(lightFlareTime * 0.5) * 0.12) * LIGHT_FLARE_INTENSITY}) ${25 + ((lightFlareTime * 35) % 100)}%,
              transparent ${35 + ((lightFlareTime * 35) % 100)}%)
          `,
          mixBlendMode: "screen",
          mask: "linear-gradient(to bottom, white 0%, white 60%, transparent 80%)",
          WebkitMask: "linear-gradient(to bottom, white 0%, white 60%, transparent 80%)",
        }}
      />

      {/* Vignette that follows the cursor */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${spotlightPosition.x}% ${spotlightPosition.y}%,
            transparent 0%,
            transparent 15%,
            rgba(0, 0, 20, ${0.3 * SPOTLIGHT_INTENSITY}) 40%,
            rgba(0, 0, 30, ${0.6 * SPOTLIGHT_INTENSITY}) 70%,
            rgba(0, 0, 40, ${0.8 * SPOTLIGHT_INTENSITY}) 100%)`,
          mixBlendMode: "multiply",
          transition: "background 0.1s ease-out",
        }}
      />

      {/* Soft glow at the cursor */}
      <div
        className="absolute"
        style={{
          left: `${spotlightPosition.x}%`,
          top: `${spotlightPosition.y}%`,
          width: "200px",
          height: "200px",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle,
            rgba(255, 255, 255, ${0.1 * SPOTLIGHT_INTENSITY}) 0%,
            rgba(255, 255, 255, ${0.05 * SPOTLIGHT_INTENSITY}) 30%,
            transparent 70%)`,
          filter: "blur(20px)",
          transition: "all 0.1s ease-out",
        }}
      />
    </div>
  );
}
