import { SectionHeading } from "../components/SectionHeading";
import { experience } from "../data/content";
import { useScrollReveal } from "../lib/useScrollReveal";

export function Experience() {
  const scope = useScrollReveal<HTMLDivElement>("[data-reveal]", { y: 56, stagger: 0.12 });

  return (
    <section id="experience" className="relative py-28 sm:py-36" aria-label="Experience">
      <div ref={scope} className="section-shell">
        <SectionHeading index="03" title="Experience" kicker="Where I've built" />

        <ol className="relative ml-2 border-l border-ink/15 sm:ml-4">
          {experience.map((role, i) => (
            <li key={i} data-reveal className="relative pb-14 pl-8 last:pb-0 sm:pl-12">
              {/* node */}
              <span className="absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full bg-iris ring-4 ring-cream" />
              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-fluid-sm uppercase tracking-[0.2em] text-iris-a">
                  {role.period}
                </span>
                <h3 className="font-display text-fluid-lg font-semibold">
                  {role.role}
                  <span className="text-ink-soft"> — {role.org}</span>
                </h3>
                <p className="max-w-2xl font-sans text-fluid-base text-ink-soft">{role.summary}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {role.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-ink/15 px-3 py-1 text-fluid-sm text-ink-soft"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
