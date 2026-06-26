import React from "react";
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

// The image column is visuals-only (matching Figma). Headings become invisible
// in-flow anchors so the section tracker can sync; prose stays for a11y/SEO.
const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      id={typeof props.children === "string" ? slugify(props.children) : undefined}
      className="scroll-mt-28 m-0 h-0 overflow-hidden p-0 text-transparent"
      {...props}
    />
  ),
  p: (props: React.ComponentProps<"p">) => {
    // Markdown wraps standalone images in <p>; keep those visible.
    // Prose paragraphs (text only) are hidden to match the visuals-only Figma.
    const hasElement = React.Children.toArray(props.children).some((c) =>
      React.isValidElement(c),
    );
    if (hasElement) return <>{props.children}</>;
    return <p className="sr-only">{props.children}</p>;
  },
  // eslint-disable-next-line @next/next/no-img-element
  img: (props: React.ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="mt-6 w-full rounded-2xl ring-1 ring-white/[0.08]"
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
      <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-white/10 bg-background/80 px-6 py-4 backdrop-blur-md">
        <Link
          href="/"
          aria-label="Back to home"
          className="grid size-8 place-items-center rounded-lg ring-1 ring-white/15 transition-colors hover:bg-white/5"
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
        <span className="text-[15px] font-medium">Orientt</span>
        <span className="text-white/25">|</span>
        <span className="truncate text-sm text-white/55">{meta.subtitle}</span>
      </header>

      <div className="mx-auto max-w-[1320px] px-6 py-14">
        <div className="grid gap-x-10 lg:grid-cols-[180px_minmax(0,1fr)_632px]">
          {/* Section tracker */}
          <aside className="hidden lg:block">
            <SectionTracker sections={meta.sections} />
          </aside>

          {/* Intro (title + lead) */}
          <div className="mb-12 lg:mb-0">
            <h1 className="max-w-[383px] text-xl font-semibold leading-7 tracking-[-0.2px]">
              {meta.caseStudyTitle}
            </h1>
            {meta.intro.map((para, i) => (
              <p
                key={i}
                className="mt-4 max-w-[383px] text-sm leading-5 text-[#d4d4d8]"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Visual column */}
          <div className="min-w-0 lg:border-l lg:border-white/10 lg:pl-10">
            <div id={slugify(meta.sections[0])} className="scroll-mt-28" />
            {body}

            {meta.outcomes?.length > 0 && (
              <section id="outcome" className="mt-16 scroll-mt-28">
                <p className="text-xs font-medium uppercase tracking-wider text-white/40">
                  Outcome
                </p>
                <dl className="mt-6 flex flex-col gap-8">
                  {meta.outcomes.map((o) => (
                    <div
                      key={o.stat}
                      className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6"
                    >
                      <dt className="text-[32px] font-semibold leading-none text-white">
                        {o.stat}
                      </dt>
                      <dd className="max-w-xs text-sm leading-6 text-white/60">
                        {o.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
