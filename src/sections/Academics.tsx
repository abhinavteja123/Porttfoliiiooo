import { SectionHeading } from "../components/SectionHeading";
import { academics } from "../data/content";
import { useScrollReveal } from "../lib/useScrollReveal";

export function Academics() {
  const scope = useScrollReveal<HTMLDivElement>("[data-reveal]", { y: 48, stagger: 0.12 });

  return (
    <section id="academics" className="relative py-28 sm:py-36" aria-label="Education">
      <div ref={scope} className="section-shell">
        <SectionHeading index="06" title="Education" kicker="Foundations" />

        <div className="grid gap-6 md:grid-cols-2">
          {academics.map((a, i) => (
            <article
              key={i}
              data-reveal
              className="glass group relative overflow-hidden rounded-3xl p-7 transition-transform duration-500 ease-expo hover:-translate-y-1"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-iris opacity-20 blur-2xl transition-opacity group-hover:opacity-40" />
              <span className="font-sans text-fluid-sm uppercase tracking-[0.2em] text-iris-a">
                {a.period}
              </span>
              <h3 className="mt-3 font-display text-fluid-lg font-semibold leading-tight">
                {a.degree}
              </h3>
              <p className="mt-1 font-sans text-fluid-base text-ink">{a.school}</p>
              <p className="mt-4 font-sans text-fluid-base text-ink-soft">{a.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
