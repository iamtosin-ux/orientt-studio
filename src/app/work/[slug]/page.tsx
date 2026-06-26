import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { getProject, getProjectSlugs } from "@/lib/work";
import SectionTracker from "@/components/SectionTracker";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = getProject(slug);
    return { title: `${meta.title} — Orientt`, description: meta.subtitle };
  } catch {
    return {};
  }
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");

const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      id={typeof props.children === "string" ? slugify(props.children) : undefined}
      className="scroll-mt-28 pt-12 text-sm font-medium uppercase tracking-wider text-white/50"
      {...props}
    />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mt-3 max-w-xl text-[15px] leading-7 text-white/70" {...props} />
  ),
  // eslint-disable-next-line @next/next/no-img-element
  img: (props: React.ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="mt-6 w-full rounded-2xl ring-1 ring-white/10"
      alt={props.alt ?? ""}
      {...props}
    />
  ),
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getProjectSlugs().includes(slug)) notFound();

  const { meta, content } = getProject(slug);
  const { content: body } = await compileMDX({
    source: content,
    components: mdxComponents,
    options: { parseFrontmatter: true },
  });

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-white/10 bg-background/80 px-6 py-5 backdrop-blur-md">
        <Link
          href="/"
          aria-label="Back to home"
          className="grid size-8 place-items-center rounded-full ring-1 ring-white/15 transition-colors hover:bg-white/5"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              d="M12.5 15 7.5 10l5-5"
              stroke="currentColor"
              strokeWidth="1.67"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <span className="text-sm font-medium">Orientt</span>
        <span className="text-white/30">|</span>
        <span className="truncate text-sm text-white/60">{meta.subtitle}</span>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-[280px_1fr]">
        {/* Section tracker */}
        <aside className="hidden lg:block">
          <SectionTracker sections={meta.sections} />
        </aside>

        {/* Content */}
        <article className="min-w-0">
          <p
            id={slugify(meta.sections[0])}
            className="scroll-mt-28 text-sm font-medium uppercase tracking-wider text-white/50"
          >
            {meta.sections[0]}
          </p>
          <h1 className="mt-4 max-w-2xl text-[28px] font-medium leading-tight">
            {meta.caseStudyTitle}
          </h1>
          {meta.intro.map((para, i) => (
            <p key={i} className="mt-5 max-w-xl text-[15px] leading-7 text-white/70">
              {para}
            </p>
          ))}

          <div className="mt-10">{body}</div>

          {meta.outcomes?.length > 0 && (
            <section id="outcome" className="mt-16 scroll-mt-28">
              <p className="text-sm font-medium uppercase tracking-wider text-white/50">
                Outcome
              </p>
              <dl className="mt-8 flex flex-col gap-8">
                {meta.outcomes.map((o) => (
                  <div
                    key={o.stat}
                    className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <dt className="text-[32px] font-semibold leading-none text-white">
                      {o.stat}
                    </dt>
                    <dd className="max-w-xs text-sm leading-6 text-white/60">{o.label}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </article>
      </div>
    </div>
  );
}
