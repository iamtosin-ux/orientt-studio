"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");

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
    <nav aria-label="Sections" className="sticky top-28 flex flex-col">
      <Link
        href="/"
        className="mb-10 flex items-center gap-2 text-base text-white/40 transition-colors hover:text-white/80"
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path
            d="M8.5 5.5 4 10m0 0 4.5 4.5M4 10h8.5a3.5 3.5 0 0 0 0-7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Index
      </Link>

      <ul className="flex flex-col gap-[18px]">
        {sections.map((section) => {
          const isActive = section === active;
          return (
            <li key={section}>
              <a
                href={`#${slugify(section)}`}
                aria-current={isActive ? "true" : undefined}
                className={`text-[17px] transition-colors duration-200 ${
                  isActive ? "text-white" : "text-white/35 hover:text-white/65"
                }`}
              >
                {section}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
