"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ0123456789@#$%&*/<>?";

function scramble(text: string) {
  return text
    .split("")
    .map((ch) => (ch === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]))
    .join("");
}

// Two modes:
//  - no hoverText: renders `text` scrambled, "decrypts" to it on hover.
//  - with hoverText: rests as plain `text`, scrambles into `hoverText` on hover.
export default function ScrambleText({
  text,
  hoverText,
  className,
}: {
  text: string;
  hoverText?: string;
  className?: string;
}) {
  const target = hoverText ?? text; // what we decrypt toward on hover
  const [display, setDisplay] = useState(text);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => {
    let active = true;
    // Defer so SSR/first render matches before scrambling on the client.
    queueMicrotask(() => {
      if (!active) return;
      setDisplay(hoverText ? text : scramble(text));
    });
    return () => {
      active = false;
      stop();
    };
  }, [text, hoverText]);

  const decrypt = () => {
    stop();
    let i = 0;
    timer.current = setInterval(() => {
      setDisplay(
        target
          .split("")
          .map((ch, idx) => {
            if (ch === " ") return " ";
            if (idx < i) return target[idx];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(""),
      );
      if (i >= target.length) {
        stop();
        setDisplay(target);
        return;
      }
      i += 1 / 3;
    }, 30);
  };

  const reset = () => {
    stop();
    setDisplay(hoverText ? text : scramble(text));
  };

  return (
    <span
      onMouseEnter={decrypt}
      onFocus={decrypt}
      onMouseLeave={reset}
      onBlur={reset}
      className={className}
      aria-label={target}
    >
      {display}
    </span>
  );
}
