"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";

type Size = "h1" | "h2" | "text";

const SIZE_LABEL: Record<Size, string> = {
  h1: "Heading 1",
  h2: "Heading 2",
  text: "Text",
};
const SIZE_EM: Record<Size, string> = { h1: "1.25em", h2: "1em", text: "0.62em" };
const SIZE_TAG: Record<Size, string> = { h1: "H1", h2: "H2", text: "T" };

type StyleKey = "default" | "blue" | "orange" | "rainbow" | "mono";
const STYLES: Record<StyleKey, { dot: string; gradient?: string }> = {
  default: { dot: "#d9d9d9" },
  blue: {
    dot: "linear-gradient(180deg,#bcd4ff,#2f6bff)",
    gradient: "linear-gradient(180deg,#d3e2ff 0%,#3b76ff 100%)",
  },
  orange: {
    dot: "linear-gradient(180deg,#ffd08a,#ff8a3d)",
    gradient: "linear-gradient(180deg,#ffdca8 0%,#ff8a3d 100%)",
  },
  rainbow: {
    dot: "conic-gradient(from 90deg,#ff5f6d,#ffc371,#47e5bc,#6a8bff,#c86dff,#ff5f6d)",
    gradient: "linear-gradient(90deg,#ff6b6b,#ffd166,#4ade80,#60a5fa,#c084fc)",
  },
  mono: {
    dot: "linear-gradient(180deg,#efefef,#3a3a3a)",
    gradient: "linear-gradient(180deg,#f5f5f5 0%,#7c7c7c 100%)",
  },
};

