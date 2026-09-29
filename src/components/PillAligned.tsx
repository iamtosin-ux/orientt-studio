"use client";

import { useEffect, useRef, useState } from "react";

// Caps its content so the right edge lines up with the "Your project" pill in
// PastProjects. The pill sits left-aligned in its grid cell, so that edge
// depends on the pill's own width — measured rather than guessed.
export default function PillAligned({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [maxWidth, setMaxWidth] = useState<number>();

  useEffect(() => {
    const el = ref.current;
    const pill = document.querySelector("[data-your-project]");
    if (!el || !pill) return;

    const measure = () =>
      setMaxWidth(
        pill.getBoundingClientRect().right - el.getBoundingClientRect().left,
      );

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    ro.observe(pill);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      <div style={{ maxWidth }}>{children}</div>
    </div>
  );
}
