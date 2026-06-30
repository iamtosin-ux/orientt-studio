import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLegalDoc, getLegalSlugs } from "@/lib/legal";
import SectionTracker from "@/components/SectionTracker";

export function generateStaticParams() {
  return getLegalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const doc = getLegalDoc(slug);
    return { title: `${doc.caseStudyTitle} | Orientt` };
  } catch {
    return {};
  }
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getLegalSlugs().includes(slug)) notFound();

  const doc = getLegalDoc(slug);
  const sectionLabels = doc.sections.map((s) => s.heading);

  return (
    <div className="relative min-h-screen">
      {/* Scrollspy — far left, same pattern as case studies */}
      <aside className="absolute inset-y-0 left-6 hidden lg:block xl:left-10">
        <SectionTracker sections={sectionLabels} />
      </aside>

      {/* Single content column — text stacked, centered */}
      <article className="mx-auto min-w-0 max-w-[720px] px-6 pb-28 pt-24">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/40">
          {doc.title}
        </p>
        <h1 className="mt-3 text-xl font-semibold leading-7 tracking-[-0.2px]">
          {doc.caseStudyTitle}
        </h1>
        <p className="mt-2 text-[13px] text-white/35">{doc.updated}</p>

        {doc.intro.map((para, i) => (
          <p key={i} className="mt-4 text-[15px] leading-7 text-white/60">
            {para}
          </p>
        ))}

        {doc.sections.map((section) => (
          <section key={section.heading}>
            <h2
              id={slugify(section.heading)}
              className="scroll-mt-28 pt-20 text-xs font-medium uppercase tracking-[0.14em] text-white/40"
            >
              {section.heading}
            </h2>
            {section.paragraphs.map((para, i) => (
              <p key={i} className="mt-4 text-[15px] leading-7 text-white/60">
                {para}
              </p>
            ))}
          </section>
        ))}
      </article>
    </div>
  );
}
