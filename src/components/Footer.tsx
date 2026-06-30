"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Free, no-auth hit counter — https://counterapi.dev
const COUNTER_URL = "https://api.counterapi.dev/v1/orientt-studio/site-visits/up";

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms of Use", href: "/legal/terms-of-use" },
  { label: "Cookies", href: "/legal/cookies" },
];

export default function Footer() {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    fetch(COUNTER_URL)
      .then((res) => res.json())
      .then((data) => setVisits(data.count))
      .catch(() => setVisits(null));
  }, []);

  return (
    <footer className="relative z-10 flex flex-col gap-8 px-6 py-10 text-sm">
      <div className="flex items-center justify-center gap-2 text-white/60">
        <span aria-hidden className="size-1.5 rounded-full bg-white/30" />
        <span className="font-mono text-xs uppercase tracking-wider">
          {visits !== null ? `${visits.toLocaleString()} clicks` : "..."}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-6 text-white/40">
        <span>© 2015-2026</span>
        {LEGAL_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="transition-colors hover:text-white/80"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
