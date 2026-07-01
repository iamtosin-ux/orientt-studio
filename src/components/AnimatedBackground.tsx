"use client";

import { useEffect, useRef, useState } from "react";

// Tunable defaults (lifted from the v0 prototype's debug panel).
const STAR_COUNT = 180;
const TWINKLE_FRACTION = 0.45; // share of stars that pulse; the rest stay steady
const COLOR_MOVEMENT = 1;
const SPOTLIGHT_INTENSITY = 0.8;
const LIGHT_FLARE_SPEED = 0.5;
const LIGHT_FLARE_INTENSITY = 0.1;

// Liquid displacement: gentle constant ripple, stronger while the cursor moves.
const LIQUID_REST = 5;
const LIQUID_ACTIVE = 24;
const LIQUID_MOVE_WINDOW = 140; // ms since last move to count as "moving"

type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkles: boolean;
  twinkleSpeed: number;
  twinkleOffset: number;
};

// Round to 3 decimals. SSR serializes inline-style floats to ~6 significant
// figures while the client keeps full precision; emitting pre-rounded, short
// values keeps the two identical and avoids star hydration mismatches.
const r3 = (n: number) => Math.round(n * 1000) / 1000;

// Seeded PRNG (mulberry32) so the star field is identical on the server and
// the client — avoids React hydration mismatches that a bare Math.random()
// would cause for an SSR'd "use client" component.
function makeStars(count: number): Star[] {
  let seed = 0x9e3779b9;
  const rand = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rand() * 100,
    y: rand() * 100,
    size: rand() * 1.5 + 0.5,
    baseOpacity: rand() * 0.45 + 0.3,
    twinkles: rand() < TWINKLE_FRACTION,
    twinkleSpeed: rand() * 0.02 + 0.01,
    twinkleOffset: rand() * Math.PI * 2,
  }));
}

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const lastMoveRef = useRef(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 50, y: 50 });
  const [lightFlareTime, setLightFlareTime] = useState(0);
  // Displacement strength for the liquid filter — eases up while the cursor
  // is moving (the "magnetic" stir) and settles to a gentle ambient at rest.
  const [displacement, setDisplacement] = useState(LIQUID_REST);
  const [stars] = useState(() => makeStars(STAR_COUNT));

  useEffect(() => {
    // Track against the viewport — the background is fixed and full-page.
    const handleMouseMove = (e: MouseEvent) => {
      lastMoveRef.current = performance.now();
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("pointermove", handleMouseMove);
    return () => window.removeEventListener("pointermove", handleMouseMove);
  }, []);

  // Flare time advances every frame; spotlight and liquid displacement ease.
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
      const moving = performance.now() - lastMoveRef.current < LIQUID_MOVE_WINDOW;
      const target = moving ? LIQUID_ACTIVE : LIQUID_REST;
      setDisplacement((prev) => prev + (target - prev) * 0.08);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [mousePosition.x, mousePosition.y]);

  return (
    <>
      {/* Liquid displacement filter — turbulence churns continuously (SMIL),
          displacement scale is driven by React state (rises on cursor move). */}
      <svg
        aria-hidden
        className="pointer-events-none fixed"
        width="0"
        height="0"
        style={{ position: "fixed" }}
      >
        <filter id="aurora-liquid" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.012"
            numOctaves={2}
            seed={7}
            stitchTiles="stitch"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="20s"
              values="0.008 0.012; 0.013 0.007; 0.008 0.012"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={displacement}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div
        ref={containerRef}
        aria-hidden
        // Oversized 4% past each edge so the liquid warp never exposes the
        // viewport edge; content layers sit above this via their own z-index.
        className="pointer-events-none fixed -z-10 overflow-hidden"
        style={{
          top: "-4%",
          left: "-4%",
          width: "108%",
          height: "108%",
          opacity: 0.9,
          backgroundImage: "url(/new-aurora-background.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: `hue-rotate(${mousePosition.x * COLOR_MOVEMENT * 0.2}deg) saturate(${
            1 + mousePosition.y * COLOR_MOVEMENT * 0.003
          }) url(#aurora-liquid)`,
          transition: "filter 0.3s ease-out",
        }}
      >
      {/* Blue color wash — the source photo has strong purple/magenta bands;
          a `color` blend shifts those hues toward the site blue while keeping
          the aurora's light/dark structure. Warm flares layer on top of this. */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgb(46, 96, 224)",
          mixBlendMode: "color",
          opacity: 0.6,
        }}
      />

      {/* Star field — some pulse, the rest hold a steady glow */}
      <div className="absolute inset-0">
        {stars.map((star) => {
          const twinkle = star.twinkles
            ? Math.sin(lightFlareTime * star.twinkleSpeed + star.twinkleOffset)
            : 0;
          const opacity = r3(star.twinkles ? star.baseOpacity + 0.35 * twinkle : star.baseOpacity);
          const glow = r3(star.twinkles ? 0.2 + 0.3 * twinkle : 0.25);
          return (
            <div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${r3(star.x)}%`,
                top: `${r3(star.y)}%`,
                width: `${r3(star.size)}px`,
                height: `${r3(star.size)}px`,
                opacity,
                boxShadow: `0 0 ${r3(star.size * 2)}px rgba(255, 255, 255, ${glow})`,
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
              rgba(60, 130, 255, ${(0.6 + Math.sin(lightFlareTime * 0.4) * 0.3) * LIGHT_FLARE_INTENSITY}) ${25 + ((lightFlareTime * 30) % 100)}%,
              rgba(60, 130, 255, ${(0.4 + Math.sin(lightFlareTime * 0.4) * 0.2) * LIGHT_FLARE_INTENSITY}) ${35 + ((lightFlareTime * 30) % 100)}%,
              transparent ${45 + ((lightFlareTime * 30) % 100)}%),
            linear-gradient(85deg,
              transparent ${15 + ((lightFlareTime * 25) % 100)}%,
              rgba(120, 180, 255, ${(0.5 + Math.cos(lightFlareTime * 0.3) * 0.25) * LIGHT_FLARE_INTENSITY}) ${20 + ((lightFlareTime * 25) % 100)}%,
              rgba(120, 180, 255, ${(0.3 + Math.cos(lightFlareTime * 0.3) * 0.15) * LIGHT_FLARE_INTENSITY}) ${30 + ((lightFlareTime * 25) % 100)}%,
              transparent ${40 + ((lightFlareTime * 25) % 100)}%),
            linear-gradient(95deg,
              transparent ${10 + ((lightFlareTime * 35) % 100)}%,
              rgba(231, 201, 163, ${(0.4 + Math.sin(lightFlareTime * 0.5) * 0.2) * LIGHT_FLARE_INTENSITY}) ${15 + ((lightFlareTime * 35) % 100)}%,
              rgba(231, 201, 163, ${(0.25 + Math.sin(lightFlareTime * 0.5) * 0.12) * LIGHT_FLARE_INTENSITY}) ${25 + ((lightFlareTime * 35) % 100)}%,
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
    </>
  );
}
