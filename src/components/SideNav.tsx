"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EMAIL, WHATSAPP_URL, X_URL, X_HANDLE } from "@/lib/links";
import ScrambleText from "./ScrambleText";

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 5h5v5M18.5 5.5 11 13M12 5H6.5A1.5 1.5 0 0 0 5 6.5v11A1.5 1.5 0 0 0 6.5 19h11a1.5 1.5 0 0 0 1.5-1.5V12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.24 3.3a1.2 1.2 0 0 1 1.52 0l6.6 5.4c.4.32.64.82.64 1.34v8.36c0 .77-.63 1.4-1.4 1.4H5.8c-.77 0-1.4-.63-1.4-1.4V10.04c0-.52.24-1.02.64-1.34l6.2-5.4Z" />
    </svg>
  );
}

// Floating bottom bar shown on mobile in place of the sidebar.
function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-4 lg:hidden">
      <nav className="flex items-center gap-0.5 rounded-full border border-black/[0.06] bg-white p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.35)]">
        <a
          href="#top"
          aria-label="orientt: home"
          className="grid size-9 place-items-center rounded-full text-neutral-700 transition-colors hover:bg-black/[0.05]"
        >
          <HomeIcon />
        </a>
        <span className="mx-1 h-5 w-px bg-black/10" />
        <a
          href="#work"
          className="rounded-full px-3 py-1.5 text-[15px] font-medium text-neutral-800 transition-colors hover:bg-black/[0.05]"
        >
          Work
        </a>
        <a
          href="#pricing"
          className="rounded-full px-3 py-1.5 text-[15px] font-medium text-neutral-800 transition-colors hover:bg-black/[0.05]"
        >
          Pricing
        </a>
        <span className="mx-1 h-5 w-px bg-black/10" />
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[15px] font-medium text-neutral-800 transition-colors hover:bg-black/[0.05]"
        >
          Quick chat
          <ExternalIcon />
        </a>
      </nav>
    </div>
  );
}

// Left-column menu — sticky sidebar on desktop, floating bottom bar on mobile.
export default function SideNav() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <MobileBar />

      <nav className="hidden gap-6 lg:sticky lg:top-20 lg:flex lg:flex-col lg:self-start">
      <a href="#top" aria-label="orientt: home" className="w-fit">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="orientt" className="h-6 w-auto" />
      </a>

      {/* group 1 — Work, Pricing */}
      <ul className="flex flex-col gap-2 text-sm text-white/55">
        <li>
          <a href="#work" className="transition-colors duration-200 hover:text-white">
            Work
          </a>
        </li>
        <li>
          <a href="#pricing" className="transition-colors duration-200 hover:text-white">
            Pricing
          </a>
        </li>
      </ul>

      {/* group 2 — Quick chat */}
      <div className="flex flex-col gap-4 text-sm text-white/55">
        <span className="h-px w-8 bg-white/15" aria-hidden />
        <div>
          <button
            type="button"
            onClick={() => setChatOpen((o) => !o)}
            aria-expanded={chatOpen}
            className="group inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-white"
          >
            Quick chat
            <motion.span
              animate={{ rotate: chatOpen ? 90 : 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-white/40 group-hover:text-white/70"
            >
              <Chevron />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {chatOpen && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex flex-col gap-1.5 overflow-hidden pl-3 text-white/45"
              >
                <li className="pt-2">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono tracking-tight text-[#25D366]"
                  >
                    <ScrambleText text="WhatsApp" />
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    Email
                  </a>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* group 3 — social */}
      <div className="flex flex-col gap-4">
        <span className="h-px w-8 bg-white/15" aria-hidden />
        <a
          href={X_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit text-sm text-white/55 transition-colors duration-200 hover:text-white"
        >
          <ScrambleText text="Follow on X" hoverText={X_HANDLE} />
        </a>
      </div>
      </nav>
    </>
  );
}
