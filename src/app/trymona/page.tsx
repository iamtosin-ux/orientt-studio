import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import Image from "next/image";
import SideNav from "@/components/SideNav";
import TopMenu from "@/components/TopMenu";
import Hero from "@/components/Hero";
import PastProjects from "@/components/PastProjects";
import BookCallButton from "@/components/BookCallButton";
import PillAligned from "@/components/PillAligned";
import TestimonialVideo from "@/components/TestimonialVideo";
import TestimonialCards from "@/components/TestimonialCards";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { SITE_URL } from "@/lib/seo";

// Personalised outreach page — home page format, minus services, pricing and
// the work grid. Kept out of search results.
// Handwritten greeting — scoped to this page only.
const handwriting = Caveat({ subsets: ["latin"], weight: "600" });

export const metadata: Metadata = {
  title: "Hello Andrew and Anny",
  robots: { index: false, follow: false },
};

export default function TryMona() {
  return (
    <div id="top" className="relative">
      {/* Personalised intro, logos, letter, testimonial + CTAs */}
      <section className="bg-background">
        <div className="relative mx-auto w-full max-w-[1140px] px-6 pb-20 pt-14 sm:px-8 lg:pt-20">
          <div className="absolute right-6 top-[50px] z-40 sm:right-8 lg:top-[74px]">
            <TopMenu links={[{ label: "Visit website", href: SITE_URL, external: true }]} />
          </div>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-20">
            <SideNav />
            <div className="min-w-0">
              {/* Intro text runs to the same right edge as the cards below */}
              <PillAligned>
                <Hero
                  title="Hello Andrew and Anny,"
                  body={
                    <>
                      Congrats on the raise. I think we could help with what comes
                      next, starting with{" "}
                      <strong className="font-semibold text-white">
                        30% potential savings
                      </strong>{" "}
                      on a permanent design hire.
                      <br />
                      <br />
                      I turn complex concepts into validated, market-ready
                      products, prioritising long-term success. From building
                      standout marketing websites to refined product UI, focusing
                      on thoughtful execution and a deep care for craft.
                    </>
                  }
                  cta={false}
                  titleClassName={`${handwriting.className} text-[32px] leading-none text-white`}
                  fullWidth
                />
              </PillAligned>
              {/* Video placeholder — same size as the letter below */}
              <PillAligned className="mt-10">
                <div
                  aria-hidden
                  className="aspect-[4096/2394] w-full rounded-2xl bg-neutral-800 outline outline-1 -outline-offset-1 outline-white/10"
                />
              </PillAligned>

              <PastProjects projectHref="#book-a-call" />

              {/* Letter — sits in the content column */}
              <PillAligned className="mt-16">
                {/* Same frame size; the photo is zoomed in slightly (anchored
                    low, so the keyboard and laptop stay in frame) so the letter
                    reads larger. */}
                <div className="relative aspect-[4096/2394] w-full overflow-hidden rounded-2xl outline outline-1 -outline-offset-1 outline-white/10">
                  <Image
                    src="/letter.png"
                    alt="A letter from Sam at Orientt on a wooden desk"
                    fill
                    sizes="(min-width: 1024px) 960px, 115vw"
                    quality={90}
                    className="origin-[50%_65%] scale-[1.15] object-cover"
                  />
                </div>
              </PillAligned>

              {/* Testimonial — same width as the letter: video left, quotes right */}
              <section aria-labelledby="testimonial-heading" className="mt-16">
                <h2 id="testimonial-heading" className="text-base font-semibold text-white">
                  Hear what our recent client has to say
                </h2>
                <PillAligned className="mt-4">
                  {/* Project summary — name as the headline, then the story */}
                  <h3 className="text-balance text-[22px] font-semibold leading-[1.25] tracking-[-0.01em] text-white/55 sm:text-2xl">
                    Omar Draz, Co-founder, Indemni · Ex-DoorDash
                  </h3>
                  <p className="mt-3 text-pretty text-base leading-7 text-white/55">
                    An 18-month project across Indemni&rsquo;s dispatch management
                    dashboard, driver verification app and insurance portal, as
                    well as marketing designs, presentations and pitch decks,
                    saving the team{" "}
                    <strong className="font-semibold text-white">more than $37k</strong>{" "}
                    in potential cost compared with a permanent hire. I also
                    handed off a full product design handbook for LLMs, so the
                    team can keep designing new features with AI for the long term.
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <TestimonialVideo
                      src="/work/testimonial-omar.mp4"
                      poster="/work/testimonial-omar.jpg"
                      label="Omar Draz, Co-founder of Indemni"
                      className="aspect-[3/2] rounded-[28px] sm:aspect-auto sm:h-full sm:min-h-[420px]"
                      caption={
                        <>
                          <span className="block text-sm font-semibold text-white">Omar Draz</span>
                          <span className="mt-0.5 block text-sm text-white/70">
                            Co-founder, Indemni · <span className="whitespace-nowrap">Ex-DoorDash</span>
                          </span>
                        </>
                      }
                    />
                    <TestimonialCards />
                  </div>
                </PillAligned>
              </section>

              {/* Services — the Orientt offering, framed for Mona */}
              <PillAligned className="mt-16">
                <Services title="How can we support Mona" className="" />
              </PillAligned>

              <div id="book-a-call" className="mt-10 flex scroll-mt-40 flex-wrap items-center gap-3">
                <BookCallButton />
                <a
                  href={SITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#101010] shadow-[inset_0_-1px_0_rgba(0,0,0,0.12),0_6px_18px_rgba(0,0,0,0.35)] transition-transform duration-150 ease-out hover:-translate-y-px active:translate-y-0 active:scale-[0.97]"
                >
                  Visit our website
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden className="transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px">
                    <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollProgress />
    </div>
  );
}
