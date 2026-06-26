import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const WORK_DIR = path.join(process.cwd(), "content/work");

export type TagColor = "gray" | "purple" | "green";
export type Tag = { label: string; color: TagColor };

export type ProjectMeta = {
  slug: string;
  title: string;
  subtitle: string;
  cover: string;
  order: number;
  tags: Tag[];
  caseStudyTitle: string;
  intro: string[];
  sections: string[];
  outcomes: { stat: string; label: string }[];
};

export type Project = { meta: ProjectMeta; content: string };

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(WORK_DIR)) return [];
  return fs
    .readdirSync(WORK_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getProject(slug: string): Project {
  const raw = fs.readFileSync(path.join(WORK_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return { meta: { slug, ...(data as Omit<ProjectMeta, "slug">) }, content };
}

export function getAllProjects(): ProjectMeta[] {
  return getProjectSlugs()
    .map((slug) => getProject(slug).meta)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}
