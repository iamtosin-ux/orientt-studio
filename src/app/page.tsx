import SideNav from "@/components/SideNav";
import Hero from "@/components/Hero";
import PastProjects from "@/components/PastProjects";
import WorkList from "@/components/WorkList";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import { getAllProjects } from "@/lib/work";

export default function Home() {
  const projects = getAllProjects();

  return (
    <div id="top" className="relative">
      {/* Top — hero + client logos */}
      <section className="bg-background">
        <div className="mx-auto w-full max-w-[1140px] px-6 pb-20 pt-14 sm:px-8 lg:pt-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-20">
            <SideNav />
            <div className="min-w-0">
              <Hero />
              <PastProjects />
            </div>
          </div>
        </div>
      </section>

      {/* Work — full-width white band */}
      <section id="work" className="bg-white">
        <div className="mx-auto w-full max-w-[1140px] px-6 py-12 sm:px-8 sm:py-16">
          <WorkList projects={projects} />
        </div>
      </section>

      {/* Pricing — aligned to the same content column as the hero */}
      <section id="pricing" className="scroll-mt-20 bg-background">
        <div className="mx-auto w-full max-w-[1140px] px-6 py-20 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-20">
            <div aria-hidden className="hidden lg:block" />
            <Pricing />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
