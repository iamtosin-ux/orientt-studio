import React from "react";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { getProject, getProjectSlugs } from "@/lib/work";
import SectionTracker from "@/components/SectionTracker";
import BeforeAfter from "@/components/BeforeAfter";

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
    return { title: `${meta.title} | Orientt`, description: meta.subtitle };
  } catch {
    return {};
  }
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");

// Content + visuals stack in one column; headings are inline section labels.
const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      id={typeof props.children === "string" ? slugify(props.children) : undefined}
      className="scroll-mt-28 pt-20 text-xs font-medium uppercase tracking-[0.14em] text-white/40"
      {...props}
    />
  ),
  p: (props: React.ComponentProps<"p">) => {
    // Markdown wraps standalone images in <p>; unwrap those so the image is full-bleed.
    const hasElement = React.Children.toArray(props.children).some((c) =>
      React.isValidElement(c),
    );
    if (hasElement) return <>{props.children}</>;
    return <p className="mt-4 text-[15px] leading-7 text-white/60">{props.children}</p>;
  },
  img: (props: React.ComponentProps<"img">) => {
    const src = typeof props.src === "string" ? props.src : "";
    // The before/after frame becomes an interactive drag-to-reveal slider
    if (src.includes("fig-before-after")) {
      return (
        <BeforeAfter
          before="/work/indemni/ba-before.png"
          after="/work/indemni/ba-after.png"
        />
      );
    }
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="mt-10 block w-full" alt={props.alt ?? ""} {...props} />;
  },
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
      {/* Scrollspy — far left */}
      <aside className="absolute inset-y-0 left-6 hidden lg:block xl:left-10">
        <SectionTracker sections={meta.sections} />
      </aside>

      {/* Single content column — text + visuals stacked, centered */}
      <article className="mx-auto min-w-0 max-w-[720px] px-6 pb-28 pt-24">
          <p
            id={slugify(meta.sections[0])}
            className="scroll-mt-28 text-xs font-medium uppercase tracking-[0.14em] text-white/40"
          >
            {meta.sections[0]}
          </p>
          <h1 className="mt-3 text-xl font-semibold leading-7 tracking-[-0.2px]">
            {meta.caseStudyTitle}
          </h1>
          {meta.intro.map((para, i) => (
            <p key={i} className="mt-4 text-[15px] leading-7 text-white/60">
              {para}
            </p>
          ))}

          {meta.outcomes?.length > 0 && (
            <dl className="mt-10 grid grid-cols-2 gap-8">
              {meta.outcomes.map((o) => (
                <div key={o.stat} className="flex flex-col gap-1">
                  <dt className="text-[32px] font-semibold leading-none text-white">
                    {o.stat}
                  </dt>
                  <dd className="text-sm leading-6 text-white/55">{o.label}</dd>
                </div>
              ))}
            </dl>
          )}

          {body}
        </article>
    </div>
  );
}
