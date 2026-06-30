import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProjectCarousel from "@/components/ProjectCarousel";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import { getAllProjects } from "@/lib/work";

export default function Home() {
  const projects = getAllProjects();

  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden">
      {/* Hero section — background scoped here, fills at least the full viewport */}
      <div className="relative min-h-screen overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10">
          <Nav />
          <Hero />
        </div>
      </div>

      <main>
        <ProjectCarousel projects={projects} />
      </main>

      <Footer />
    </div>
  );
}
