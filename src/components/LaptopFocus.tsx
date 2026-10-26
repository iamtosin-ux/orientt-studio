"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";

type Pt = [number, number];
export type Quad = [Pt, Pt, Pt, Pt]; // TL, TR, BR, BL

// Projective map from the unit square onto a quad (Heckbert). Rows of a 3×3.
function squareToQuad([[x0, y0], [x1, y1], [x2, y2], [x3, y3]]: Quad) {
  const dx1 = x1 - x2, dx2 = x3 - x2, dy1 = y1 - y2, dy2 = y3 - y2;
  const sx = x0 - x1 + x2 - x3, sy = y0 - y1 + y2 - y3;
  const den = dx1 * dy2 - dx2 * dy1;
  const g = (sx * dy2 - dx2 * sy) / den;
  const h = (dx1 * sy - sx * dy1) / den;
  return [
    [x1 - x0 + g * x1, x3 - x0 + h * x3, x0],
    [y1 - y0 + g * y1, y3 - y0 + h * y3, y0],
    [g, h, 1],
  ];
}

function adjugate(m: number[][]) {
  const [[a, b, c], [d, e, f], [g, h, i]] = m;
  return [
    [e * i - f * h, c * h - b * i, b * f - c * e],
    [f * g - d * i, a * i - c * g, c * d - a * f],
    [d * h - e * g, b * g - a * h, a * e - b * d],
  ];
}

function multiply(a: number[][], b: number[][]) {
  return a.map((row) =>
    [0, 1, 2].map((j) => row[0] * b[0][j] + row[1] * b[1][j] + row[2] * b[2][j]),
  );
}

