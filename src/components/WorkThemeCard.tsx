"use client";

import Image from "next/image";
import { useState } from "react";

function Sun() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Moon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
    </svg>
  );
}

// Strong ease-out — cubic-bezier(0.23,1,0.32,1) (animations.dev / STANDARDS.md).
// Starts fast so the crossfade feels responsive, then settles gently. Never
// ease-in on UI: it delays the exact moment the eye is on the change and reads as
// sluggish. (Classes are written as literals below so Tailwind's scanner emits
// them — an interpolated `ease-[${var}]` would never be generated.)

// Sports-performance card that flips between a light- and dark-mode screenshot
// on tap. Both images are stacked and crossfaded (opacity only, GPU-friendly and
// interruptible — a re-tap retargets from the current state, never restarts). A
// single pill shows the *target* mode: moon while light ("tap for dark"), sun
// while dark ("tap for light").
export default function WorkThemeCard({
  light,
  dark,
  alt,
}: {
  light: string;
  dark: string;
  alt: string;
}) {
  const [isDark, setIsDark] = useState(false);

  // 280ms: a touch slower than a dropdown for elegance, still inside the sub-300ms
  // UI budget. Opacity-only, so reduced-motion users get the same gentle crossfade
  // (it's a lighting change, not movement) — only the icon's rotate/scale is gated.
  const fade =
    "object-cover transition-opacity duration-[280ms] ease-[cubic-bezier(0.23,1,0.32,1)]";
  const icon =
    "absolute transition duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]";

  return (
    <button
      type="button"
      onClick={() => setIsDark((v) => !v)}
      aria-pressed={isDark}
      aria-label={`${alt} — ${isDark ? "dark" : "light"} mode. Tap to switch to ${isDark ? "light" : "dark"}.`}
      className="group relative block aspect-[27/20] w-full cursor-pointer overflow-hidden transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.99] motion-reduce:active:scale-100"
    >
      <Image
        src={light}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        quality={90}
        className={`${fade} ${isDark ? "opacity-0" : "opacity-100"}`}
      />
      <Image
        src={dark}
        alt=""
        aria-hidden
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        quality={90}
        className={`${fade} ${isDark ? "opacity-100" : "opacity-0"}`}
      />

      {/* Single toggle showing the mode a tap will switch TO. */}
      <span className="pointer-events-none absolute right-3 top-3 grid size-9 place-items-center overflow-hidden rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md">
        <span
          className={`${icon} ${
            isDark
              ? "opacity-0 motion-safe:-rotate-90 motion-safe:scale-75"
              : "rotate-0 scale-100 opacity-100"
          }`}
        >
          <Moon />
        </span>
        <span
          className={`${icon} ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "opacity-0 motion-safe:rotate-90 motion-safe:scale-75"
          }`}
        >
          <Sun />
        </span>
      </span>
    </button>
  );
}
