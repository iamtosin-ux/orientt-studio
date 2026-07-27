"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Each service: name + the lucide icon revealed on hover (in place of its number).
const SERVICES: { name: string; icon: ReactNode }[] = [
  {
    name: "Web Apps",
    icon: (
      <>
        <rect width="18" height="12" x="3" y="4" rx="2" ry="2" />
        <line x1="2" x2="22" y1="20" y2="20" />
      </>
    ),
  },
  {
    name: "Mobile Apps",
    icon: (
      <>
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </>
    ),
  },
  {
    name: "Vibe Code Slop Remediation",
    icon: (
      <>
        <path d="M12 2v4" />
        <path d="m16.2 7.8 2.9-2.9" />
        <path d="M18 12h4" />
        <path d="m16.2 16.2 2.9 2.9" />
        <path d="M12 18v4" />
        <path d="m4.9 19.1 2.9-2.9" />
        <path d="M2 12h4" />
        <path d="m4.9 4.9 2.9 2.9" />
      </>
    ),
  },
  {
    name: "Websites",
    icon: (
      <>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="M6 8h.01" />
        <path d="M10 8h.01" />
        <path d="M14 8h.01" />
      </>
    ),
  },
  {
    name: "Branding & Visuals",
    icon: (
      <>
        <path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z" />
        <path d="M5 17A12 12 0 0 1 17 5" />
        <circle cx="19" cy="5" r="2" />
        <circle cx="5" cy="19" r="2" />
      </>
    ),
  },
];

export default function Services() {
  const reduce = useReducedMotion();
  return (
    <div className="mx-auto max-w-[640px]">
      {/* eyebrow + numbered service list, centred in the section */}
      <div>
        <p className="text-base font-semibold text-white">Services</p>
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-6"
        >
          {SERVICES.map((service, i) => (
            <motion.li
              key={service.name}
              variants={{ hidden: { opacity: 0, y: reduce ? 0 : 12 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: EASE }}
              className="group flex items-center justify-between gap-4 border-t border-white/10 py-5"
            >
              <span className="text-[clamp(1.375rem,2.2vw,28px)] tracking-[-0.01em] text-white/85 transition-colors duration-200 group-hover:text-white">
                {service.name}
              </span>
              {/* number → icon on hover, in a fixed slot so nothing shifts */}
              <span className="relative grid h-8 w-10 shrink-0 place-items-center">
                <span className="text-[clamp(1.375rem,2.2vw,28px)] tabular-nums tracking-[-0.01em] text-white/25 transition-opacity duration-200 group-hover:opacity-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="absolute inset-0 m-auto text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                >
                  {service.icon}
                </svg>
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
