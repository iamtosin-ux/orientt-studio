import Link from "next/link";

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms of Use", href: "/legal/terms-of-use" },
  { label: "Cookies", href: "/legal/cookies" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 px-6 pb-28 pt-10 text-sm lg:pb-10">
      <div className="flex flex-wrap items-center justify-center gap-6 text-white/40">
        <span>© {new Date().getFullYear()}</span>
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
