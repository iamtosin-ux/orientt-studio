"use client";

import { CAL_LINK } from "@/lib/links";

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M7.5 4.5 13 10l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Glassy metallic primary CTA — opens the Cal.com booking modal.
// Shared by the hero and the pricing card so they stay identical.
export default function BookCallButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view","theme":"dark"}'
      className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-transform duration-200 ease-out hover:-translate-y-px active:translate-y-0 ${className}`}
      style={{
        background:
          "linear-gradient(180deg, #6e6e74 0%, #47474d 55%, #37373c 100%)",
        // metallic rim: bright top sheen, dark bottom edge, faint side rim
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 1px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.06), 0 6px 18px rgba(0,0,0,0.45)",
      }}
    >
      Book a call
      <span className="transition-transform duration-200 group-hover:translate-x-0.5">
        <ChevronRight />
      </span>
    </button>
  );
}
