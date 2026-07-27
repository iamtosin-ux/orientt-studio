import SideNav from "@/components/SideNav";
import TopMenu from "@/components/TopMenu";
import Hero from "@/components/Hero";
import PastProjects from "@/components/PastProjects";
import WorkList from "@/components/WorkList";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { getAllProjects } from "@/lib/work";

export default function Home() {
  const projects = getAllProjects();

  return (
    <div id="top" className="relative">
      {/* Top — hero + client logos */}
      <section className="bg-background">
        <div className="relative mx-auto w-full max-w-[1140px] px-6 pb-20 pt-14 sm:px-8 lg:pt-20">
          {/* Menu — far right, on the logo row */}
          <div className="absolute right-6 top-[50px] z-40 sm:right-8 lg:top-[74px]">
            <TopMenu />
          </div>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-20">
            <SideNav />
            <div className="min-w-0">
              <Hero />
              <PastProjects />
            </div>
          </div>
        </div>
      </section>

      {/* Work — full-bleed, edge-to-edge image grid (no surrounding whitespace) */}
      <section id="work" className="bg-white">
        <div className="w-full">
          <WorkList projects={projects} />
        </div>
      </section>

      {/* Services — two-column split: headline + numbered list */}
      <section id="services" className="scroll-mt-20 bg-background">
        <div className="mx-auto w-full max-w-[1140px] px-6 py-20 sm:px-8">
          <Services />
        </div>
      </section>

      {/* Pricing — centred to align with the Services section */}
      <section id="pricing" className="scroll-mt-20 bg-background">
        <div className="mx-auto w-full max-w-[1140px] px-6 py-20 sm:px-8">
          <div className="mx-auto max-w-[640px]">
            <Pricing />
          </div>
        </div>
      </section>

      <Footer />
      <ScrollProgress />
    </div>
  );
}
