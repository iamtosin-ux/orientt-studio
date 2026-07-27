// ---------------------------------------------------------------------------
// Schema.org structured data (JSON-LD). Feeds Google rich results, the local
// pack, and LLM answer engines that read schema to describe a business.
// ---------------------------------------------------------------------------
import {
  SITE_URL,
  SITE_NAME,
  LEGAL_NAME,
  FOUNDER,
  DEFAULT_DESCRIPTION,
  TAGLINE,
  SERVICES,
  SAME_AS,
  CONTACT,
  absoluteUrl,
} from "./seo";

const STUDIO_ID = `${SITE_URL}/#studio`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** The studio itself — a design agency operating out of London. */
export function studioSchema() {
  return {
    "@type": ["ProfessionalService", "Organization"],
    "@id": STUDIO_ID,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    alternateName: ["Orientt Design Studio", "Orientt Studio"],
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: absoluteUrl("/logo.svg") },
    image: absoluteUrl("/opengraph-image"),
    description: DEFAULT_DESCRIPTION,
    slogan: TAGLINE,
    email: CONTACT.email,
    priceRange: "$$",
    founder: { "@type": "Person", name: FOUNDER },
    // London base; service area spans the wider region.
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressRegion: "England",
      addressCountry: "GB",
    },
    areaServed: [
      { "@type": "City", name: "London" },
      { "@type": "AdministrativeArea", name: "Hertfordshire" },
      { "@type": "AdministrativeArea", name: "England" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    knowsAbout: SERVICES,
    makesOffer: SERVICES.map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT.email,
      url: CONTACT.booking,
      areaServed: "GB",
      availableLanguage: ["English"],
    },
    potentialAction: {
      "@type": "ReserveAction",
      name: "Book a call",
      target: CONTACT.booking,
    },
    sameAs: SAME_AS,
  };
}

/** The website node — lets search engines tie pages back to the studio. */
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en-GB",
    publisher: { "@id": STUDIO_ID },
  };
}

/** Root graph rendered site-wide (in the layout). */
export function organizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [studioSchema(), websiteSchema()],
  };
}

/** A breadcrumb trail, e.g. Home › Work › Indemni. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** A case study — a piece of work produced by the studio. */
export function caseStudySchema(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: opts.title,
    headline: opts.title,
    description: opts.description,
    url: absoluteUrl(opts.path),
    ...(opts.image ? { image: absoluteUrl(opts.image) } : {}),
    inLanguage: "en-GB",
    creator: { "@id": STUDIO_ID },
    publisher: { "@id": STUDIO_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}