function Chevron() {
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// A single word rendered with a Figma-style selection overlay + a floating
// formatting toolbar (Turn into / B·I·U / color), positioned above the word.
export default function EditableCopy({ initial }: { initial: string }) {
  const wordRef = useRef<HTMLSpanElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const [ready, setReady] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [hover, setHover] = useState(false);
  // On phones/tablets the toolbar can't sit beside the word (it would run off
  // screen), so it drops below the word and clamps to the viewport instead.
  const [narrow, setNarrow] = useState(false);
  const [size, setSize] = useState<Size>("h2");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [turnOpen, setTurnOpen] = useState(false);
  const [styleOpen, setStyleOpen] = useState(false);
  const [colorStyle, setColorStyle] = useState<StyleKey>("default");

  useEffect(() => {
    let raf = 0;
    // Track the word every frame so the toolbar stays glued beside it through
    // the hero entrance animation, font loads, scroll and resize. State only
    // updates when the measured position actually changes (no wasted renders).
    const place = () => {
      const el = wordRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const vw = window.innerWidth;
        const isNarrow = vw < 1024;
        setNarrow((n) => (n === isNarrow ? n : isNarrow));

        // Measured toolbar box (falls back to sane defaults before it mounts).
        const tb = toolbarRef.current?.getBoundingClientRect();
        const tw = tb?.width || 240;
        const th = tb?.height || 40;

        let top: number;
        let left: number;
        if (isNarrow) {
          // Drop below the word, then clamp horizontally inside the viewport.
          top = r.bottom + 8 + th / 2;
          left = Math.min(Math.max(8, r.left), vw - tw - 8);
        } else {
          top = r.top + r.height / 2; // vertical center of the word
          left = r.right + 14;
        }
        setPos((p) => (p.top === top && p.left === left ? p : { top, left }));

        const w = Math.round(r.width);
        const h = Math.round(r.height);
        setDims((d) => (d.w === w && d.h === h ? d : { w, h }));
      }
      raf = requestAnimationFrame(place);
    };
    place();
    setReady(true);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!turnOpen && !styleOpen) return;
    const onDown = (e: globalThis.PointerEvent) => {
      if (toolbarRef.current?.contains(e.target as Node)) return;
      setTurnOpen(false);
      setStyleOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [turnOpen, styleOpen]);

  const spanStyle: CSSProperties = {
    fontSize: SIZE_EM[size],
    fontWeight: bold ? 800 : undefined,
    fontStyle: italic ? "italic" : undefined,
    textDecoration: underline ? "underline" : undefined,
  };

  // Gradient color applies to the word text only (not the overlay/badges).
  const grad = STYLES[colorStyle].gradient;
  const textStyle: CSSProperties =
    grad
      ? {
          backgroundImage: grad,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
        }
      : {};

  const keep = (e: ReactMouseEvent) => e.preventDefault();
  const handleCls =
    "absolute z-10 size-2 rounded-[2px] border-[1.5px] border-[#4c9ffe] bg-white";
  const panelCls =
    "rounded-xl border border-black/5 bg-white p-1 shadow-[0_10px_34px_rgba(0,0,0,0.22)]";
  const itemCls =
    "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-[#37352f] transition-colors hover:bg-black/[0.06]";

  return (
    <span
      ref={wordRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative inline-block cursor-default"
      style={spanStyle}
    >
      {/* the word */}
      <span style={textStyle}>{initial}</span>

      {/* Figma selection overlay — box + handles + badges (all breakpoints) */}
      <span className="pointer-events-none absolute -inset-[3px] z-20 block">
          <span className="absolute inset-0 rounded-[2px] border-[1.5px] border-[#4c9ffe] bg-[#4c9ffe]/[0.07]" />
          <span className={`${handleCls} left-0 top-0 -translate-x-1/2 -translate-y-1/2`} />
          <span className={`${handleCls} right-0 top-0 translate-x-1/2 -translate-y-1/2`} />
          <span className={`${handleCls} bottom-0 left-0 -translate-x-1/2 translate-y-1/2`} />
          <span className={`${handleCls} bottom-0 right-0 translate-x-1/2 translate-y-1/2`} />

          {(hover || narrow) && (
            <span className="absolute bottom-full left-1/2 flex -translate-x-1/2 flex-col items-center">
              <span className="whitespace-nowrap rounded-md bg-white px-2 py-[3px] font-mono text-[11px] font-medium leading-none tracking-tight text-[#3a3a3f] shadow-[0_4px_14px_rgba(0,0,0,0.18)]">
                {dims.w} × {dims.h}
              </span>
              <span className="h-2 w-px bg-[#4c9ffe]/60" />
              <span className="size-[7px] -translate-y-[3px] rounded-full border-[1.5px] border-[#4c9ffe] bg-white" />
            </span>
          )}
        </span>

      {ready &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={toolbarRef}
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              transform: "translateY(-50%)",
            }}
            className="z-[200] hidden select-none lg:block"
          >
            <div className="flex items-center gap-1 rounded-xl border border-black/5 bg-white p-1 shadow-[0_10px_34px_rgba(0,0,0,0.22)]">
                  <button
                    type="button"
                    onMouseDown={keep}
                    onClick={() => {
                      setTurnOpen((o) => !o);
                      setStyleOpen(false);
                    }}
                    className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm text-[#37352f] transition-colors hover:bg-black/[0.06]"
                  >
                    {SIZE_LABEL[size]}
                    <span className="text-[#9b9a97]">
                      <Chevron />
                    </span>
                  </button>

                  <span className="mx-0.5 h-4 w-px bg-black/10" />

                  <button
                    type="button"
                    onMouseDown={keep}
                    onClick={() => setBold((b) => !b)}
                    className={`size-7 rounded-lg text-[15px] font-bold text-[#37352f] transition-colors hover:bg-black/[0.06] ${bold ? "bg-black/[0.08]" : ""}`}
                  >
                    B
                  </button>
                  <button
                    type="button"
                    onMouseDown={keep}
                    onClick={() => setItalic((b) => !b)}
                    className={`size-7 rounded-lg font-serif text-[15px] italic text-[#37352f] transition-colors hover:bg-black/[0.06] ${italic ? "bg-black/[0.08]" : ""}`}
                  >
                    I
                  </button>
                  <button
                    type="button"
                    onMouseDown={keep}
                    onClick={() => setUnderline((b) => !b)}
                    className={`size-7 rounded-lg text-[15px] text-[#37352f] underline transition-colors hover:bg-black/[0.06] ${underline ? "bg-black/[0.08]" : ""}`}
                  >
                    U
                  </button>

                  <span className="mx-0.5 h-4 w-px bg-black/10" />

              <button
                type="button"
                onMouseDown={keep}
                onClick={() => {
                  setStyleOpen((o) => !o);
                  setTurnOpen(false);
                }}
                aria-label="Text color"
                className="flex items-center gap-1 rounded-lg px-1.5 py-1 transition-colors hover:bg-black/[0.06]"
              >
                <span
                  className="size-4 rounded-full ring-1 ring-black/10"
                  style={{ background: STYLES[colorStyle].dot }}
                />
                <span className="text-[#9b9a97]">
                  <Chevron />
                </span>
              </button>
            </div>

            {turnOpen && (
              <div className={`absolute left-0 top-full mt-1.5 w-[186px] ${panelCls}`}>
                <p className="px-2 pb-1 pt-1.5 text-xs text-[#9b9a97]">Turn into</p>
                {(["h1", "h2", "text"] as Size[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onMouseDown={keep}
                    onClick={() => {
                      setSize(s);
                      setTurnOpen(false);
                    }}
                    className={itemCls}
                  >
                    <span className="grid size-6 shrink-0 place-items-center rounded border border-black/15 text-[11px] font-semibold text-[#37352f]">
                      {SIZE_TAG[s]}
                    </span>
                    {SIZE_LABEL[s]}
                  </button>
                ))}
              </div>
            )}

            {styleOpen && (
              <div className={`absolute left-0 top-full mt-1.5 ${panelCls} p-2`}>
                <div className="flex items-center gap-2.5 px-1 py-0.5">
                  {(["default", "blue", "orange", "rainbow", "mono"] as StyleKey[]).map(
                    (s) => (
                      <button
                        key={s}
                        type="button"
                        onMouseDown={keep}
                        onClick={() => {
                          setColorStyle(s);
                          setStyleOpen(false);
                        }}
                        aria-label={s}
                        className={`size-6 rounded-full ring-1 ring-black/10 transition ${
                          colorStyle === s
                            ? "outline outline-2 outline-offset-2 outline-[#2b6fff]"
                            : ""
                        }`}
                        style={{ background: STYLES[s].dot }}
                      />
                    ),
                  )}
                </div>
              </div>
            )}
          </div>,
          document.body,
        )}
    </span>
  );
}
