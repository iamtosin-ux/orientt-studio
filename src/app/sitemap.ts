import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getProjectSlugs } from "@/lib/work";
import { getLegalSlugs } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/dossier`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const workRoutes: MetadataRoute.Sitemap = getProjectSlugs().map((slug) => ({
    url: `${SITE_URL}/work/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const legalRoutes: MetadataRoute.Sitemap = getLegalSlugs().map((slug) => ({
    url: `${SITE_URL}/legal/${slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [...staticRoutes, ...workRoutes, ...legalRoutes];
}
