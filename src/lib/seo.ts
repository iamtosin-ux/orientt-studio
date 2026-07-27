// ---------------------------------------------------------------------------
// Central SEO configuration — single source of truth for metadata + JSON-LD.
// Override the canonical origin per-environment with NEXT_PUBLIC_SITE_URL.
// ---------------------------------------------------------------------------

/** Canonical origin, no trailing slash. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://orientt.com"
).replace(/\/+$/, "");

export const SITE_NAME = "Orientt";
export const LEGAL_NAME = "Orientt Studio";
export const FOUNDER = "Samuel Tosin";
export const LOCALE = "en_GB";

export const DEFAULT_TITLE = "Orientt — Independent Design Studio in London";
export const TITLE_TEMPLATE = "%s | Orientt";

export const TAGLINE =
  "Design studio built to help founders ship ideas at venture speed.";

export const DEFAULT_DESCRIPTION =
  "Orientt is an independent design studio in London, helping founders ship ideas at venture speed. Product design, UI/UX and marketing websites for startups across London, Hertfordshire and England.";

// Target search terms. Meta `keywords` carry little Google weight on their own,
// but reinforce topical relevance across other engines and LLM answer surfaces,
// and double as the studio's `knowsAbout` in structured data.
export const KEYWORDS = [
  "independent design studio",
  "design studio London",
  "design agency London",
  "design agencies in London",
  "top designs in London",
  "top designers London",
  "best design studio London",
  "freelance designers London",
  "freelance UI/UX designer",
  "product design studio",
  "UI UX design agency",
  "startup design studio",
  "SaaS product design",
  "web design London",
  "marketing website design",
  "brand and website design",
  "design studio Hertfordshire",
  "design agency Hertfordshire",
  "design studio England",
  "founding designer",
];

// Services offered — powers `knowsAbout` / `makesOffer` for local + LLM discovery.
export const SERVICES = [
  "Product design",
  "UI/UX design",
  "Web design",
  "Brand design",
  "Design systems",
  "Marketing website design",
  "MVP design",
  "SaaS product design",
];

// Where the studio operates.
export const AREAS_SERVED = [
  "London",
  "Hertfordshire",
  "England",
  "United Kingdom",
];

export const CONTACT = {
  email: "hello@orientt.com",
  booking: "https://cal.com/samuel-tosin/30min",
  whatsapp: "https://wa.me/message/RBECE7Z2MUSAE1",
};

export const SOCIAL = {
  x: "https://x.com/orienttstudio",
  xHandle: "@orienttstudio",
};

/** All the studio's public profiles, for schema `sameAs`. */
export const SAME_AS = [SOCIAL.x];

/** Absolute URL helper for canonicals, sitemap entries and OG images. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
