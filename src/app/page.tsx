import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProjectCarousel from "@/components/ProjectCarousel";
import FoundersWall from "@/components/FoundersWall";
import AnimatedBackground from "@/components/AnimatedBackground";
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
        <FoundersWall />
      </main>
    </div>
  );
}
