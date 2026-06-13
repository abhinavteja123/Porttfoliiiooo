import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "../components/SectionHeading";
import { projects, type Project } from "../data/content";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/useReducedMotion";

function thumbStyle(hue: number) {
  return {
    background: `radial-gradient(120% 120% at 25% 20%, hsl(${hue} 90% 70%), transparent 55%), radial-gradient(120% 120% at 80% 90%, hsl(${
      hue + 40
    } 90% 72%), transparent 55%), #14141A`,
  } as const;
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const thumbRef = useRef<HTMLDivElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const filterId = `liquid-${project.id}`;

  // Liquid hover-distortion: GSAP warps a real SVG displacement map.
  useEffect(() => {
    const el = thumbRef.current;
    if (!el || prefersReducedMotion()) return;

    const enter = () => {
      gsap.to(dispRef.current, { attr: { scale: 22 }, duration: 0.5, ease: "power2.out" });
      gsap.fromTo(
        turbRef.current,
        { attr: { baseFrequency: 0.008 } },
        { attr: { baseFrequency: 0.02 }, duration: 0.6, ease: "power2.out" },
      );
      gsap.to(el, { scale: 1.03, duration: 0.6, ease: "expo.out" });
    };
    const leave = () => {
      gsap.to(dispRef.current, { attr: { scale: 0 }, duration: 0.6, ease: "power2.out" });
      gsap.to(el, { scale: 1, duration: 0.6, ease: "expo.out" });
    };
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <button
      data-reveal
      data-cursor
      onClick={() => onOpen(project)}
      className="group block text-left"
    >
      <div className="relative aspect-[16/11] overflow-hidden rounded-3xl">
        <svg className="absolute h-0 w-0" aria-hidden="true">
          <filter id={filterId}>
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.008"
              numOctaves={2}
              result="noise"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale={0}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
        <motion.div
          layoutId={`thumb-${project.id}`}
          ref={thumbRef}
          className="absolute inset-0"
          style={{ ...thumbStyle(project.hue), filter: `url(#${filterId})` }}
        />
        <div className="absolute inset-0 flex items-end justify-between p-5">
          <span className="font-sans text-fluid-sm uppercase tracking-[0.2em] text-cream/90">
            {project.tags[0]}
          </span>
          <span className="font-sans text-fluid-sm text-cream/70">{project.year}</span>
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-fluid-lg font-semibold transition-colors group-hover:text-iris">
          {project.title}
        </h3>
        <span className="font-sans text-fluid-sm text-ink-soft">{project.role}</span>
      </div>
      <p className="mt-1 max-w-md font-sans text-fluid-base text-ink-soft">{project.blurb}</p>
    </button>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        layoutId={`thumb-${project.id}`}
        className="glass relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] p-0"
      >
        <div className="relative aspect-[16/9] w-full" style={thumbStyle(project.hue)}>
          <button
            ref={closeRef}
            onClick={onClose}
            data-cursor
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-cream/90 text-ink transition-transform hover:scale-110"
            aria-label="Close case study"
          >
            ✕
          </button>
        </div>
        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-display text-fluid-xl font-semibold">{project.title}</h2>
            <span className="font-sans text-fluid-sm text-ink-soft">
              {project.role} · {project.year}
            </span>
          </div>
          <p className="mt-5 max-w-2xl font-sans text-fluid-base leading-relaxed text-ink-soft">
            {/* TODO: replace with the real case-study narrative */}
            {project.description}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-ink/15 px-3 py-1 text-fluid-sm text-ink-soft"
              >
                {t}
              </li>
            ))}
          </ul>
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-fluid-sm text-cream"
            >
              View project ↗
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-28 sm:py-36" aria-label="Selected work">
      <div className="section-shell">
        <SectionHeading index="04" title="Selected Work" kicker="The centerpiece" />
        <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={setActive} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