// CSS matrix3d that warps quad `from` onto quad `to` (transform-origin 0 0).
function warp(from: Quad, to: Quad) {
  const m = multiply(squareToQuad(to), adjugate(squareToQuad(from)));
  const n = m.map((row) => row.map((v) => v / m[2][2]));
  return `matrix3d(${n[0][0]},${n[1][0]},0,${n[2][0]},${n[0][1]},${n[1][1]},0,${n[2][1]},0,0,1,0,${n[0][2]},${n[1][2]},0,1)`;
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;

// Pinned scroll lengths in svh: zoom in, hold (screen content scrolls), zoom out.
const ZOOM_VH = 90;
const HOLD_VH = 500;

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

// Scroll-pinned laptop photo: as the section scrolls through, the tilted screen
// is warped flat and zoomed until it fills the frame, holds while `content`
// (a full-page screenshot) scrolls on the screen, then zooms back out.
export default function LaptopFocus({
  src,
  alt,
  width,
  height,
  screen,
  screenAspect = 16 / 10,
  content,
}: {
  src: string;
  alt: string;
  // Intrinsic size of the photo, and its screen corners (TL, TR, BR, BL) in those px.
  width: number;
  height: number;
  screen: Quad;
  screenAspect?: number;
  // Tall page screenshot shown on the screen in a browser window; `aspect` is
  // its height / width, `url` and `title` fill the address bar and tab.
  content?: { src: string; srcSet: string; alt: string; aspect: number; url: string; title: string };
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLImageElement>(null);
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);

  useEffect(() => {
    if (reduced) return;
    const outer = outerRef.current, box = boxRef.current, img = imgRef.current;
    if (!outer || !box || !img) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const W = box.clientWidth, H = box.clientHeight;
      // Photo is object-cover inside the box — map its screen corners to box px.
      const s = Math.max(W / width, H / height);
      const ox = (W - width * s) / 2, oy = (H - height * s) / 2;
      const from = screen.map(([x, y]) => [ox + x * s, oy + y * s]) as Quad;
      // Target: the screen square-on at 65% of the box, nudged down so the
      // bezel and a band of background stay visible around it.
      const tw = Math.min(W * 0.65, H * 0.65 * screenAspect), th = tw / screenAspect;
      const tx = (W - tw) / 2, ty = Math.min(H - th, (H - th) / 2 + H * 0.05);
      const to: Quad = [[tx, ty], [tx + tw, ty], [tx + tw, ty + th], [tx, ty + th]];

      // Scrolled distance through the pinned stretch, split into the three phases.
      const r = outer.getBoundingClientRect();
      const top = parseFloat(getComputedStyle(box).top);
      const unit = (r.height - H) / (2 * ZOOM_VH + HOLD_VH);
      const d = Math.max(0, top - r.top) / unit;
      const zoomOut = d - ZOOM_VH - HOLD_VH;
      const k = zoomOut > 0 ? ease(clamp01(1 - zoomOut / ZOOM_VH)) : ease(clamp01(d / ZOOM_VH));
      const hold = clamp01((d - ZOOM_VH) / HOLD_VH);

      const mid = from.map(([x, y], i) => [x + (to[i][0] - x) * k, y + (to[i][1] - y) * k]) as Quad;
      img.style.transform = warp(from, mid);

      // Screen layer: a flat tw×th viewport warped onto the same moving quad, so
      // it sits in the photo's screen and lands square-on (unscaled) when zoomed.
      const scr = screenRef.current, vp = viewportRef.current, page = pageRef.current;
      if (scr && vp && page && content) {
        scr.style.width = `${tw}px`;
        scr.style.height = `${th}px`;
        scr.style.transform = warp([[0, 0], [tw, 0], [tw, th], [0, th]], mid);
        // Scroll the page within the area below the browser chrome.
        page.style.transform = `translateY(${-(tw * content.aspect - vp.clientHeight) * ease(hold)}px)`;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduced, width, height, screen, screenAspect, content]);

  const photo = (
    <Image
      src={src}
      alt={alt}
      fill
      // Zooms well past the viewport width, so request the largest source.
      sizes="200vw"
      quality={90}
      className="object-cover"
    />
  );

  if (reduced) {
    return (
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: `${width}/${height}` }}>
        {photo}
      </div>
    );
  }

  // Box: the photo's aspect, capped at the viewport height and centred while pinned.
  const boxH = `min(100svh, ${(height / width) * 100}vw)`;
  return (
    <div
      ref={outerRef}
      className="relative"
      style={{ height: `calc(${boxH} + ${2 * ZOOM_VH + HOLD_VH}svh)` }}
    >
      <div
        ref={boxRef}
        className="sticky overflow-hidden"
        style={{ height: boxH, top: `calc((100svh - ${boxH}) / 2)` }}
      >
        <div ref={imgRef} className="absolute inset-0 origin-top-left will-change-transform">
          {photo}
        </div>
        {content && (
          <div
            ref={screenRef}
            className="@container absolute left-0 top-0 flex origin-top-left flex-col overflow-hidden bg-white will-change-transform"
          >
            <BrowserChrome url={content.url} title={content.title} />
            <div ref={viewportRef} className="relative min-h-0 flex-1 overflow-hidden">
              {/* Plain <img>: a very tall screenshot the optimizer shouldn't re-encode. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={pageRef}
                src={content.src}
                srcSet={content.srcSet}
                sizes="(max-width: 640px) 100vw, 80vw"
                alt={content.alt}
                loading="lazy"
                decoding="async"
                className="block w-full will-change-transform"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Chrome-style window frame (tab strip + toolbar), sized in container units so it
// scales with the screen layer at every zoom level.
function BrowserChrome({ url, title }: { url: string; title: string }) {
  const icon = "size-[1.3cqw] shrink-0 text-[#5f6368]";
  return (
    <div aria-hidden className="shrink-0 select-none border-b border-[#dadce0] text-[#202124]">
      {/* Tab strip */}
      <div className="flex h-[3cqw] items-end gap-[1.4cqw] bg-[#dee1e6] pl-[1.2cqw]">
        <div className="flex gap-[0.6cqw] self-center">
          <span className="size-[0.9cqw] rounded-full bg-[#ff5f57]" />
          <span className="size-[0.9cqw] rounded-full bg-[#febc2e]" />
          <span className="size-[0.9cqw] rounded-full bg-[#28c840]" />
        </div>
        <div className="flex h-[2.3cqw] w-[17cqw] items-center gap-[0.6cqw] rounded-t-[0.7cqw] bg-white px-[0.9cqw] text-[0.95cqw]">
          <span className="size-[1.1cqw] shrink-0 rounded-[0.25cqw] bg-[#1f3b2d]" />
          <span className="min-w-0 flex-1 truncate">{title}</span>
          <svg viewBox="0 0 16 16" className="size-[0.9cqw] shrink-0 text-[#5f6368]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </div>
      </div>
      {/* Toolbar */}
      <div className="flex h-[2.8cqw] items-center gap-[1cqw] bg-white px-[1.2cqw]">
        <svg viewBox="0 0 16 16" className={icon} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 8H3M7 4L3 8l4 4" />
        </svg>
        <svg viewBox="0 0 16 16" className={`${icon} opacity-40`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
        <svg viewBox="0 0 16 16" className={icon} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 8a5 5 0 1 1-1.5-3.5M13 3v2.5h-2.5" />
        </svg>
        <div className="flex h-[2cqw] flex-1 items-center gap-[0.6cqw] rounded-full bg-[#f1f3f4] px-[1cqw] text-[1cqw]">
          <svg viewBox="0 0 16 16" className="size-[1cqw] shrink-0 text-[#5f6368]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <rect x="3.5" y="7" width="9" height="6.5" rx="1.5" />
            <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
          </svg>
          <span>{url}</span>
        </div>
      </div>
    </div>
  );
}
