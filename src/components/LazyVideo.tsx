"use client";

import { useEffect, useRef } from "react";

// Autoplaying card video that defers its download until it's near the viewport.
// `preload="none"` + attaching src on intersection prevents the (large) file
// from loading on initial page load; it pauses again when scrolled away.
export default function LazyVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!el.src) el.src = src; // first time in view: begin loading
          el.play().catch(() => {}); // ignore autoplay rejections
        } else {
          el.pause();
        }
      },
      // Start loading a little before it scrolls into view.
      { rootMargin: "300px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  );
}
