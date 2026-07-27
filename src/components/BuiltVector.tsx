"use client";

// BuiltVector — the hero word "built", rendered as a Figma-style vector layer.
// DEFAULT: solid white text inside a selection frame (a "selected layer").
// ON HOVER: flips into vector-edit mode — white outline with blue-ring anchor
// dots you can drag to bend the letterforms. Outline traced from Geist SemiBold
// (the hero font) at 52px, rendered 1:1 so strokes and anchor rings stay crisp.

import { useEffect, useRef, useState } from "react";
import { parsePath } from "@/svg-editor/standalone/parse";
import { VectorEditor, type EditorStyle } from "@/svg-editor/standalone/VectorEditor";
import { FigmaFrame, type FrameStyle } from "@/svg-editor/standalone/FigmaFrame";

const BUILT_D =
  "M 3.64 0 C 2.58 -6.15 2.53 -30.77 3.64 -36.92 C 4.75 -43.07 9.19 -39.1 10.3 -36.92 C 11.41 -34.74 9.28 -25.27 10.3 -23.82 C 11.31 -22.36 13.97 -27.71 16.39 -28.18 C 18.8 -28.64 22.62 -27.93 24.78 -26.6 C 26.94 -25.27 28.49 -23.01 29.35 -20.21 C 30.2 -17.4 30.21 -12.48 29.91 -9.76 C 29.6 -7.03 28.73 -5.47 27.5 -3.85 C 26.27 -2.22 24.55 -0.69 22.52 -0.02 C 20.5 0.65 17.4 0.86 15.33 0.17 C 13.27 -0.51 11.03 -4.08 10.14 -4.11 C 9.25 -4.14 11.07 -0.68 9.98 0 C 8.9 0.68 4.7 6.15 3.64 0 Z M 10.3 -13.88 C 10.58 -11.78 11.31 -7.75 12.86 -6.33 C 14.42 -4.92 17.93 -4.65 19.63 -5.39 C 21.33 -6.13 22.63 -8.41 23.07 -10.77 C 23.51 -13.13 22.91 -17.59 22.27 -19.56 C 21.62 -21.53 20.55 -22.13 19.21 -22.6 C 17.87 -23.07 15.58 -22.99 14.24 -22.39 C 12.9 -21.78 11.83 -20.4 11.18 -18.98 C 10.52 -17.57 10.01 -15.99 10.3 -13.88 Z M 35.41 -9.88 C 35.21 -13.84 34.3 -24.79 35.41 -27.77 C 36.52 -30.75 40.91 -30.98 42.07 -27.77 C 43.23 -24.55 41.57 -12.32 42.36 -8.49 C 43.15 -4.66 45.47 -5.21 46.8 -4.78 C 48.13 -4.36 49.41 -5.18 50.31 -5.93 C 51.22 -6.69 51.87 -5.68 52.23 -9.32 C 52.59 -12.96 51.32 -24.69 52.47 -27.77 C 53.62 -30.84 58.01 -32.4 59.12 -27.77 C 60.23 -23.14 60.14 -4.63 59.12 0 C 58.11 4.63 54.07 0.75 53.04 0 C 52.01 -0.75 53.79 -4.55 52.94 -4.52 C 52.08 -4.5 49.95 -0.58 47.92 0.16 C 45.89 0.9 42.64 0.63 40.76 -0.06 C 38.87 -0.76 37.5 -2.35 36.61 -3.99 C 35.72 -5.62 35.61 -5.92 35.41 -9.88 Z M 65.88 0 C 64.77 -4.63 64.77 -23.14 65.88 -27.77 C 66.99 -32.4 71.43 -32.4 72.54 -27.77 C 73.65 -23.14 73.65 -4.63 72.54 0 C 71.43 4.63 66.99 4.63 65.88 0 Z M 65.78 -31.46 C 64.63 -32.45 64.63 -36.4 65.78 -37.39 C 66.93 -38.38 71.54 -38.38 72.7 -37.39 C 73.85 -36.4 73.85 -32.45 72.7 -31.46 C 71.54 -30.47 66.93 -30.47 65.78 -31.46 Z M 79.51 -6.55 C 79.08 -12.54 78.4 -31.86 79.51 -36.92 C 80.62 -41.98 85.05 -41.93 86.16 -36.92 C 87.28 -31.91 85.5 -12.13 86.18 -6.83 C 86.87 -1.54 89.59 -6.29 90.27 -5.15 C 90.95 -4.01 91.64 -0.69 90.27 0 C 88.91 0.69 83.86 0.09 82.07 -1 C 80.28 -2.09 79.94 -0.57 79.51 -6.55 Z M 91.26 -22.62 C 90.53 -23.48 90.53 -26.91 91.26 -27.77 C 91.99 -28.63 94.9 -26.68 95.63 -27.77 C 96.36 -28.85 94.52 -33.18 95.63 -34.27 C 96.74 -35.35 101.17 -35.35 102.28 -34.27 C 103.39 -33.18 101.06 -28.85 102.28 -27.77 C 103.51 -26.68 108.39 -28.63 109.62 -27.77 C 110.84 -26.91 110.84 -23.48 109.62 -22.62 C 108.39 -21.76 103.47 -25.24 102.28 -22.62 C 101.1 -20 101.28 -9.83 102.5 -6.92 C 103.72 -4 108.43 -6.3 109.62 -5.15 C 110.8 -4 110.99 -0.83 109.62 0 C 108.25 0.83 103.46 0.21 101.39 -0.17 C 99.32 -0.55 98.17 1.44 97.21 -2.3 C 96.25 -6.04 96.62 -19.23 95.63 -22.62 C 94.64 -26.01 91.99 -21.76 91.26 -22.62 Z";
