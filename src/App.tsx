import { useState } from "react";
import { Preloader } from "./components/Preloader";
import { Cursor } from "./components/Cursor";
import { ScrollProgress } from "./components/ScrollProgress";
import { Nav } from "./components/Nav";
import { BackgroundCanvas } from "./three/BackgroundCanvas";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Skills } from "./sections/Skills";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Certificates } from "./sections/Certificates";
import { Academics } from "./sections/Academics";
import { Contact } from "./sections/Contact";
import { useSmoothScroll } from "./lib/useSmoothScroll";

export default function App() {
  const [ready, setReady] = useState(false);
  useSmoothScroll();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <ScrollProgress />
      <Nav />

      {/* Fixed WebGL / fallback layer behind everything */}
      <BackgroundCanvas />

      <main
        id="main"
        className="relative z-10"
        style={{ opacity: ready ? 1 : 0, transition: "opacity 0.6s ease" }}
      >
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certificates />
        <Academics />
        <Contact />
      </main>
    </>
  );
}
