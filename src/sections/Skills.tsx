import { useEffect, useMemo, useRef, useState } from "react";
import { SectionHeading } from "../components/SectionHeading";
import { skills, type Skill } from "../data/content";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/useReducedMotion";

function SkillRow({ skill, active }: { skill: Skill; active: boolean }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.transform = `scaleX(${skill.level})`;
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: skill.level,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [skill.level]);

  return (
    <div
      data-cursor
      className="group grid grid-cols-[1fr_auto] items-center gap-4 border-t border-ink/10 py-4 transition-colors"
    >
      <div className="flex items-center gap-3">
        <span
          className="font-display text-fluid-lg transition-colors group-hover:text-iris"
          style={{ opacity: active ? 1 : 0.45 }}
        >
          {skill.name}
        </span>
        <span className="font-sans text-fluid-sm text-ink-soft opacity-0 transition-opacity group-hover:opacity-100">
          {Math.round(skill.level * 100)}%
        </span>
      </div>
      <div className="h-[6px] w-32 overflow-hidden rounded-full bg-ink/10 sm:w-48">
        <div
          ref={barRef}
          className="h-full w-full origin-left rounded-full bg-iris"
          style={{ willChange: "transform" }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  const groups = useMemo(() => ["All", ...Array.from(new Set(skills.map((s) => s.group)))], []);
  const [filter, setFilter] = useState("All");

  return (
    <section id="skills" className="relative py-28 sm:py-36" aria-label="Skills">
      <div className="section-shell">
        <SectionHeading index="02" title="Skills" kicker="Tools of the craft" />

        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter skills">
          {groups.map((g) => (
            <button
              key={g}
              role="tab"
              aria-selected={filter === g}
              data-cursor
              onClick={() => setFilter(g)}
              className={`rounded-full border px-4 py-2 text-fluid-sm transition-all ${
                filter === g
                  ? "border-transparent bg-ink text-cream"
                  : "border-ink/15 text-ink-soft hover:border-ink/40"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="grid gap-x-12 sm:grid-cols-2">
          {skills.map((s) => (
            <SkillRow key={s.name} skill={s} active={filter === "All" || filter === s.group} />
          ))}
        </div>
      </div>
    </section>
  );
}
