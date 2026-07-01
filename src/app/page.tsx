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
      <AnimatedBackground />

      <Nav />

      <main className="relative">
        <Hero />
        <ProjectCarousel projects={projects} />
      </main>

      <Footer />
    </div>
  );
}
