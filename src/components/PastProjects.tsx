"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BorderBeam } from "border-beam";

const DIR = "/Logo past projects";

type Logo = {
  name: string;
  file: string;
  // Optional hover card — blurb + service + external "View details" link.
  blurb?: string;
  service?: string;
  href?: string;
  big?: boolean; // renders 40% larger (artwork sits small in its frame)
};

// Client logos (monochrome SVGs, ~220×72 frame, left-aligned artwork).
const LOGOS: Logo[] = [
  {
    name: "Decisional",
    file: "Frame 1707479428.svg",
    blurb: "AI Automation Engineer",
    service: "Product Design",
    href: "https://agents.decisional.com/sign-in",
  },
  {
    name: "Indemni",
    file: "Frame 2147225506.svg",
    blurb: "Driver vetting & fraud prevention for freight brokers",
    service: "Product Design · Mobile App",
    href: "https://app.indemni.com/signin",
  },
  {
    name: "Catapult Sports",
    file: "Frame 1707479427.svg",
    blurb: "Cutting-edge sports technology",
    service: "Product Design",
    href: "https://www.catapult.com/",
  },
  { name: "Smobi", file: "Frame 1707479429.svg", big: true },
  { name: "Roam", file: "Frame 1707479430.svg" },
];

const logoBase =
  "w-auto object-contain object-left opacity-90 brightness-[2.6] transition duration-200 group-hover:brightness-[3.6]";

function LogoItem({ logo }: { logo: Logo }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const src = `${DIR}/${encodeURIComponent(logo.file)}`;
  const sizeCls = logo.big ? "h-14 max-w-[280px]" : "h-10 max-w-[200px]";
  const logoClass = `${logoBase} ${sizeCls}`;

  if (!logo.blurb) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={logo.name} className={logoClass} />;
  }

  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    if (timer.current) clearTimeout(timer.current);
    // brief delay so the pointer can travel into the card
    timer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div className="group relative w-fit" onMouseEnter={show} onMouseLeave={hide}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={logo.name}
        className={`${logoClass} ${open ? "opacity-0" : ""}`}
      />

      <AnimatePresence>
        {open && (
          <>
            {/* frosted card — floats above the logo (heavy blur, translucent) */}
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={show}
              onMouseLeave={hide}
              className="absolute left-1/2 top-1/2 z-30 w-[248px] -translate-x-1/2 -translate-y-[calc(100%+34px)] rounded-2xl border border-white/20 bg-white/[0.07] p-5 text-center shadow-[0_24px_70px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={logo.name}
                className="mx-auto h-8 w-auto max-w-[150px] object-contain brightness-[3.4]"
              />
              <p className="mt-3 text-sm leading-snug text-white/85">
                {logo.blurb}
              </p>
              <p className="mt-1.5 text-xs text-white/45">{logo.service}</p>
            </motion.div>

            {/* CTA — sits in the individual logo's position */}
            <motion.a
              key="pill"
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={show}
              onMouseLeave={hide}
              style={{
                background:
                  "linear-gradient(180deg, #6e6e74 0%, #47474d 55%, #37373c 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 1px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.06), 0 6px 18px rgba(0,0,0,0.45)",
              }}
              className="group/pill absolute left-1/2 top-1/2 z-30 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium text-white"
            >
              Check it out
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover/pill:translate-x-0.5"
              >
                ›
              </span>
            </motion.a>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PastProjects() {
  return (
    <section className="pt-10">
      <div className="w-full">
        <h2 className="text-base font-semibold text-white">Past projects include</h2>

        {/* 3×3 on desktop (5 logos + "Your project"), 2-up on mobile */}
        <div className="mt-4 grid grid-cols-2 items-center gap-x-8 gap-y-2 sm:grid-cols-3">
          {LOGOS.map((logo) => (
            <LogoItem key={logo.name} logo={logo} />
          ))}

          {/* next project — animated border beam */}
          <BorderBeam size="line" colorVariant="colorful" strength={0.43} className="w-fit">
            <a
              href="#pricing"
              className="group inline-flex items-center gap-1 rounded-full bg-neutral-950 px-3.5 py-1.5 text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-200"
            >
              Your project
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                ›
              </span>
            </a>
          </BorderBeam>
        </div>
      </div>
    </section>
  );
}
