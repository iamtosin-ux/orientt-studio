import React from "react";
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
      <div className="mx-auto flex max-w-[1320px] flex-col gap-12 px-6 pb-28 pt-24 lg:flex-row lg:justify-center lg:gap-10">
        {/* Scrollspy */}
        <aside className="hidden shrink-0 lg:block lg:w-[180px]">
          <SectionTracker sections={meta.sections} />
        </aside>

        {/* Intro (title + lead) */}
        <div className="shrink-0 lg:w-[383px]">
          <h1 className="text-xl font-semibold leading-7 tracking-[-0.2px]">
            {meta.caseStudyTitle}
          </h1>
          {meta.intro.map((para, i) => (
            <p key={i} className="mt-4 text-sm leading-5 text-[#d4d4d8]">
              {para}
            </p>
          ))}
        </div>

        {/* Visual column */}
        <div className="min-w-0 shrink-0 border-white/10 lg:w-[632px] lg:border-l lg:pl-12">
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
  );
}
