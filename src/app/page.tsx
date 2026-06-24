import Image from "next/image";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProjectCarousel from "@/components/ProjectCarousel";
import { getAllProjects } from "@/lib/work";

export default function Home() {
  const projects = getAllProjects();

  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden">
      {/* Horizon glow anchored to the bottom of the viewport */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-42px] -z-0 flex justify-center"
      >
        <Image
          src="/work/horizon.png"
          alt=""
          width={1536}
          height={458}
          priority
          className="h-[458px] w-[1536px] max-w-none object-bottom opacity-70 blur-[120px]"
        />
      </div>

      <Nav />

      <main className="relative">
        <Hero />
        <ProjectCarousel projects={projects} />
      </main>
    </div>
  );
}
