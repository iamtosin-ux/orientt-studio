"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { toast } from "sonner";
import BookCallButton from "./BookCallButton";

// Site favicon (matches src/app/icon.svg) — used as the toast marker.
function FaviconIcon() {
  return (
    <svg width="20" height="19" viewBox="0 0 36 33" fill="none" aria-hidden>
      <path
        d="M35.0007 10.0829V21.2506C35.0007 22.2405 34.3008 23.4553 33.4452 23.9502L22.5562 30.2491C21.5938 30.806 20.4076 30.806 19.4452 30.2491L8.55618 23.9502C7.59361 23.3934 7.00068 22.3643 7.00068 21.2506V10.0829C7.00068 8.9692 7.59361 7.93996 8.55618 7.38311L19.4452 1.08438C20.4076 0.527536 21.5938 0.527536 22.5562 1.08438L33.4452 7.38311C34.4078 7.93996 35.0007 8.9692 35.0007 10.0829Z"
        fill="#F0F0F0"
        stroke="#2E3238"
        strokeWidth="1.33333"
        strokeMiterlimit="10"
      />
      <path
        d="M19.244 15.6366L11.3193 10.7928C10.7331 10.4346 10.0007 10.8825 10.0007 11.5992V20.3082C10.0007 20.8807 10.2889 21.4095 10.7572 21.6956L18.682 26.5407C19.2682 26.8989 20.0007 26.451 20.0007 25.7344V17.024C20.0007 16.4515 19.7121 15.9229 19.244 15.6366Z"
        fill="white"
        stroke="#505967"
        strokeWidth="0.833333"
        strokeLinejoin="round"
      />
      <path
        d="M2.54335 22.9965C2.49683 22.9688 2.45915 22.9285 2.4347 22.8802C2.41025 22.8319 2.40003 22.7777 2.40525 22.7238L2.67278 19.9322L16.7612 17.4745L16.3805 20.8518C16.376 20.8904 16.3636 20.9277 16.3441 20.9613L10.0152 32.0655L7.90842 26.1854L2.54335 22.9965Z"
        fill="white"
        stroke="#505967"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g opacity="0.6">
        <path
          d="M7.89529 26.5728L8.2625 23.2361M10.0154 31.5319L10.4609 28.0456M10.4612 28.0445L16.7546 17.4771L2.66734 19.9327L8.26485 23.2362L10.4612 28.0445Z"
          stroke="#505967"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export default function ProjectGridCard({
  src,
  alt,
  href,
  video,
  wide,
  onLight,
}: {
  src: string;
  alt: string;
  href?: string;
  video?: string;
  wide?: boolean;
  onLight?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Spring lag gives the button its magnetic, trailing feel
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 });

  // Only linked cards react to hover (scale, dim, "view case study" chip).
  const interactive = !!href;
  const mediaCls = `absolute inset-0 h-full w-full object-cover${
    interactive ? " transition-transform duration-[400ms] ease-out group-hover:scale-[1.04]" : ""
  }`;

  function handleMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  // Cards without a case study surface a toast with a "Book a call" CTA.
  function handleNoCaseStudy() {
    toast("Case study not available", {
      icon: <FaviconIcon />,
      duration: 6000,
      action: <BookCallButton className="shrink-0" />,
    });
  }

  const card = (
    <div
      ref={ref}
      onMouseMove={interactive ? handleMove : undefined}
      className={`group relative w-full overflow-hidden ring-1 ${
        onLight
          ? "ring-black/[0.08] shadow-[0_18px_50px_-12px_rgba(0,0,0,0.22)]"
          : "ring-white/10"
      } ${wide ? "aspect-[16/9]" : "aspect-[27/20]"}`}
    >
      {video ? (
        <video src={video} poster={src} autoPlay muted loop playsInline className={mediaCls} />
      ) : src.endsWith(".webp") ? (
        // animated .webp — plain <img> so the optimizer doesn't flatten it to one frame
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className={mediaCls} />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={wide ? "100vw" : "(max-width: 640px) 100vw, 680px"}
          className={interactive ? "object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.04]" : "object-cover"}
        />
      )}

      {interactive && (
        <span className="absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}

      {href && (
        <motion.div
          style={{ x: sx, y: sy }}
          className="pointer-events-none absolute left-0 top-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        >
          <span className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-[80px] border border-white/90 bg-[rgba(16,16,16,0.51)] px-5 py-2 font-pixel text-sm uppercase tracking-wide whitespace-nowrap text-white shadow-[inset_0_0_12px_0_rgba(255,255,255,0.08),inset_0_-8px_32px_0_#101010] backdrop-blur-md">
            View case study
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M4.17 10h11.66M11.67 5.83 15.83 10l-4.16 4.17"
                stroke="currentColor"
                strokeWidth="1.67"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </motion.div>
      )}
    </div>
  );

  return href ? (
    <Link href={href} aria-label={`View case study: ${alt}`} className="block">
      {card}
    </Link>
  ) : (
    <button
      type="button"
      onClick={handleNoCaseStudy}
      aria-label={`${alt} — request case study`}
      className="block w-full cursor-pointer text-left"
    >
      {card}
    </button>
  );
}
