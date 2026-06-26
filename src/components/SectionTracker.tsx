"use client";

import { useEffect, useState } from "react";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");

// Stable pseudo-random line widths so the minimap reads like body text
function lineWidths(seed: number, count: number) {
  let v = seed * 9301 + 49297;
  return Array.from({ length: count }, () => {
    v = (v * 9301 + 49297) % 233280;
    return 45 + (v / 233280) * 50; // 45%–95%
  });
}

export default function SectionTracker({ sections }: { sections: string[] }) {
  const [active, setActive] = useState(sections[0]);

  useEffect(() => {
    const ids = sections.map(slugify);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          const idx = ids.indexOf(visible[0].target.id);
          if (idx >= 0) setActive(sections[idx]);
        }
      },
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Sections" className="sticky top-28 flex flex-col gap-10">
      {sections.map((section, si) => {
        const isActive = section === active;
        return (
          <a
            key={section}
            href={`#${slugify(section)}`}
            className="grid grid-cols-[1fr_auto] items-start gap-5"
          >
            <span className="relative block pt-3">
              {/* active connector line spanning toward the label */}
              <span
                className={`absolute left-0 right-0 top-0 h-0.5 rounded-full transition-all duration-500 ${
                  isActive ? "bg-[#3b6fff] opacity-100" : "opacity-0"
                }`}
              />
              <span className="flex flex-col gap-[7px]">
                {lineWidths(si + 1, 7).map((w, i) => (
                  <span
                    key={i}
                    style={{ width: `${w}%` }}
                    className={`h-px rounded-full transition-colors duration-500 ${
                      isActive ? "bg-[#3b6fff]/75" : "bg-white/15"
                    }`}
                  />
                ))}
              </span>
            </span>
            <span
              className={`text-base transition-colors duration-300 ${
                isActive ? "text-[#5b8cff]" : "text-white/35"
              }`}
            >
              {section}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
