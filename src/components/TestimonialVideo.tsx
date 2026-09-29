"use client";

import { useRef, useState } from "react";

// Click-to-play testimonial: poster + play button until started, then native
// controls with sound. `preload="none"` keeps the file off the initial load.
export default function TestimonialVideo({
  src,
  poster,
  label,
  caption,
  className = "aspect-[3/2] rounded-2xl",
}: {
  src: string;
  poster: string;
  label: string;
  // Shown over the poster (bottom-left) until playback starts.
  caption?: React.ReactNode;
  // Sizing + radius of the frame.
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    setStarted(true);
    ref.current?.play().catch(() => {});
  };

  return (
    <div className={`relative w-full overflow-hidden bg-neutral-800 outline outline-1 -outline-offset-1 outline-white/10 ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        controls={started}
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {!started && (
        <button
          type="button"
          onClick={play}
          aria-label={`Play video: ${label}`}
          className="group absolute inset-0 grid place-items-center bg-black/10 transition-colors duration-200 hover:bg-black/20"
        >
          {caption && (
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-6 pb-5 pt-16 text-left">
              {caption}
            </span>
          )}
          <span className="grid size-16 place-items-center rounded-full bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_24px_rgba(0,0,0,0.35)] ring-1 ring-white/25 backdrop-blur-md transition-transform duration-200 ease-out group-hover:scale-105 group-active:scale-[0.97]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="translate-x-px">
              <path d="M8 5.5v13a1 1 0 0 0 1.52.85l10.4-6.5a1 1 0 0 0 0-1.7L9.52 4.65A1 1 0 0 0 8 5.5Z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