const VB: [number, number, number, number] = [3.64, -37.39, 105.98, 37.56];

const ACCENT = "#4c9ffe";

// Glyph renders 1:1 (crisp); the box adds a little padding around it.
const PAD_X = 7;
const PAD_Y = 4;

const FRAME: FrameStyle = {
  accent: ACCENT,
  handleSize: 7,
  handleFill: "#ffffff",
  borderWidth: 1.5,
  showHandles: true,
  showBadge: true,
  badgeBg: ACCENT,
  badgeText: "#ffffff",
};

const BASE = {
  accent: ACCENT,
  arm: "#6a9fd4",
  anchorR: 1.9,
  handleR: 2,
  pointFill: "#ffffff",
  showHandles: false,
  fillRule: "nonzero",
} as const;

type SizeLabel = "Heading 1" | "Heading 2" | "Text";
const COLORS: { key: string; value: string }[] = [
  { key: "white", value: "#ffffff" },
  { key: "blue", value: "#4c9ffe" },
  { key: "orange", value: "#ff8a3d" },
  { key: "green", value: "#3ec98a" },
  { key: "purple", value: "#c084fc" },
];

function Chevron() {
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface ToolbarProps {
  color: string;
  setColor: (c: string) => void;
  size: SizeLabel;
  setSize: (s: SizeLabel) => void;
  bold: boolean;
  setBold: (v: boolean) => void;
  italic: boolean;
  setItalic: (v: boolean) => void;
  underline: boolean;
  setUnderline: (v: boolean) => void;
}

// Floating formatting toolbar above the box — interactive: colour recolours the
// word, B/I/U toggle weight/slant/underline, and Heading opens a size menu.
function Toolbar(p: ToolbarProps) {
  const [menu, setMenu] = useState<"turn" | "color" | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!menu) return;
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [menu]);

  const tog = "grid size-7 place-items-center rounded-lg text-[15px] text-[#37352f] transition-colors hover:bg-black/[0.06]";
  const on = "bg-black/[0.08]";
  const panel = "absolute top-full mt-1.5 rounded-xl border border-black/5 bg-white p-1 shadow-[0_10px_34px_rgba(0,0,0,0.22)]";

  return (
    <div ref={ref} className="absolute bottom-full left-1/2 z-30 mb-3 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-xl border border-black/5 bg-white p-1 shadow-[0_10px_34px_rgba(0,0,0,0.22)]">
        <button
          type="button"
          onClick={() => setMenu((m) => (m === "turn" ? null : "turn"))}
          className="flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-1 text-sm text-[#37352f] transition-colors hover:bg-black/[0.06]"
        >
          {p.size} <span className="text-[#9b9a97]"><Chevron /></span>
        </button>
        <span className="mx-0.5 h-4 w-px bg-black/10" />
        <button type="button" onClick={() => p.setBold(!p.bold)} className={`${tog} font-bold ${p.bold ? on : ""}`}>B</button>
        <button type="button" onClick={() => p.setItalic(!p.italic)} className={`${tog} font-serif italic ${p.italic ? on : ""}`}>I</button>
        <button type="button" onClick={() => p.setUnderline(!p.underline)} className={`${tog} underline ${p.underline ? on : ""}`}>U</button>
        <span className="mx-0.5 h-4 w-px bg-black/10" />
        <button
          type="button"
          onClick={() => setMenu((m) => (m === "color" ? null : "color"))}
          aria-label="Text colour"
          className="flex items-center gap-1 rounded-lg px-1.5 py-1 transition-colors hover:bg-black/[0.06]"
        >
          <span className="size-4 rounded-full ring-1 ring-black/10" style={{ background: p.color }} />
          <span className="text-[#9b9a97]"><Chevron /></span>
        </button>
      </div>

      {menu === "turn" && (
        <div className={`${panel} left-0 w-[148px]`}>
          {(["Heading 1", "Heading 2", "Text"] as SizeLabel[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => { p.setSize(s); setMenu(null); }}
              className={`flex w-full items-center rounded-lg px-2 py-1.5 text-left text-sm text-[#37352f] transition-colors hover:bg-black/[0.06] ${p.size === s ? on : ""}`}
            >
              {s}
            </button>
          ))}
        </div>
      )}
      {menu === "color" && (
        <div className={`${panel} right-0 flex gap-2.5 p-2`}>
          {COLORS.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => { p.setColor(c.value); setMenu(null); }}
              aria-label={c.key}
              className={`size-6 rounded-full ring-1 ring-black/10 ${p.color === c.value ? "outline outline-2 outline-offset-2 outline-[#2b6fff]" : ""}`}
              style={{ background: c.value }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const SCALE: Record<SizeLabel, number> = { "Heading 1": 1.16, "Heading 2": 1, Text: 0.74 };

export default function BuiltVector() {
  const [path, setPath] = useState(() => parsePath(BUILT_D));
  const [hover, setHover] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [size, setSize] = useState<SizeLabel>("Heading 2");
  const [bold, setBold] = useState(true);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);

  const scale = SCALE[size];
  const gw = VB[2] * scale;
  const gh = VB[3] * scale;
  const boxW = Math.round(gw + 2 * PAD_X);
  const boxH = Math.round(gh + 2 * PAD_Y);

  // resting: filled letters — hover: outline + anchor dots. Colour + weight live.
  const solid: EditorStyle = { ...BASE, fill: color, fillOpacity: 1, stroke: "transparent", strokeWidth: 0, showRig: false };
  const outline: EditorStyle = { ...BASE, fill: "none", fillOpacity: 0, stroke: color, strokeWidth: bold ? 1.44 : 0.85, showRig: true };

  return (
    <span
      className="relative inline-block"
      style={{ verticalAlign: "baseline", transform: `translateY(${PAD_Y}px)` }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Toolbar
        color={color} setColor={setColor}
        size={size} setSize={setSize}
        bold={bold} setBold={setBold}
        italic={italic} setItalic={setItalic}
        underline={underline} setUnderline={setUnderline}
      />
      <FigmaFrame width={boxW} height={boxH} style={FRAME}>
        <span
          style={{
            display: "block",
            padding: `${PAD_Y}px ${PAD_X}px`,
            transform: italic ? "skewX(-9deg)" : undefined,
          }}
        >
          <VectorEditor
            path={path}
            onChange={setPath}
            viewBox={VB}
            width={gw}
            height={gh}
            style={hover ? outline : solid}
          />
        </span>
      </FigmaFrame>
      {underline && (
        <span
          aria-hidden
          className="pointer-events-none absolute"
          style={{ left: PAD_X, width: gw, bottom: PAD_Y - 1, height: 2, borderRadius: 1, background: color }}
        />
      )}
    </span>
  );
}
